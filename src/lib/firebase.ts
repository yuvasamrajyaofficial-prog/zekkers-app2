import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if config is valid
const isConfigValid = Object.values(firebaseConfig).every(value => !!value);

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (!isConfigValid) {
  console.warn("Firebase configuration is missing or incomplete. Please check your environment variables.");
  // We don't initialize app here to avoid crash, but exports will be undefined/null effectively in usage if not handled.
  // However, to prevent immediate crash on import, we can't export undefined for these types easily without changing all consumers.
  // A better approach for the "crash" is to initialize a dummy app or just let it fail gracefully in context.
  // But standard Firebase SDK throws if config is empty.
  
  // For now, we will try to initialize, but if it fails, we catch it.
}

try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} catch (error) {
    console.error("Failed to initialize Firebase:", error);
    // Fallback to prevent "client-side exception" crash on module load
    // This allows the app to render, but auth features will break (which is better than a white screen crash)
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
    storage = {} as FirebaseStorage;
}

export { app, auth, db, storage };
