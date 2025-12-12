
'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { Job } from '@/types/job';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import JobCard from './job-card';
import FiltersPanel from './filters-panel';
import { scoreJobForUser } from '@/lib/job-scoring'; 
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { ProfileData } from '@/services/profile';

interface JobsClientProps {
  allJobs: Job[];
  isLoading: boolean;
}

const initialFilters = {
  aiScore: 0,
  salary: [0, 5000000],
  experience: [],
  location: '',
  jobTypes: [],
};

const experienceToYears = (level: string): [number, number] => {
    if (level.startsWith('Fresher')) return [0, 1];
    if (level.startsWith('1-3')) return [1, 3];
    if (level.startsWith('3-5')) return [3, 5];
    if (level.startsWith('5-10')) return [5, 10];
    if (level.startsWith('10+')) return [10, 50];
    return [0, 50];
}

export default function JobsClient({ allJobs, isLoading }: JobsClientProps) {
  const [filters, setFilters] = useState<any>(initialFilters);
  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile } = useDoc<ProfileData>(userProfileRef);


  const jobsWithScores = useMemo(() => {
    if (!allJobs) return [];
    return allJobs.map(job => ({
      ...job,
      aiMatch: scoreJobForUser(job, userProfile)
    })).sort((a, b) => (new Date(b.postedAt).getTime() || 0) - (new Date(a.postedAt).getTime() || 0));
  }, [allJobs, userProfile]);

  const filteredJobs = useMemo(() => {
    const filterLogic = (jobs: (Job & {aiMatch?: number})[]) => {
      if (!jobs) return [];
      return jobs.filter(job => {
        const scoreMatch = (job.aiMatch || 0) >= filters.aiScore;
        
        const salaryMatch = (job.salaryMin ?? 0) >= filters.salary[0] && (job.salaryMin ?? Infinity) <= filters.salary[1];
        
        const expRanges = filters.experience.map(experienceToYears);
        const expMatch = filters.experience.length === 0 || expRanges.some(([min, max]: [number, number]) => 
            (job.experienceMin || 0) >= min && (job.experienceMin || 0) <= max
        );
        
        const locationMatch = !filters.location || 
          job.location.toLowerCase().includes(filters.location.toLowerCase()) || 
          (job.country || '').toLowerCase().includes(filters.location.toLowerCase());

        const jobTypeMatch = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);

        return scoreMatch && salaryMatch && expMatch && locationMatch && jobTypeMatch;
      });
    }
    
    return {
      all: filterLogic(jobsWithScores),
      government: filterLogic(jobsWithScores.filter(j => j.category === 'government')),
      private: filterLogic(jobsWithScores.filter(j => j.category === 'private')),
      international: filterLogic(jobsWithScores.filter(j => j.category === 'international')),
    };

  }, [jobsWithScores, filters]);


  const handleReset = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const renderJobList = (jobs: (Job & {aiMatch?: number})[]) => {
    if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}</div>;
    if (jobs.length === 0) return <div className="text-center text-muted-foreground py-10">No jobs found for this category and filters.</div>;
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {jobs.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    );
  };
  
  return (
    <div className="p-4 md:p-6">
        <FiltersPanel filters={filters} onFilterChange={setFilters} onReset={handleReset} />
        <Tabs defaultValue="all">
            <div className="w-full overflow-x-auto pb-2 no-scrollbar">
                <TabsList className="w-full justify-start md:justify-center">
                    <TabsTrigger value="all">All ({filteredJobs.all.length})</TabsTrigger>
                    <TabsTrigger value="government">Government ({filteredJobs.government.length})</TabsTrigger>
                    <TabsTrigger value="private">Private ({filteredJobs.private.length})</TabsTrigger>
                    <TabsTrigger value="international">International ({filteredJobs.international.length})</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="all" className="mt-4">{renderJobList(filteredJobs.all)}</TabsContent>
            <TabsContent value="government" className="mt-4">{renderJobList(filteredJobs.government)}</TabsContent>
            <TabsContent value="private" className="mt-4">{renderJobList(filteredJobs.private)}</TabsContent>
            <TabsContent value="international" className="mt-4">{renderJobList(filteredJobs.international)}</TabsContent>
        </Tabs>
    </div>
  );
}
