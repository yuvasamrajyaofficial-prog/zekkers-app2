
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  PlusCircle,
  Search,
} from 'lucide-react';
import { Job } from '@/types/job';
import { JobActions } from './_components/job-actions';
import Link from 'next/link';

// --- Mock Data ---
const MOCK_JOBS: Job[] = [
  { id: 'j1', title: 'Senior Cloud Engineer', company: 'GlobalCorp', location: 'Berlin', country: 'Germany', category: 'international', type: 'remote', status: 'published', salaryMin: 90000, currency: 'EUR', postedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000) },
  { id: 'j2', title: 'Marketing Lead, APAC', company: 'GlobalCorp', location: 'Singapore', country: 'Singapore', category: 'international', type: 'hybrid', status: 'published', salaryMin: 120000, currency: 'SGD', postedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000) },
  { id: 'j3', title: 'Lead Data Scientist', company: 'GlobalCorp', location: 'New York', country: 'USA', category: 'international', type: 'onsite', status: 'paused', salaryMin: 150000, currency: 'USD', postedAt: new Date(Date.now() - 10 * 24 * 3600 * 1000) },
  { id: 'j4', title: 'Junior DevOps Engineer', company: 'GlobalCorp', location: 'London', country: 'UK', category: 'international', type: 'onsite', status: 'draft', salaryMin: 50000, currency: 'GBP', postedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000) },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const statusColors: { [key: string]: string } = {
  published: 'bg-green-100 text-green-700',
  paused: 'bg-amber-100 text-amber-700',
  draft: 'bg-slate-100 text-slate-700',
  closed: 'bg-red-100 text-red-700',
};


export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: 'all', country: 'all' });

  useEffect(() => {
    // Safe access to localStorage only on the client
    setJobs(MOCK_JOBS);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(j =>
      (j.title.toLowerCase().includes(search.toLowerCase()) || j.id.toLowerCase().includes(search.toLowerCase())) &&
      (filters.status === 'all' || j.status === filters.status) &&
      (filters.country === 'all' || j.country === filters.country)
    );
  }, [jobs, search, filters]);

  const handleUpdateStatus = (jobId: string, status: Job['status']) => {
    setJobs(currentJobs => currentJobs.map(j => j.id === jobId ? { ...j, status } : j));
  };

  const handleDelete = (jobId: string) => {
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3"><Briefcase /> Job Management</CardTitle>
              <CardDescription>View, edit, and manage all global job postings.</CardDescription>
            </div>
            <Button asChild>
              <Link href="/global-employers-dashboard/jobs/create">
                <PlusCircle size={16} className="mr-2" /> Post New Global Job
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 mb-6 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by job title or ID..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={filters.status} onValueChange={v => setFilters(f => ({ ...f, status: v }))}>
              <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.country} onValueChange={v => setFilters(f => ({ ...f, country: v }))}>
              <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Filter by country" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Singapore">Singapore</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
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
              <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <motion.tr key={job.id} variants={itemVariants}>
                      <TableCell className="font-medium">
                        <div>{job.title}</div>
                        <div className="text-xs text-muted-foreground">{job.id}</div>
                      </TableCell>
                      <TableCell>{job.location}, {job.country}</TableCell>
                      <TableCell>{(job as any).applicants || 0}</TableCell>
                      <TableCell>{job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[job.status]}`}>{job.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <JobActions job={job} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">No jobs found.</TableCell>
                  </TableRow>
                )}
              </motion.tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
