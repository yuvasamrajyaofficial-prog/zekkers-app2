

import { Job, JobCategory } from "@/types/job";
import { MOCK_JOBS } from "@/lib/mock-data/jobs";


export async function fetchJobs(category: JobCategory | 'all'): Promise<Job[]> {
    // In a real app, you'd fetch from Firestore here.
    // e.g., const q = query(collection(db, 'jobs'), where('category', '==', category));
    
    const all: Job[] = MOCK_JOBS;
    
    if (category === 'all') {
      return new Promise(resolve => setTimeout(() => resolve(all.sort((a,b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())), 100));
    }

    const filtered = all.filter(j => j.category === category);
    
    return new Promise(resolve => setTimeout(() => resolve(filtered.sort((a,b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())), 100));
}

export async function fetchJobById(id: string): Promise<Job | null> {
    const all: Job[] = MOCK_JOBS;
    const job = all.find(j => j.id === id) || null;

    return new Promise(resolve => setTimeout(() => resolve(job), 100));
}
