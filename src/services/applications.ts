import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Firestore
} from "firebase/firestore";

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
