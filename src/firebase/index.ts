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

  let app: FirebaseApp;
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

  return firebaseServices;
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './errors';
export * from './error-emitter';
