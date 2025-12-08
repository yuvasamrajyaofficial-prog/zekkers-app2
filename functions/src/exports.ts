
// functions/src/exports.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { PubSub } from '@google-cloud/pubsub';
import { Storage } from '@google-cloud/storage';
import { Parser as Json2csvParser } from 'json2csv';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit'; // simple fallback
import * as stream from 'stream';

const db = admin.firestore();
const storage = new Storage();
const pubsub = new PubSub();

const EXPORT_TOPIC = 'exports-process';

// Utility: validate user & role
async function requireCollegeRole(ctx: functions.https.CallableContext, collegeId: string, allowedRoles: string[]){
  if(!ctx.auth) throw new functions.https.HttpsError('unauthenticated','login required');
  const token = ctx.auth.token || {} as any;
  if(token.admin) return; // super-admin allowed
  if(token.collegeId !== collegeId) throw new functions.https.HttpsError('permission-denied','not permitted for this college');
  if(!allowedRoles.includes(token.role)) throw new functions.https.HttpsError('permission-denied','role not allowed');
}

// Callable: requestExport
export const requestExport = functions.https.onCall(async (data, ctx) => {
  const { collegeId, type, filters, format='csv', scheduledFor=null } = data;
  // Validate role
  await requireCollegeRole(ctx, collegeId, ['admin','tpo','hod']);

  const reqRef = db.collection('colleges').doc(collegeId).collection('exportRequests').doc();
  const payload = {
    id: reqRef.id,
    createdBy: ctx.auth!.uid,
    type,
    filters: filters || {},
    format,
    status: 'queued',
    scheduledFor: scheduledFor ? admin.firestore.Timestamp.fromDate(new Date(scheduledFor)) : null,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  } as any;
  await reqRef.set(payload);

  // Publish to Pub/Sub for immediate processing (or scheduled by Cloud Scheduler)
  await pubsub.topic(EXPORT_TOPIC).publishJSON({ collegeId, requestId: reqRef.id });
  return { ok:true, requestId: reqRef.id };
});

// Pub/Sub worker to process export
export const exportsWorker = functions.pubsub.topic(EXPORT_TOPIC).onPublish(async (message) => {
  const data = message.json as any;
  const { collegeId, requestId } = data;
  const reqRef = db.collection('colleges').doc(collegeId).collection('exportRequests').doc(requestId);
  const reqSnap = await reqRef.get();
  if(!reqSnap.exists) return;
  const req = reqSnap.data() as any;

  await reqRef.update({ status: 'processing' });
  try{
    // 1) Fetch data according to type/filters (implement your queries)
    const rows = await fetchExportData(collegeId, req.type, req.filters);
    // 2) Generate file buffer depending on format
    const fileName = `${req.type}_${requestId}.${req.format === 'excel' ? 'xlsx' : req.format}`;
    let mime = 'text/csv';
    let buffer: Buffer;
    if(req.format === 'csv'){
      const parser = new Json2csvParser({ header: true });
      const csv = parser.parse(rows);
      buffer = Buffer.from(csv, 'utf8');
      mime = 'text/csv';
    } else if(req.format === 'json'){
      buffer = Buffer.from(JSON.stringify(rows, null, 2), 'utf8');
      mime = 'application/json';
    } else if(req.format === 'excel'){
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('Export');
      if(rows.length > 0){
        ws.columns = Object.keys(rows[0]).map(k=> ({ header:k, key:k, width:20 }));
        rows.forEach(r=> ws.addRow(r));
      }
      const buf = await wb.xlsx.writeBuffer();
      buffer = Buffer.from(buf);
      mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if(req.format === 'pdf'){
      // Simple PDF via pdfkit: for richer templates use Puppeteer + HTML
      const doc = new PDFDocument({ autoFirstPage: true });
      const passthrough = new stream.PassThrough();
      const chunks: Buffer[] = [];
      doc.pipe(passthrough);
      rows.forEach((r:any, idx:number)=>{
        doc.fontSize(12).text(Object.entries(r).map(([k,v])=> `${k}: ${v}`).join(' | '));
        doc.moveDown(0.5);
        if((idx+1) % 30 === 0) doc.addPage();
      });
      doc.end();
      for await (const chunk of passthrough) chunks.push(chunk as Buffer);
      buffer = Buffer.concat(chunks);
      mime = 'application/pdf';
    } else {
      throw new Error('unsupported format');
    }

    // 3) Upload to Storage
    const bucketName = process.env.GCLOUD_PROJECT + '.appspot.com';
    const bucket = storage.bucket(bucketName);
    const destPath = `exports/${collegeId}/${requestId}/${fileName}`;
    const file = bucket.file(destPath);
    await file.save(buffer, { contentType: mime, resumable: false });

    // 4) Make signed URL
    const signedUrl = await createSignedUrl(bucket.name, destPath);

    // 5) Write exportLog and update request
    await db.collection('colleges').doc(collegeId).collection('exportLogs').add({ requestId, filePath: destPath, fileName, mimeType: mime, sizeBytes: buffer.length, createdAt: admin.firestore.FieldValue.serverTimestamp(), status:'success' });
    await reqRef.update({ status:'completed', result: { storagePath: destPath, downloadUrl: signedUrl, sizeBytes: buffer.length, generatedAt: admin.firestore.FieldValue.serverTimestamp() } });

  }catch(err:any){
    console.error('export error', err);
    await reqRef.update({ status:'failed', error: String(err) });
    await db.collection('colleges').doc(collegeId).collection('exportLogs').add({ requestId, error: String(err), createdAt: admin.firestore.FieldValue.serverTimestamp(), status:'failed' });
  }
});

// Helper: create signed URL (short-lived)
async function createSignedUrl(bucketName:string, filePath:string, expiresSec:number = 60*60){
  const file = storage.bucket(bucketName).file(filePath);
  const [url] = await file.getSignedUrl({ action:'read', expires: Date.now() + expiresSec*1000 });
  return url;
}

// Helper: fetch data for exports — implement according to your schema
async function fetchExportData(collegeId:string, type:string, filters:any){
  // Example: students
  if(type === 'students'){
    // Fetch from the root /users collection and filter by collegeId if needed
    // This is a placeholder for a more complex query based on your app's logic
    const snap = await db.collection('users').limit(100).get(); // Example limit
    return snap.docs.map(d=> d.data());
  }
  // drives, assessments etc.
  return [];
}

// Scheduled reports — a Pub/Sub topic 'exports-schedule' will be triggered by Cloud Scheduler
export const scheduledReports = functions.pubsub.topic('exports-schedule').onPublish(async (message) => {
  const payload = message.json as any; // { collegeId, reportType, frequency }
  // find configured scheduled report jobs in Firestore or use payload
  // For simplicity we publish per-report as exports-process
  await pubsub.topic(EXPORT_TOPIC).publishJSON({ collegeId: payload.collegeId, requestId: payload.requestId });
});
