import * as admin from 'firebase-admin';

/**
 * Sends an email using a third-party service (mock implementation).
 * @param {string} userId The user's ID (to fetch email address).
 * @param {string} subject The email subject.
 * @param {string} body The email body (HTML or text).
 * @returns {Promise<boolean>} True if the email was sent successfully.
 */
export async function sendEmail(userId: string, subject: string, body: string): Promise<boolean> {
  try {
    // In a real app, you would fetch the user's email from Firestore or Auth
    // const userRecord = await admin.auth().getUser(userId);
    // const email = userRecord.email;
    
    // Then, call your email provider's API (e.g., SendGrid, Postmark)
    console.log(`--- MOCK EMAIL ---`);
    console.log(`To: User ${userId}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    console.log(`------------------`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));

    return true;
  } catch (error) {
    console.error(`Failed to send email to user ${userId}:`, error);
    return false;
  }
}
