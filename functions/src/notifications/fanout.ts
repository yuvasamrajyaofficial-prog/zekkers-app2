
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { enqueueDeliveryTask } from './delivery';

const db = admin.firestore();

/**
 * Resolves an audience object to a list of user UIDs.
 * @param {any} audience The audience object from the notification document.
 * @return {Promise<string[]>} A promise that resolves to an array of user IDs.
 */
async function resolveAudience(audience: any): Promise<string[]> {
  if (!audience) return [];

  const type = audience.type;
  if (type === 'user') return [audience.userId];
  if (type === 'list') return audience.userIds;

  let query: admin.firestore.Query;

  // In a real app, you might query different collections based on role
  // e.g., /students, /employers, etc. Here we assume a single /users collection.
  const collection = db.collection('users');

  if (type === 'dept') {
    query = collection.where('department', '==', audience.department);
  } else if (type === 'batch') {
    query = collection.where('batch', '==', audience.batch);
  } else if (type === 'all') {
    query = collection;
  } else {
    return [];
  }

  const snap = await query.get();
  return snap.docs.map((d) => d.id);
}

/**
 * Triggered when a new canonical notification is created.
 * Fans out the notification to individual user subcollections and enqueues delivery tasks.
 */
export const onNotificationCreate = functions.firestore
  .document('notifications/{nid}')
  .onCreate(async (snap) => {
    const note = snap.data();
    if (!note) {
      console.error('Notification data is missing.');
      return;
    }

    const userIds = await resolveAudience(note.audience);

    // Batch create user notification documents for real-time in-app display
    const batch = db.batch();
    for (const uid of userIds) {
      const ref = db.collection('users').doc(uid).collection('notifications').doc();
      batch.set(ref, {
        notificationId: snap.id,
        read: false,
        deliveredChannels: {},
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        data: note.data || {},
        title: note.title,
        body: note.body,
        category: note.category,
      });
    }
    await batch.commit();

    // Enqueue Cloud Tasks for actual multi-channel delivery
    const tasks = userIds.map(uid => enqueueDeliveryTask(uid, snap.id));
    await Promise.all(tasks);
  });
