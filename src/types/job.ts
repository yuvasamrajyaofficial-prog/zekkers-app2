

export type JobCategory = 'government' | 'private' | 'international';
export type JobType = 'onsite' | 'hybrid' | 'remote' | 'wfh' | 'internship' | 'fresher' | 'walkin' | 'parttime';

export type Job = {
  id: string;
  title: string;
  company: string;
  companyId?: string;
  employerId: string;
  location: string;
  category: JobCategory;
  country?: string; 
  department?: string;
  type: JobType;
  salaryMin?: number;
  salaryMax?: number;
  experienceMin?: number; 
  experienceMax?: number;
  skills?: string[];
  qualifications?: string[];
  description?: string;
  postedAt?: any; // Changed to any to accommodate server timestamps
  status: 'draft' | 'published' | 'paused' | 'closed';
  currency?: string;
};
