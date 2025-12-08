
export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  experienceYears: number;
  jobId: string;
  jobAppliedFor: string;
  skills: string[];
  missingSkills?: string[];
  profileStrength: number;
  aiMatchScore: number;
  resumeURL: string;
  status: 'Applied' | 'Screening' | 'Assessment' | 'Interview' | 'Offer' | 'Hired' | 'Rejected' | 'Sourced';
  appliedAt: string;
  avatar?: string;
  notes?: { text: string; author: string; date: string }[];
  education: string;
  assessmentStatus?: 'Pending' | 'Completed' | 'Passed' | 'Failed';
  assessmentScore?: number;
  interviewStatus?: 'Scheduled' | 'Completed' | 'Not Scheduled';
  interviewDate?: string;
  savedBy?: string;
  savedAt?: string;
  source?: 'Zekkers' | 'Campus' | 'Referral' | 'Global' | 'AI Finder' | 'Job Applicants' | 'Talent Pool';
  visaStatus?: 'Visa-Ready' | 'Needs Sponsorship' | 'Work Permit';
};
