
import { Job, JobCategory } from "@/types/job";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  getDoc, 
  serverTimestamp,
  Firestore,
  deleteDoc
} from "firebase/firestore";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export async function createJob(firestore: Firestore, jobData: Omit<Job, 'id' | 'postedAt'>) {
  try {
    const docRef = await addDoc(collection(firestore, 'jobs'), {
      ...jobData,
      postedAt: serverTimestamp(),
      status: 'published' // Default to published for now
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}

export async function fetchJobs(firestore: Firestore, category?: JobCategory | 'all'): Promise<Job[]> {
    if (!firestore) return [];
    
    try {
        const jobsRef = collection(firestore, 'jobs');
        let q;

        if (category && category !== 'all') {
            q = query(jobsRef, where('category', '==', category), orderBy('postedAt', 'desc'));
        } else {
            q = query(jobsRef, orderBy('postedAt', 'desc'));
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Job));
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
}

export async function fetchJobById(firestore: Firestore, id: string): Promise<Job | null> {
    if (!firestore) return null;
    try {
        const docRef = doc(firestore, 'jobs', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Job;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching job:", error);
        return null;
    }
}
export async function fetchEmployerJobs(firestore: Firestore, employerId: string): Promise<Job[]> {
    if (!firestore || !employerId) return [];
    try {
        const jobsRef = collection(firestore, 'jobs');
        const q = query(jobsRef, where('employerId', '==', employerId), orderBy('postedAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Job));
    } catch (error) {
        console.error("Error fetching employer jobs:", error);
        return [];
    }
}

export async function updateJobStatus(firestore: Firestore, jobId: string, status: Job['status']) {
    try {
        const jobRef = doc(firestore, 'jobs', jobId);
        await updateDocumentNonBlocking(jobRef, { status });
    } catch (error) {
        console.error("Error updating job status:", error);
        throw error;
    }
}

export async function deleteJob(firestore: Firestore, jobId: string) {
    try {
        const jobRef = doc(firestore, 'jobs', jobId);
        await deleteDoc(jobRef);
    } catch (error) {
        console.error("Error deleting job:", error);
        throw error;
    }
}
