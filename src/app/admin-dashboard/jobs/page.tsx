
'use client';
import React, { useMemo, useState } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import ZLoader from '@/components/ui/loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Job } from '@/types/job';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const statusColors: { [key: string]: string } = {
  published: 'bg-green-100 text-green-800',
  draft: 'bg-slate-100 text-slate-800',
  paused: 'bg-amber-100 text-amber-800',
  closed: 'bg-red-100 text-red-800',
};


export default function AdminJobsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const jobsCollection = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'jobs');
  }, [firestore]);

  const { data: jobs, isLoading, error } = useCollection<Job>(jobsCollection);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const getPostedDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    // Firebase timestamps can be objects with seconds and nanoseconds
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    // Or they can be plain numbers (milliseconds) or Date objects
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString();
    }
    return 'Invalid Date';
  };

  const handleDeleteJob = async () => {
    if (!jobToDelete || !firestore) return;
    
    const jobRef = doc(firestore, 'jobs', jobToDelete.id);
    deleteDocumentNonBlocking(jobRef);

    toast({
        title: 'Job Deletion Initiated',
        description: `The job "${jobToDelete.title}" is being deleted.`,
    });
    setJobToDelete(null);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
            <div>
                <CardTitle>Jobs & Moderation</CardTitle>
                <CardDescription>View, manage, and moderate all job listings on the platform.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin-dashboard/jobs/create" className='gap-2'>
                    <PlusCircle size={16} />
                    Create New Job
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-10">
              <ZLoader />
            </div>
          )}
          {error && (
            <div className="text-center py-10 text-red-500">
              <p>Error loading jobs: {error.message}</p>
            </div>
          )}
          {!isLoading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posted On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell><Badge variant="secondary" className='capitalize'>{job.category}</Badge></TableCell>
                      <TableCell>
                        <Badge className={`capitalize ${statusColors[job.status] || ''}`}>{job.status}</Badge>
                      </TableCell>
                      <TableCell>{getPostedDate(job.postedAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Job</DropdownMenuItem>
                            <DropdownMenuItem>Edit Job</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => setJobToDelete(job)}>Delete Job</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
          )}
        </CardContent>
      </Card>
      
      <AlertDialog open={!!jobToDelete} onOpenChange={(open) => !open && setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job
              posting for "{jobToDelete?.title}" and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteJob} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Yes, delete job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
