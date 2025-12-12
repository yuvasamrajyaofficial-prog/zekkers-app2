'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

// Define the shape of the services object
interface FirebaseServices {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  storage: FirebaseStorage;
  auth: Auth;
}

let firebaseServices: FirebaseServices | null = null;

// This function guarantees that Firebase is initialized only once.
export function initializeFirebase(): FirebaseServices {
  if (firebaseServices) {
    return firebaseServices;
  }

  const isConfigValid = Object.values(firebaseConfig).every(value => !!value);

  if (!isConfigValid) {
      console.warn("Firebase configuration is missing. Returning dummy services to prevent crash.");
      // Return dummy objects to prevent crash on property access
      return {
          firebaseApp: {} as FirebaseApp,
          firestore: {} as Firestore,
          storage: {} as FirebaseStorage,
          auth: {} as Auth
      };
  }

  let app: FirebaseApp;
  try {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }

    firebaseServices = {
        firebaseApp: app,
        firestore: getFirestore(app),
        storage: getStorage(app),
        auth: getAuth(app),
    };
  } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      return {
          firebaseApp: {} as FirebaseApp,
          firestore: {} as Firestore,
          storage: {} as FirebaseStorage,
          auth: {} as Auth
      };
  }

  return firebaseServices;
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './errors';
export * from './error-emitter';
