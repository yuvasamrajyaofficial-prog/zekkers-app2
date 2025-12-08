import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { sendEmail } from '../utils/email';
import { sendSMS } from '../utils/sms';
import { sendPushNotification } from '../utils/push';

const db = admin.firestore();

/**
 * Creates a Cloud Task to handle the delivery of a notification to a specific user.
 * @param {string} userId The ID of the user to notify.
 * @param {string} notificationId The ID of the canonical notification.
 */
export async function enqueueDeliveryTask(userId: string, notificationId: string) {
  const { CloudTasksClient } = require('@google-cloud/tasks');
  const client = new CloudTasksClient();
  
  const project = process.env.GCLOUD_PROJECT || functions.config().gcp.project;
  const location = 'us-central1'; // Or your function's region
  const queue = 'notifications-delivery'; // Ensure this queue exists in your GCP project

  const queuePath = client.queuePath(project, location, queue);
  
  // This is the URL of the `deliverNotificationToUser` HTTPS function.
  // In a real project, this URL should be from your config.
  const url = `https://${location}-${project}.cloudfunctions.net/deliverNotificationToUser`;

  const task = {
    httpRequest: {
      httpMethod: 'POST' as const,
      url,
      headers: { 'Content-Type': 'application/json' },
      body: Buffer.from(JSON.stringify({ userId, notificationId })).toString('base64'),
    },
    scheduleTime: {
      seconds: Date.now() / 1000 + 5, // Schedule with a slight delay
    }
  };

  try {
    await client.createTask({ parent: queuePath, task });
  } catch (error) {
    console.error('Failed to create Cloud Task:', error);
  }
}

/**
 * An HTTP-triggered function that acts as a worker to deliver a notification.
 * This is intended to be called by Cloud Tasks.
 */
export const deliverNotificationToUser = functions.https.onRequest(async (req, res) => {
  // Basic validation
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { userId, notificationId } = req.body;

    if (!userId || !notificationId) {
      res.status(400).json({ error: 'Missing userId or notificationId' });
      return;
    }

    // Fetch user preferences and the specific notification document for this user.
    const userPrefsSnap = await db.collection('users').doc(userId).collection('notificationPreferences').doc('prefs').get();
    const prefs = userPrefsSnap.data() || {};

    const noteSnap = await db
      .collection('users').doc(userId).collection('notifications')
      .where('notificationId', '==', notificationId).limit(1).get();

    if (noteSnap.empty) {
      res.status(404).json({ error: 'Notification for user not found.' });
      return;
    }

    const noteRef = noteSnap.docs[0].ref;
    const note = noteSnap.docs[0].data();

    const delivered: { [key: string]: boolean } = {};

    // Channel: Push Notification
    if (prefs?.enabledChannels?.push) {
      const sent = await sendPushNotification(userId, note.title, note.body, { notificationId, ...note.data });
      if (sent) delivered['push'] = true;
    }

    // Channel: Email
    if (prefs?.enabledChannels?.email) {
      const sent = await sendEmail(userId, note.title, note.body);
      if (sent) delivered['email'] = true;
    }

    // Channel: SMS
    if (prefs?.enabledChannels?.sms) {
      const sent = await sendSMS(userId, note.body);
      if (sent) delivered['sms'] = true;
    }

    // Update the delivery status
    await noteRef.update({ deliveredChannels: delivered });

    res.status(200).json({ success: true, delivered });
  } catch (e: any) {
    console.error('Delivery failed:', e.message);
    res.status(500).json({ error: 'delivery-failed', message: e.message });
  }
});
