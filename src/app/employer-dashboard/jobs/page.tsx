
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Filter, Globe, Home, Search, Save, Cloud, Edit, Briefcase, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { JobActions } from './_components/job-actions';
import { Job } from '@/types/job';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

import { useFirestore } from '@/firebase';
import { fetchJobs } from '@/services/jobs';

export default function JobManagementPage(){
  const { toast } = useToast();
  const firestore = useFirestore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const loadJobs = async () => {
        setIsLoading(true);
        try {
            const fetchedJobs = await fetchJobs(firestore, 'all');
            setJobs(fetchedJobs);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
            toast({ variant: 'destructive', title: 'Failed to load jobs' });
        } finally {
            setIsLoading(false);
        }
    };
    if (firestore) {
        loadJobs();
    }
  }, [firestore, toast]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => 
        (j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === 'all' || j.status === statusFilter)
    );
  }, [jobs, searchQuery, statusFilter]);

  const handleUpdateStatus = (jobId: string, status: Job['status']) => {
    // Ideally update in Firestore too
    setJobs(currentJobs => currentJobs.map(j => j.id === jobId ? { ...j, status } : j));
  };

  const handleDelete = (jobId: string) => {
    // Ideally delete from Firestore too
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  const statusColors: { [key: string]: string } = {
    published: 'bg-green-100 text-green-800',
    paused: 'bg-amber-100 text-amber-800',
    draft: 'bg-slate-100 text-slate-700',
    closed: 'bg-red-100 text-red-700',
  };
  
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3"><Briefcase/> Job Management</CardTitle>
                <CardDescription>View, manage, and moderate all job listings on the platform.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/employer-dashboard/jobs/create" className='gap-2'>
                    <PlusCircle size={16} />
                    Create New Job
                </Link>
            </Button>
          </div>
           <div className="relative pt-4 flex gap-4">
            <Search className="absolute left-3 top-7 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search jobs..." 
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-24">
                                Loading jobs...
                            </TableCell>
                        </TableRow>
                    ) : filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{(job as any).applicants || 0}</TableCell>
                        <TableCell>{job.postedAt ? new Date(job.postedAt.seconds * 1000 || job.postedAt).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell>
                            <Badge className={`${statusColors[job.status]}`}>{job.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <JobActions job={job} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                        No jobs found.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
