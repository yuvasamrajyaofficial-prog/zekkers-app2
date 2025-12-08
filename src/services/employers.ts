
'use client';

// ---------------------- Types ----------------------
export interface Employer {
  id: string;
  name: string;
  logo?: string; // URL
  country?: string;
  industry?: string;
  verified?: boolean;
  trustScore?: number; // 0-100
  size?: number;
  website?: string;
  linkedin?: string;
  hrEmail?: string;
  rating?: number; // 0-5
  hiringFrequency?: 'active'|'occasional'|'rare';
  jobsCount?: number;
  avgCtc?: string;
  createdAt?: string;
}

// ---------------------- Mock Data & Storage ----------------------
const EMP_KEY = 'zk:employers:mock';
function seedMockEmployers(){
  if(typeof window !== 'undefined' && !localStorage.getItem(EMP_KEY)){
    const arr: Employer[] = [
      { id:'e-1', name:'ZekkTech', country:'India', industry:'Technology', verified:true, trustScore:92, size:1200, website:'https://zekktech.example', linkedin:'https://linkedin.com/zekktech', hrEmail:'hr@zekktech.example', rating:4.4, hiringFrequency:'active', jobsCount:24, avgCtc:'8-14 LPA', createdAt: new Date().toISOString() },
      { id:'e-2', name:'DataWave', country:'USA', industry:'Data & AI', verified:true, trustScore:88, size:500, website:'https://datawave.example', linkedin:'https://linkedin.com/datawave', hrEmail:'hr@datawave.example', rating:4.1, hiringFrequency:'occasional', jobsCount:8, avgCtc:'60k-90k USD', createdAt: new Date().toISOString() },
      { id:'e-3', name:'Govt Dept of Railways', country:'India', industry:'Government', verified:true, trustScore:95, size:50000, website:'https://gov.example', linkedin:'', hrEmail:'', rating:4.6, hiringFrequency:'rare', jobsCount:120, avgCtc:'Varies', createdAt: new Date().toISOString() },
    ];
    localStorage.setItem(EMP_KEY, JSON.stringify(arr));
  }
}
seedMockEmployers();
function readMockEmployers(): Employer[]{ 
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(EMP_KEY) || '[]') as Employer[]; 
}
function writeMockEmployers(arr: Employer[]){ 
    if (typeof window === 'undefined') return;
    localStorage.setItem(EMP_KEY, JSON.stringify(arr)); 
}

// ---------------------- Services (Firestore-safe wrappers) ----------------------
export const EmployersService = {
  async list(collegeId?: string): Promise<Employer[]>{
    // TODO: Replace with Firestore v9 reads when ready
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return readMockEmployers();
  },
  async get(id: string): Promise<Employer | undefined>{
    await new Promise(resolve => setTimeout(resolve, 300));
    return readMockEmployers().find(x=> x.id===id);
  },
  async update(id: string, patch: Partial<Employer>): Promise<Employer>{
    const all = readMockEmployers(); 
    const idx = all.findIndex(x=> x.id===id); 
    if(idx>=0){ 
        all[idx] = { ...all[idx], ...patch }; 
        writeMockEmployers(all); 
        return all[idx]; 
    } 
    throw new Error('not-found');
  }
};
