import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Firestore,
  doc
} from "firebase/firestore";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export interface Application {
  id?: string;
  jobId: string;
  studentId: string;
  employerId: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  appliedAt: any;
  resumeUrl?: string;
  jobTitle?: string; // Denormalized for easier display
  companyName?: string; // Denormalized for easier display
}

export async function applyForJob(firestore: Firestore, applicationData: Omit<Application, 'id' | 'appliedAt' | 'status'>) {
  try {
    // Check if already applied
    const q = query(
        collection(firestore, 'applications'), 
        where('jobId', '==', applicationData.jobId),
        where('studentId', '==', applicationData.studentId)
    );
    const existing = await getDocs(q);
    if (!existing.empty) {
        throw new Error("You have already applied for this job.");
    }

    const docRef = await addDoc(collection(firestore, 'applications'), {
      ...applicationData,
      status: 'applied',
      appliedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw error;
  }
}

export async function fetchStudentApplications(firestore: Firestore, studentId: string): Promise<Application[]> {
    if (!firestore) return [];
    try {
        const q = query(
            collection(firestore, 'applications'), 
            where('studentId', '==', studentId),
            orderBy('appliedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Application));
    } catch (error) {
        console.error("Error fetching applications:", error);
        return [];
    }
}
export async function fetchEmployerApplications(firestore: Firestore, employerId: string): Promise<Application[]> {
    if (!firestore) return [];
    try {
        const q = query(
            collection(firestore, 'applications'), 
            where('employerId', '==', employerId),
            orderBy('appliedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Application));
    } catch (error) {
        console.error("Error fetching employer applications:", error);
        return [];
    }
}

export async function updateApplicationStatus(firestore: Firestore, applicationId: string, status: Application['status']) {
    try {
        const appRef = doc(firestore, 'applications', applicationId);
        await updateDocumentNonBlocking(appRef, { status });
    } catch (error) {
        console.error("Error updating application status:", error);
        throw error;
    }
}
