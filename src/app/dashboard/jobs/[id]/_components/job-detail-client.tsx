
'use client';
import React, { useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ZLoader from '@/components/ui/loader';
import { ChevronLeft } from 'lucide-react';
import { useDoc, useFirestore, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ProfileData } from '@/services/profile';
import { scoreJobForUser } from '@/lib/job-scoring';
import { applyForJob } from '@/services/applications';
import { useToast } from '@/hooks/use-toast';

interface JobsDetailClientProps {
  job: Job | null;
}

export default function JobsDetailClient({ job: initialJob }: JobsDetailClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<ProfileData>(userProfileRef);

  const [job, setJob] = useState<(Job & { aiMatch?: number }) | null>(initialJob);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isProfileLoading && initialJob) {
      const score = scoreJobForUser(initialJob, userProfile);
      setJob({ ...initialJob, aiMatch: score });
      setIsLoading(false);
    } else if (!initialJob) {
      setIsLoading(false);
    }
  }, [isProfileLoading, userProfile, initialJob]);


  const getPostedDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    // Firebase timestamps can be objects with seconds and nanoseconds
    if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
      return `${Math.round(
        (Date.now() - timestamp.seconds * 1000) / (24 * 3600 * 1000)
      )} days ago`;
    }
    // Or they can be plain numbers (milliseconds) or Date objects
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
      return `${Math.round(
        (Date.now() - date.getTime()) / (24 * 3600 * 1000)
      )} days ago`;
    }
    return 'Invalid Date';
  };

  if (isLoading) return <div className="p-6 flex justify-center"><ZLoader /></div>;
  if (!job) return <div className="p-6 text-center">Job not found</div>;
  
  const atsScore = job.aiMatch || 0;


  const handleApply = async () => {
    if (!user || !firestore || !job) return;
    
    try {
      setIsLoading(true);
      await applyForJob(firestore, {
        jobId: job.id,
        studentId: user.uid,
        employerId: job.companyId || 'unknown', // Fallback if companyId is missing
        jobTitle: job.title,
        companyName: job.company,
        resumeUrl: userProfile?.resumeUrl || '',
      });
      toast({
        title: "Application Submitted",
        description: `You have successfully applied for ${job.title}.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Application Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 gap-2"
      >
        <ChevronLeft className="w-4 h-4" /> Back to jobs
      </Button>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-2xl text-slate-600 flex-shrink-0">
                {job.company.slice(0, 2)}
              </div>
              <div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  {job.company} • {job.location}{' '}
                  {job.country ? `• ${job.country}` : ''}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right flex-shrink-0 w-full sm:w-auto">
              <div className="font-semibold text-sm text-muted-foreground">
                AI Match Score
              </div>
              <div
                className={`text-3xl font-bold ${
                  atsScore > 70
                    ? 'text-green-600'
                    : atsScore > 40
                    ? 'text-amber-500'
                    : 'text-red-500'
                }`}
              >
                {atsScore}%
              </div>
            </div>
          </div>
           <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{job.type}</Badge>
            <Badge variant="secondary">{job.experienceMin}+ years</Badge>
            {job.category && (
              <Badge variant="secondary" className="capitalize">
                {job.category}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h4 className="font-semibold text-lg">Job Description</h4>
            <p className="mt-2 text-muted-foreground prose prose-sm max-w-none">
              {job.description || 'No full description provided.'}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold">Requirements</h4>
              <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                {job.skills?.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
                {job.qualifications?.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold">Details</h4>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                <li>
                  <strong>Experience:</strong> {job.experienceMin || 0} -{' '}
                  {job.experienceMax || 'Any'} years
                </li>
                <li>
                  <strong>Salary:</strong>{' '}
                  {job.salaryMin
                    ? `₹${job.salaryMin.toLocaleString()} - ₹${
                        job.salaryMax?.toLocaleString() || ''
                      }`
                    : 'Not Disclosed'}
                </li>
                <li>
                  <strong>Posted:</strong> {getPostedDate(job.postedAt)}
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={handleApply} disabled={isLoading}>
                {isLoading ? 'Applying...' : 'Apply Now'}
            </Button>
            <Button variant="outline" size="lg">
              Save Job
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
