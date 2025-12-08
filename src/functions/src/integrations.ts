
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';
import * as crypto from 'crypto';
import { CloudTasksClient } from '@google-cloud/tasks';

const db = admin.firestore();
const tasksClient = new CloudTasksClient();

// Helper to mask sensitive config values before saving to Firestore
function maskConfig(cfg:any){
  const clone = {...cfg};
  if(clone.clientSecret) clone.clientSecret = '***';
  if(clone.password) clone.password = '***';
  if(clone.token) clone.token = '***';
  return clone;
}

// 1. CREATE INTEGRATION (Callable Function)
export const createIntegration = functions.https.onCall(async (payload, ctx) => {
  if(!ctx.auth) throw new functions.https.HttpsError('unauthenticated','unauthenticated');
  const { collegeId, type, provider, config } = payload;
  
  if(ctx.auth?.token?.collegeId !== collegeId && !ctx.auth?.token?.admin) {
    throw new functions.https.HttpsError('permission-denied','not permitted');
  }

  const docRef = db.collection('colleges').doc(collegeId).collection('integrations').doc();
  await docRef.set({
    id: docRef.id,
    type, provider,
    config: maskConfig(config),
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    createdBy: ctx.auth.uid
  });

  await db.collection('colleges').doc(collegeId).collection('integrationTasks').add({
    integrationId: docRef.id, action: 'test', createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return { ok:true, id: docRef.id };
});

// 2. INTEGRATION TASK RUNNER (Firestore Trigger)
export const runIntegrationTask = functions.firestore.document('colleges/{collegeId}/integrationTasks/{taskId}')
  .onCreate(async (snap, ctx) => {
    const task = snap.data();
    const { integrationId, action } = task;
    const collegeId = ctx.params.collegeId;
    const intRef = db.collection('colleges').doc(collegeId).collection('integrations').doc(integrationId);
    const intSnap = await intRef.get();
    if(!intSnap.exists) return;
    const integration = intSnap.data();

    try {
      if(action === 'test') {
        const res = await testHandshake(integration);
        await intRef.update({ status: res.ok ? 'connected' : 'error', updatedAt: admin.firestore.FieldValue.serverTimestamp() });
        await db.collection('colleges').doc(collegeId).collection('integrationLogs').add({ integrationId, severity: res.ok? 'info':'error', message: res.message, createdAt: admin.firestore.FieldValue.serverTimestamp() });
      }
    } catch(e: any){
      await intRef.update({ status:'error', updatedAt: admin.firestore.FieldValue.serverTimestamp() });
      await db.collection('colleges').doc(collegeId).collection('integrationLogs').add({ integrationId, severity:'error', message: String(e), meta: {stack: e.stack}, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    } finally {
      await snap.ref.delete();
    }
  });

// 3. SSO OIDC CALLBACK (HTTP Request)
export const oidcCallback = functions.https.onRequest(async (req, res) => {
  const { code, integrationId, state } = req.query;
  
  if (!code || !integrationId || !state) {
    res.status(400).send('Missing required query parameters.');
    return;
  }

  try {
    const intSnap = await db.collectionGroup('integrations').where('id','==', integrationId).limit(1).get();
    if(intSnap.empty) {
      res.status(400).send('Invalid integration ID.');
      return;
    }
    const integration = intSnap.docs[0].data();
    const config = integration.config;
    const collegeId = intSnap.docs[0].ref.parent.parent?.id;

    // MOCK: Exchange code for tokens (in prod, use actual fetch)
    const tokenJson = { id_token: 'mock_id_token' };

    // MOCK: Validate ID Token (in prod, use JWT library)
    const payload = { sub: 'mock-user-id', email: `student@${integration.config.domain || 'college.edu'}` };

    const firebaseToken = await admin.auth().createCustomToken(payload.sub, { 
      collegeId: collegeId, 
      role: 'student',
      ssoProvider: integration.provider,
    });
    
    const clientAppUrl = config.clientAppUrl || process.env.CLIENT_APP_URL;
    if (clientAppUrl) {
        res.redirect(`${clientAppUrl}/auth/sso?token=${firebaseToken}`);
    } else {
        res.status(500).send('Client application URL is not configured.');
    }

  } catch(e: any) {
    console.error("SSO Callback Error:", e);
    res.status(500).send('An internal error occurred during authentication.');
  }
});

// 4. SET COLLEGE ROLE (Callable Function)
export const setCollegeRole = functions.https.onCall(async (data, ctx) => {
  if(!ctx.auth || !ctx.auth?.token?.admin) {
    throw new functions.https.HttpsError('permission-denied','only super-admin');
  }

  const { uid, role, collegeId } = data;
  await admin.auth().setCustomUserClaims(uid, { role, collegeId });
  return { ok:true };
});

// 5. WEBHOOK EVENT EMITTER (Callable Function)
export const emitWebhookEvent = functions.https.onCall(async (data, ctx) => {
    if(!ctx.auth) throw new functions.https.HttpsError('unauthenticated','login required');
    const { collegeId, eventType, payload } = data;
    
    if(ctx.auth?.token?.collegeId !== collegeId && !ctx.auth?.token?.admin) {
      throw new functions.https.HttpsError('permission-denied','not allowed');
    }

    const whSnap = await db.collection('colleges').doc(collegeId).collection('webhooks')
        .where('enabled','==',true)
        .where('events','array-contains', eventType)
        .get();
        
    for(const doc of whSnap.docs){
        const logRef = await db.collection('colleges').doc(collegeId).collection('webhookLogs').add({ 
            webhookId: doc.id, eventType, payload, status:'queued', attempts:0, createdAt: admin.firestore.FieldValue.serverTimestamp() 
        });
        await enqueueWebhookTask(collegeId, doc.id, payload, logRef.id);
    }
    return { ok:true };
});

// 6. WEBHOOK DELIVERY WORKER (HTTP Request)
export const deliverWebhook = functions.https.onRequest(async (req,res) => {
  const { collegeId, webhookId, payload, logId } = req.body;
  try {
    const docRef = db.collection('colleges').doc(collegeId).collection('webhooks').doc(webhookId);
    const docSnap = await docRef.get();
    if(!docSnap.exists) return res.status(404).send('webhook not found');
    
    const wh = docSnap.data()!;
    // IMPORTANT: In a real app, retrieve the raw secret from Google Secret Manager.
    // Do not store raw secrets in Firestore.
    const secret = process.env.WEBHOOK_SECRET_FALLBACK || 'dev-secret';
    const signature = computeSignature(JSON.stringify(payload), secret);

    const r = await fetch(wh.url, { 
        method:'POST', 
        body: JSON.stringify(payload), 
        headers: { 'Content-Type':'application/json', 'X-Zekkers-Signature': signature }
    });

    const logUpdateRef = db.collection('colleges').doc(collegeId).collection('webhookLogs').doc(logId);

    if(r.ok){
      await logUpdateRef.update({ status:'success', lastAttemptAt: admin.firestore.FieldValue.serverTimestamp(), attempts: admin.firestore.FieldValue.increment(1) });
      return res.json({ ok:true });
    } else {
      const txt = await r.text();
      await logUpdateRef.update({ status:'failed', error: txt, lastAttemptAt: admin.firestore.FieldValue.serverTimestamp(), attempts: admin.firestore.FieldValue.increment(1) });
      // The 500 status will trigger Cloud Tasks to retry based on queue config
      return res.status(500).send('delivery failed');
    }
  } catch(e: any) {
    console.error(e);
    return res.status(500).send('server error');
  }
});


// ------------------- Helpers -------------------

async function testHandshake(integration:any){
  if(integration.provider === 'moodle'){
    const base = integration.config.baseUrl;
    const token = integration.config.token;
    try {
      const resp = await fetch(`${base}/webservice/rest/server.php?wsfunction=core_webservice_get_site_info&moodlewsrestformat=json&wstoken=${token}`);
      const data: any = await resp.json();
      if(data && data.sitename) return { ok:true, message:'moodle ok: ' + data.sitename };
      return { ok:false, message: 'invalid response' };
    } catch(e: any){
      return { ok:false, message: String(e) };
    }
  }
  return { ok:false, message:'provider not implemented' };
}

function computeSignature(body:string, secret:string){
  return crypto.createHmac('sha256', secret).update(body).digest('hex');
}

async function enqueueWebhookTask(collegeId: string, webhookId: string, payload: any, logId: string) {
    const project = process.env.GCLOUD_PROJECT || functions.config().gcp.project;
    const location = 'us-central1';
    const queue = 'webhook-delivery';

    const queuePath = tasksClient.queuePath(project, location, queue);
    
    const url = `https://${location}-${project}.cloudfunctions.net/deliverWebhook`;

    const task = {
        httpRequest: {
            httpMethod: 'POST' as const,
            url,
            headers: { 'Content-Type': 'application/json' },
            body: Buffer.from(JSON.stringify({ collegeId, webhookId, payload, logId })).toString('base64'),
        },
        scheduleTime: {
            seconds: Date.now() / 1000 + 5,
        }
    };

    try {
        await tasksClient.createTask({ parent: queuePath, task });
    } catch (error) {
        console.error('Failed to create Webhook Delivery Task:', error);
        // If task creation fails, log it immediately
        await db.collection('colleges').doc(collegeId).collection('webhookLogs').doc(logId)
            .update({ status: 'failed', error: 'Failed to enqueue task.' });
    }
}
