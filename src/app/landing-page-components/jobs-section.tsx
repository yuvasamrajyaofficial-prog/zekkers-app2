
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MotionFade from '@/components/motion-fade';
import { fetchJobs } from '@/services/jobs';
import { Job } from '@/types/job';

const JobCard = ({ job, i }: { job: Job, i: number }) => (
    <MotionFade key={job.id} delay={i * 0.04}>
        <div
        className="p-4 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-200 ease-out"
        >
        <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-border flex items-center justify-center text-slate-400 font-semibold">
            {job.company.slice(0, 2)}
            </div>
            <div className="flex-1">
            <div className="font-semibold text-foreground">{job.title}</div>
            <div className="text-xs text-muted-foreground">
                {job.company} • {job.location}
            </div>
            </div>
            <div className="text-right">
            <div className="text-sm font-medium text-foreground">{typeof job.salaryMin === 'number' ? `₹${(job.salaryMin / 100000).toFixed(1)}L` : 'N/A'}</div>
            <div className="text-xs text-muted-foreground">
                {job.type === 'remote' ? 'Remote' : 'Onsite'}
            </div>
            </div>
        </div>

        <div className="mt-3 flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
            <Heart size={14} />
            Save
            </Button>
            <Button asChild variant="secondary" size="sm">
            <Link href={`/dashboard/jobs/${job.id}`}>View</Link>
            </Button>
            <Button size="sm" className="ml-auto">
            Apply
            </Button>
        </div>
        </div>
    </MotionFade>
);


export default function JobsSection() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJobs() {
            setLoading(true);
            try {
                // Call the mock client-side service
                const fetchedJobs = await fetchJobs('all');
                setJobs(fetchedJobs.slice(0, 6)); // Take first 6
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        }
        loadJobs();
    }, []);

    return (
        <section
            id="jobs"
            className="px-6 md:px-12 py-12"
        >
            <div className="max-w-7xl mx-auto">
            <MotionFade>
                <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-foreground">Live Job Feed</h3>
                    <p className="text-sm text-muted-foreground">
                    Latest and trending roles curated for you.
                    </p>
                </div>
                <div className="text-sm text-muted-foreground">
                    Showing <strong>{jobs.length}</strong> jobs
                </div>
                </div>
            </MotionFade>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({length: 6}).map((_, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-card border border-border/50 h-[124px]">
                            <div className="flex items-start gap-3 animate-pulse">
                                <div className="w-12 h-12 rounded-lg bg-border"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-border rounded w-3/4"></div>
                                    <div className="h-3 bg-border rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    jobs.map((job, i) => <JobCard key={job.id} job={job} i={i} />)
                )}
            </div>
            </div>
      </section>
    );
}
