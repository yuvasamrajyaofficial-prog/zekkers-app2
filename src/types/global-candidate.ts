
import { PlaceHolderImages } from '@/lib/placeholder-images';

type VisaStatus = 'Visa-Ready' | 'Needs Sponsorship' | 'Work Permit';

export interface GlobalCandidate {
  id: string;
  name: string;
  avatar: string;
  country: string;
  region: 'Asia' | 'Europe' | 'North America' | 'Middle East';
  role: string;
  skills: string[];
  experience: number;
  visaStatus: VisaStatus;
  englishProficiency: 'Native' | 'Fluent' | 'Conversational';
  aiMatch: number;
  education: string;
  appliedAt: string;
}


export const MOCK_GLOBAL_CANDIDATES: GlobalCandidate[] = [
  {
    id: 'gc-1',
    name: 'Kenji Tanaka',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar1')?.imageUrl || '',
    country: 'Japan',
    region: 'Asia',
    role: 'Software Engineer',
    skills: ['Go', 'Kubernetes', 'AWS'],
    experience: 5,
    visaStatus: 'Visa-Ready',
    englishProficiency: 'Fluent',
    aiMatch: 91,
    education: 'B.S. in Computer Science',
    appliedAt: '2024-07-20T10:00:00Z',
  },
  {
    id: 'gc-2',
    name: 'Maria Schmidt',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar2')?.imageUrl || '',
    country: 'Germany',
    region: 'Europe',
    role: 'Product Manager',
    skills: ['Agile', 'Roadmapping', 'JIRA'],
    experience: 8,
    visaStatus: 'Work Permit',
    englishProficiency: 'Fluent',
    aiMatch: 88,
    education: 'M.B.A.',
    appliedAt: '2024-07-18T14:00:00Z',
  },
  {
    id: 'gc-3',
    name: 'Ahmed Al-Farsi',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar3')?.imageUrl || '',
    country: 'UAE',
    region: 'Middle East',
    role: 'Civil Engineer',
    skills: ['AutoCAD', 'Project Management'],
    experience: 10,
    visaStatus: 'Needs Sponsorship',
    englishProficiency: 'Conversational',
    aiMatch: 82,
    education: 'B.E. in Civil Engineering',
    appliedAt: '2024-07-22T09:00:00Z',
  },
  {
    id: 'gc-4',
    name: 'Sofia Rossi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80',
    country: 'USA',
    region: 'North America',
    role: 'Marketing Lead',
    skills: ['SEO', 'Content Strategy', 'Google Analytics'],
    experience: 6,
    visaStatus: 'Work Permit',
    englishProficiency: 'Native',
    aiMatch: 94,
    education: 'B.A. in Marketing',
    appliedAt: '2024-07-25T11:00:00Z',
  },
];
