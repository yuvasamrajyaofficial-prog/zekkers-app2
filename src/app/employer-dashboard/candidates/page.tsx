'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useFirestore, useUser } from '@/firebase';
import { fetchEmployerApplications, updateApplicationStatus, Application } from '@/services/applications';
import { fetchEmployerJobs } from '@/services/jobs';
import { Job } from '@/types/job';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Search,
  LayoutGrid,
  List,
  Sparkles,
  Download,
  Users,
  X,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ZLoader from '@/components/ui/loader';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CandidatesPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadData = async () => {
      if (!firestore || !user) return;
      setLoading(true);
      try {
          const [apps, employerJobs] = await Promise.all([
              fetchEmployerApplications(firestore, user.uid),
              fetchEmployerJobs(firestore, user.uid)
          ]);
          setApplications(apps);
          setJobs(employerJobs);
      } catch (error) {
          console.error("Error loading candidates:", error);
          toast({ variant: 'destructive', title: 'Failed to load candidates' });
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      loadData();
  }, [firestore, user]);

  const handleStatusUpdate = async (appId: string, newStatus: Application['status']) => {
      if (!firestore) return;
      try {
          // Optimistic update
          setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
          await updateApplicationStatus(firestore, appId, newStatus);
          toast({ title: `Candidate moved to ${newStatus}` });
      } catch (error) {
          console.error("Failed to update status", error);
          toast({ variant: 'destructive', title: 'Failed to update status' });
          loadData(); // Revert
      }
  };

  const filteredApplications = useMemo(() => {
      return applications.filter(app => {
          const matchesSearch = (app.studentId || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                                (app.jobTitle || '').toLowerCase().includes(searchQuery.toLowerCase());
          const matchesJob = jobFilter === 'all' || app.jobId === jobFilter;
          const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
          
          return matchesSearch && matchesJob && matchesStatus;
      });
  }, [applications, searchQuery, jobFilter, statusFilter]);

  const statusColors: Record<string, string> = {
      applied: 'bg-blue-100 text-blue-800',
      screening: 'bg-amber-100 text-amber-800',
      interview: 'bg-purple-100 text-purple-800',
      offer: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
  };

  if (loading) return <div className="h-full flex items-center justify-center"><ZLoader /></div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Users />
                Candidates
              </CardTitle>
              <CardDescription className="mt-1">
                View and manage applicants across all your job postings.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2">
                <Download size={16} /> Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or job title..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Job" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {jobs.map(job => (
                        <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
          </div>

          {/* Applications Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Job Applied For</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell>
                                    <div className="font-medium">Student ID: {app.studentId.substring(0, 8)}...</div>
                                    <div className="text-xs text-muted-foreground">{app.studentId}</div>
                                </TableCell>
                                <TableCell>{app.jobTitle}</TableCell>
                                <TableCell>
                                    {app.appliedAt ? new Date(app.appliedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <Badge className={statusColors[app.status] || 'bg-slate-100'} variant="secondary">
                                        {app.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {app.resumeUrl ? (
                                        <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm">
                                            View Resume
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground text-sm">No Resume</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">Manage</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(app.id!, 'screening')}>
                                                Move to Screening
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(app.id!, 'interview')}>
                                                Schedule Interview
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(app.id!, 'offer')}>
                                                Make Offer
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600" onClick={() => handleStatusUpdate(app.id!, 'rejected')}>
                                                Reject
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                No candidates found matching your filters.
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
