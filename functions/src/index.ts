import * as admin from 'firebase-admin';

admin.initializeApp();

// Export functions from their own files to keep index.ts clean.
export { onNotificationCreate } from './notifications/fanout';
export { deliverNotificationToUser } from './notifications/delivery';
export * from './integrations';
export * from './exports';
export * from './support';
