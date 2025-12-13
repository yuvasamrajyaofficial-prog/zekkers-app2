'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFirestore, useUser } from '@/firebase';
import { fetchEmployerJobs, updateJobStatus, deleteJob } from '@/services/jobs';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlusCircle, MoreHorizontal, Search, Filter, Loader2, Trash2, Eye, Ban, CheckCircle } from 'lucide-react';
import ZLoader from '@/components/ui/loader';

export default function JobManagementPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const loadJobs = async () => {
    if (!firestore || !user) return;
    setIsLoading(true);
    try {
        const fetchedJobs = await fetchEmployerJobs(firestore, user.uid);
        setJobs(fetchedJobs);
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast({ variant: 'destructive', title: 'Failed to load jobs' });
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [firestore, user]);

  const handleStatusUpdate = async (jobId: string, newStatus: Job['status']) => {
      if (!firestore) return;
      try {
          // Optimistic update
          setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
          await updateJobStatus(firestore, jobId, newStatus);
          toast({ title: `Job marked as ${newStatus}` });
      } catch (error) {
          console.error("Failed to update status", error);
          toast({ variant: 'destructive', title: 'Failed to update status' });
          loadJobs(); // Revert on error
      }
  };

  const confirmDelete = (jobId: string) => {
      setJobToDelete(jobId);
      setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
      if (!firestore || !jobToDelete) return;
      try {
          await deleteJob(firestore, jobToDelete);
          setJobs(prev => prev.filter(j => j.id !== jobToDelete));
          toast({ title: 'Job deleted successfully' });
      } catch (error) {
          console.error("Failed to delete job", error);
          toast({ variant: 'destructive', title: 'Failed to delete job' });
      } finally {
          setDeleteDialogOpen(false);
          setJobToDelete(null);
      }
  };

  const filteredJobs = jobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    published: 'bg-green-100 text-green-800 hover:bg-green-100',
    paused: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
    draft: 'bg-slate-100 text-slate-700 hover:bg-slate-100',
    closed: 'bg-red-100 text-red-700 hover:bg-red-100',
  };

  if (isLoading) return <div className="h-full flex items-center justify-center"><ZLoader /></div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Listings</h1>
          <p className="text-muted-foreground">Manage your job posts and track applications.</p>
        </div>
        <Button asChild>
            <Link href="/employer-dashboard/jobs/create" className="gap-2">
                <PlusCircle className="w-4 h-4" /> Post New Job
            </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                        <span>{job.title}</span>
                        <span className="text-xs text-muted-foreground">{job.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[job.status] || 'bg-slate-100'} variant="secondary">
                        {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    {job.postedAt ? new Date(job.postedAt.seconds * 1000 || job.postedAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/employer-dashboard/jobs/${job.id}`}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/employer-dashboard/jobs/${job.id}/applicants`}>
                                <Eye className="mr-2 h-4 w-4" /> View Applicants
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {job.status !== 'published' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(job.id, 'published')}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Publish
                            </DropdownMenuItem>
                        )}
                        {job.status === 'published' && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(job.id, 'closed')}>
                                <Ban className="mr-2 h-4 w-4" /> Close Job
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => confirmDelete(job.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the job listing.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
