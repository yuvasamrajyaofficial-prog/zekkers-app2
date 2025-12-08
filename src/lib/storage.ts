'use client';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';

export const uploadUserFile = async (storage: FirebaseStorage, userId: string, file: File, folder = 'vault') => {
  const path = `users/${userId}/${folder}/${Date.now()}_${file.name}`;
  const r = ref(storage, path);
  const task = uploadBytesResumable(r, file);
  await task; // wait for upload
  return await getDownloadURL(r);
};

export async function uploadFile(storage: FirebaseStorage, file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}
