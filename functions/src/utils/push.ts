import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Sends a push notification to a user's most recent device.
 * @param {string} userId The user's ID.
 * @param {string} title The notification title.
 * @param {string} body The notification body.
 * @param {object} data Optional data payload.
 * @returns {Promise<boolean>} True if sent, false otherwise.
 */
export async function sendPushNotification(userId: string, title: string, body: string, data: { [key: string]: string }): Promise<boolean> {
  try {
    const tokensSnap = await db.collection('users').doc(userId).collection('devices').orderBy('lastSeen', 'desc').limit(1).get();
    
    if (tokensSnap.empty) {
      console.log(`No device tokens found for user ${userId}.`);
      return false;
    }

    const token = tokensSnap.docs[0].data().token;

    await admin.messaging().send({
      token,
      notification: { title, body },
      data,
      apns: {
        payload: {
          aps: {
            sound: 'default'
          }
        }
      }
    });

    console.log(`Push notification sent to user ${userId}.`);
    return true;
  } catch (error) {
    console.error(`Failed to send push notification to user ${userId}:`, error);
    // TODO: Handle invalid tokens and remove them from Firestore.
    return false;
  }
}
