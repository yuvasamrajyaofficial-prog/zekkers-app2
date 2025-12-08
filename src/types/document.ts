
export type Document = {
  id: string;
  name: string;
  category: 'Resumes' | 'Education' | 'ID Proofs' | 'Work Experience' | 'Certifications' | 'Visa / International' | 'Other';
  url: string;
  type: string; // MIME type e.g., 'application/pdf'
  size: number; // in bytes
  uploadedAt: Date;
  expiryDate?: Date;
  aiScore: number;
  aiExtractedFields?: { [key: string]: any };
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  sharedLinks?: {
    id: string;
    url: string;
    expiresAt: Date;
    accessCount: number;
  }[];
};
