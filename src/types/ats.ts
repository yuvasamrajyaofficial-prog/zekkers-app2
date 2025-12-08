import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Candidate } from './candidate';

export type AtsStageId = 'Applied' | 'Screening' | 'Assessment' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';

export interface AtsStage {
  id: AtsStageId;
  title: string;
  color: string;
}

export interface AtsCandidate extends Omit<Candidate, 'status'> {
    status: AtsStageId;
    visaStatus?: 'Visa-Ready' | 'Needs Sponsorship' | 'Work Permit';
}

export const MOCK_STAGES: AtsStage[] = [
  { id: 'Applied', title: 'Applied', color: '#8B5CF6' },
  { id: 'Screening', title: 'Screening', color: '#3B82F6' },
  { id: 'Assessment', title: 'Assessment', color: '#F97316' },
  { id: 'Interview', title: 'Interview', color: '#EC4899' },
  { id: 'Offer', title: 'Offer', color: '#10B981' },
  { id: 'Hired', title: 'Hired', color: '#16A34A' },
  { id: 'Rejected', title: 'Rejected', color: '#EF4444' },
];

export const MOCK_ATS_CANDIDATES: AtsCandidate[] = [
  {
    id: 'cand-1',
    name: 'Anjali Sharma',
    email: 'anjali.sharma@example.com',
    location: 'Bengaluru, India',
    experienceYears: 2,
    jobId: 'priv-1',
    jobAppliedFor: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Next.js'],
    aiMatchScore: 92,
    resumeURL: '#',
    status: 'Interview',
    appliedAt: '2024-07-28T10:00:00Z',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar1')?.imageUrl,
    education: 'B.Tech',
    profileStrength: 88,
    visaStatus: 'Visa-Ready',
  },
  {
    id: 'cand-2',
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    location: 'Pune, India',
    experienceYears: 5,
    jobId: 'priv-2',
    jobAppliedFor: 'Senior Backend Engineer',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    aiMatchScore: 89,
    resumeURL: '#',
    status: 'Assessment',
    appliedAt: '2024-07-25T09:00:00Z',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar2')?.imageUrl,
    education: 'M.Tech',
    profileStrength: 95,
    visaStatus: 'Work Permit'
  },
  {
    id: 'cand-3',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    location: 'Remote',
    experienceYears: 1,
    jobId: 'priv-1',
    jobAppliedFor: 'UX/UI Designer',
    skills: ['Figma', 'Adobe XD'],
    aiMatchScore: 81,
    resumeURL: '#',
    status: 'Screening',
    appliedAt: '2024-07-29T14:00:00Z',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar3')?.imageUrl,
    education: 'B.Des',
    profileStrength: 75,
    visaStatus: 'Needs Sponsorship'
  },
  {
    id: 'cand-4',
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    location: 'Hyderabad',
    experienceYears: 3,
    jobId: 'priv-1',
    jobAppliedFor: 'Frontend Developer',
    skills: ['React', 'JavaScript', 'CSS'],
    aiMatchScore: 78,
    resumeURL: '#',
    status: 'Applied',
    appliedAt: '2024-07-30T11:00:00Z',
    avatar: PlaceHolderImages.find((p) => p.id === 'company4')?.imageUrl,
    education: 'B.E.',
    profileStrength: 70,
     visaStatus: 'Visa-Ready',
  },
  {
    id: 'cand-5',
    name: 'Sunita Reddy',
    email: 'sunita.r@example.com',
    location: 'Chennai',
    experienceYears: 8,
    jobId: 'priv-2',
    jobAppliedFor: 'Senior Backend Engineer',
    skills: ['Java', 'Spring', 'AWS'],
    aiMatchScore: 94,
    resumeURL: '#',
    status: 'Offer',
    appliedAt: '2024-07-22T10:00:00Z',
    avatar: PlaceHolderImages.find((p) => p.id === 'company5')?.imageUrl,
    education: 'M.S. in Software Engg.',
    profileStrength: 97,
     visaStatus: 'Work Permit',
  },
   {
    id: 'cand-6',
    name: 'Rajesh Singh',
    email: 'rajesh.s@example.com',
    location: 'Delhi',
    experienceYears: 4,
    jobId: 'priv-1',
    jobAppliedFor: 'Frontend Developer',
    skills: ['Angular', 'TypeScript', 'RxJS'],
    aiMatchScore: 75,
    resumeURL: '#',
    status: 'Rejected',
    appliedAt: '2024-07-15T12:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    education: 'B.Tech',
    profileStrength: 82,
     visaStatus: 'Needs Sponsorship',
  },
];
