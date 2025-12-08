
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import sendgrid from '@sendgrid/mail';

const db = admin.firestore();

if (functions.config().sendgrid?.key) {
  sendgrid.setApiKey(functions.config().sendgrid.key);
}

export const onTicketCreate = functions.firestore
  .document('colleges/{collegeId}/supportTickets/{ticketId}')
  .onCreate(async (snap, ctx) => {
    const ticket = snap.data();
    const { collegeId, ticketId } = ctx.params as any;

    // 1) Basic validation & defaulting
    const defaults = { 
        priority: 'medium', 
        status: 'open', 
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await snap.ref.set({ ...defaults, lastActivityAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });


    // 2) Auto-assign rules
    const settingsSnap = await db.collection('colleges').doc(collegeId).collection('supportSettings').doc('defaults').get();
    const settings = settingsSnap.exists ? settingsSnap.data() : null;
    let assignTo = settings?.autoAssignRules?.defaultAssignee || null;
    if(assignTo){
      await snap.ref.update({ assignedTo: assignTo, status: 'assigned' });
      await db.collection('colleges').doc(collegeId).collection('supportLogs').add({ ticketId, action: 'assigned', by: 'system', meta:{assignedTo:assignTo}, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    }

    // 3) Notify via email + in-app
    await notifyTicketEvent(collegeId, ticketId, 'created');
  });

async function notifyTicketEvent(collegeId: string, ticketId:string, event:'created'|'assigned'|'comment'|'status_change'){
  const ticketSnap = await db.collection('colleges').doc(collegeId).collection('supportTickets').doc(ticketId).get();
  if(!ticketSnap.exists) return;
  const ticket = ticketSnap.data() as any;

  // Build message
  const subject = `[Zekkers Support] ${ticket.subject} (${ticket.priority})`;
  const body = `Ticket #${ticketId}\nSubject: ${ticket.subject}\nStatus: ${ticket.status}\n\n${ticket.description}`;

  // Send email to assigned team and ticket creator
  const recipients = [] as string[];
  if(ticket.assignedTo){
    // resolve assignedTo to email(s) — if group, fetch group members
    const userSnap = await db.collection('users').doc(ticket.assignedTo).get();
    if(userSnap.exists && userSnap.data()?.email) recipients.push(userSnap.data()!.email);
  }
  // always notify creator
  const creatorSnap = await db.collection('users').doc(ticket.createdBy).get();
  if(creatorSnap.exists && creatorSnap.data()?.email) recipients.push(creatorSnap.data()!.email);

  if (!functions.config().sendgrid?.key) {
    console.warn("SendGrid API key not configured. Skipping email notification.");
  } else if (recipients.length > 0) {
      // Use SendGrid
      const msg = { to: recipients, from: 'support@zekkers.com', subject, text: body };
      await sendgrid.send(msg);
  }

  // Create in-app notifications (fanout via notifications system)
  await db.collection('users').doc(ticket.createdBy).collection('notifications').add({ title: subject, body, read:false, createdAt: admin.firestore.FieldValue.serverTimestamp() });
}

