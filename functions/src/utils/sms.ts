import * as admin from 'firebase-admin';

/**
 * Sends an SMS using a third-party service like Twilio (mock implementation).
 * @param {string} userId The user's ID (to fetch phone number).
 * @param {string} text The message content.
 * @returns {Promise<boolean>} True if the SMS was sent successfully.
 */
export async function sendSMS(userId: string, text: string): Promise<boolean> {
  try {
    // In a real app, you would fetch the user's phone number from Firestore
    // const userDoc = await admin.firestore().doc(`users/${userId}`).get();
    // const phone = userDoc.data()?.phone;
    
    // Then, call your SMS provider's API (e.g., Twilio)
    console.log(`--- MOCK SMS ---`);
    console.log(`To: User ${userId}`);
    console.log(`Text: ${text}`);
    console.log(`----------------`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 150));

    return true;
  } catch (error) {
    console.error(`Failed to send SMS to user ${userId}:`, error);
    return false;
  }
}
