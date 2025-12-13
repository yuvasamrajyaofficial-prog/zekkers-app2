'use client';

import React, { useEffect, useState } from 'react';
import { fetchJobById } from '@/services/jobs';
import JobsDetailClient from './_components/job-detail-client';
import { Job } from '@/types/job';
import { useFirestore } from '@/firebase';
import ZLoader from '@/components/ui/loader';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = React.use(params);
  const firestore = useFirestore();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
        if (!firestore || !id) return;
        setLoading(true);
        try {
            const fetchedJob = await fetchJobById(firestore, id);
            setJob(fetchedJob);
        } catch (error) {
            console.error("Failed to fetch job:", error);
        } finally {
            setLoading(false);
        }
    };
    loadJob();
  }, [firestore, id]);

  if (loading) {
      return <div className="flex h-full items-center justify-center"><ZLoader /></div>;
  }

  return <JobsDetailClient job={job} />;
}
