
'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import JobsClient from './_components/jobs-client';
import { Job } from '@/types/job';
import { fetchJobs } from '@/services/jobs';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const fetchedJobs = await fetchJobs('all');
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadJobs();
  }, []);

  return <JobsClient allJobs={jobs || []} isLoading={isLoading} />;
}
