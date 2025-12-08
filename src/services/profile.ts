import { doc, getDoc, setDoc, serverTimestamp, Firestore } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, FirebaseStorage } from "firebase/storage";
import { updateDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

// --- Type declarations ---
type Education = { id: string; school: string; degree: string; startYear: number; endYear: number };
type Experience = { id: string; company: string; role: string; from: string; to: string; description: string };
type Project = { id: string; title: string; description: string; link?: string };
type Skill = { name: string; level: number };

export type UserRole = 'Student/Job Seeker' | 'Indian Employer' | 'NGO' | 'Global Employer' | 'Admin';

export type ProfileData = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  about?: string;
  role?: UserRole;
  resumeScore?: number;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  languages: string[];
  certifications: string[];
  social: { github?: string; portfolio?: string; };
  avatarUrl?: string;
  resumeUrl?: string;
  updatedAt?: any;
  department?: string;
  batch?: string;
  profileCompletion?: number;
  placementStatus?: 'Placed' | 'In Process' | 'Not Placed' | 'Interned';
  verified?: boolean;
};


// --- Firestore wrapper functions ---

export async function getUserProfile(firestore: Firestore, userId: string): Promise<ProfileData | null> {
  if (!userId || !firestore) return null;
  const docRef = doc(firestore, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as ProfileData;
  }
  return null;
}

export function saveUserProfile(firestore: Firestore, userId: string, payload: Partial<ProfileData>) {
  const docRef = doc(firestore, "users", userId);
  const dataWithTimestamp = { ...payload, updatedAt: serverTimestamp() };
  
  // Use set with merge instead of update to handle profile creation gracefully
  setDocumentNonBlocking(docRef, dataWithTimestamp, { merge: true });
}

// --- Storage wrapper functions ---

export async function uploadUserFile(storage: FirebaseStorage, userId: string, file: File, folder = "misc"): Promise<string> {
  const path = `users/${userId}/${folder}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}
