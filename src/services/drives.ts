'use client';

// --------------------------- Types ---------------------------
export type DriveStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type DriveType = 'on-campus' | 'off-campus' | 'virtual' | 'pool';

export interface Drive {
  id: string;
  title: string;
  company: string;
  role: string;
  ctc?: string;
  date?: string; // ISO
  mode?: 'online' | 'offline' | 'hybrid';
  driveType?: DriveType;
  departments?: string[]; // eligible
  batches?: string[];
  minCgpa?: number;
  skills?: string[];
  status?: DriveStatus;
  applicantsCount?: number;
  createdAt?: string;
}

export interface ApplicantSummary {
  studentId: string;
  name: string;
  roll?: string;
  department?: string;
  batch?: string;
  resumeScore?: number;
  matchScore?: number; // AI score for drive
  status?: 'applied' | 'shortlisted' | 'rejected' | 'selected' | 'awaiting';
}

// --------------------------- Mock Seed ---------------------------
const DRIVES_KEY = 'zk:drives:mock';
const APPS_KEY_PREFIX = 'zk:drives:apps:';

function seedMockDrives() {
  if (typeof window !== 'undefined' && !localStorage.getItem(DRIVES_KEY)) {
    const a: Drive[] = [
      {
        id: 'd-1',
        title: 'Backend Engineer Hiring',
        company: 'ZekkTech',
        role: 'Backend Engineer',
        ctc: '8-12 LPA',
        date: '2025-12-10T10:00:00.000Z',
        mode: 'offline',
        driveType: 'on-campus',
        departments: ['CSE', 'IT'],
        batches: ['2024', '2025'],
        minCgpa: 6.5,
        skills: ['Node', 'DB'],
        status: 'upcoming',
        applicantsCount: 120,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'd-2',
        title: 'Analyst — Data',
        company: 'DataWave',
        role: 'Data Analyst',
        ctc: '6-8 LPA',
        date: '2025-11-01T09:00:00.000Z',
        mode: 'online',
        driveType: 'virtual',
        departments: ['CSE', 'ECON', 'IT'],
        batches: ['2023', '2024'],
        minCgpa: 6.0,
        skills: ['SQL', 'Python'],
        status: 'active',
        applicantsCount: 85,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'd-3',
        title: 'Frontend Developer',
        company: 'Innovate Inc.',
        role: 'Frontend Developer',
        ctc: '10-15 LPA',
        date: '2024-08-15T11:00:00.000Z',
        mode: 'hybrid',
        driveType: 'pool',
        departments: ['CSE', 'IT', 'ECE'],
        batches: ['2025'],
        minCgpa: 7.0,
        skills: ['React', 'TypeScript'],
        status: 'completed',
        applicantsCount: 250,
        createdAt: new Date().toISOString(),
      }
    ];
    localStorage.setItem(DRIVES_KEY, JSON.stringify(a));
    // seed applicants
    const apps1: ApplicantSummary[] = [];
    for (let i = 1; i <= 120; i++)
      apps1.push({
        studentId: `s-${i}`,
        name: `Student ${i}`,
        roll: `20CSE${100 + i}`,
        department: i % 2 === 0 ? 'CSE' : 'IT',
        batch: '' + (2022 + (i % 4)),
        resumeScore: Math.floor(Math.random() * 40) + 50,
        matchScore: Math.floor(Math.random() * 40) + 50,
        status: i % 10 === 0 ? 'selected' : 'applied',
      });
    localStorage.setItem(APPS_KEY_PREFIX + 'd-1', JSON.stringify(apps1));
    const apps2: ApplicantSummary[] = [];
    for (let i = 1; i <= 85; i++)
      apps2.push({
        studentId: `t-${i}`,
        name: `Applicant ${i}`,
        roll: `20ENG${200 + i}`,
        department: 'ECON',
        batch: '2023',
        resumeScore: Math.floor(Math.random() * 40) + 50,
        matchScore: Math.floor(Math.random() * 40) + 40,
        status: 'applied',
      });
    localStorage.setItem(APPS_KEY_PREFIX + 'd-2', JSON.stringify(apps2));
  }
}
seedMockDrives();

function readMockDrives(): Drive[] {
  if(typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(DRIVES_KEY) || '[]') as Drive[];
}
function writeMockDrives(v: Drive[]) {
  if(typeof window !== 'undefined') localStorage.setItem(DRIVES_KEY, JSON.stringify(v));
}
function readMockApplicants(driveId: string): ApplicantSummary[] {
  if(typeof window === 'undefined') return [];
  return JSON.parse(
    localStorage.getItem(APPS_KEY_PREFIX + driveId) || '[]'
  ) as ApplicantSummary[];
}
function writeMockApplicants(driveId: string, arr: ApplicantSummary[]) {
  if(typeof window !== 'undefined') localStorage.setItem(APPS_KEY_PREFIX + driveId, JSON.stringify(arr));
}

// --------------------------- Services ---------------------------
export const DrivesService = {
  async list(collegeId?: string): Promise<Drive[]> {
    // In a real app, replace with Firestore reads
    return new Promise(resolve => setTimeout(() => resolve(readMockDrives()), 500));
  },
  async create(collegeId: string | undefined, payload: Partial<Drive>) {
    const arr = readMockDrives();
    const id = 'd-' + (Date.now() % 100000);
    const obj: Drive = {
      id,
      title: payload.title || 'Untitled Drive',
      company: payload.company || 'Unknown',
      role: payload.role || '',
      ctc: payload.ctc,
      date: payload.date,
      mode: payload.mode,
      driveType: payload.driveType,
      departments: payload.departments || [],
      batches: payload.batches || [],
      minCgpa: payload.minCgpa,
      skills: payload.skills || [],
      status: payload.status || 'upcoming',
      applicantsCount: 0,
      createdAt: new Date().toISOString(),
    };
    arr.unshift(obj);
    writeMockDrives(arr);
    writeMockApplicants(obj.id, []);
    return obj;
  },
  // Other service methods...
};
