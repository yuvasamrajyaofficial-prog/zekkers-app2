'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, CheckCircle, XCircle, Trash2, ExternalLink, Filter } from 'lucide-react';

// Mock Data for Jobs
const initialJobs = [
  { id: 1, title: 'Senior React Developer', company: 'Tech Solutions Ltd', location: 'Remote', status: 'active', posted: '2023-12-10' },
  { id: 2, title: 'Marketing Intern', company: 'Creative Agency', location: 'New York, NY', status: 'pending', posted: '2023-12-12' },
  { id: 3, title: 'Data Scientist', company: 'DataCorp', location: 'San Francisco, CA', status: 'active', posted: '2023-12-08' },
  { id: 4, title: 'Customer Support Rep', company: 'Scammy LLC', location: 'Unknown', status: 'flagged', posted: '2023-12-13' },
  { id: 5, title: 'Product Manager', company: 'Global Corp', location: 'London, UK', status: 'closed', posted: '2023-11-25' },
];

export default function JobModerationPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Pending Review</Badge>;
      case 'flagged': return <Badge variant="destructive">Flagged</Badge>;
      case 'closed': return <Badge variant="secondary">Closed</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Job Moderation</h1>
            <p className="text-slate-500">Review, approve, and manage job postings.</p>
        </div>
        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
            <XCircle className="mr-2 h-4 w-4" /> Review Flagged Jobs
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">All Jobs</CardTitle>
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Search jobs..." 
                            className="pl-8" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Posted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell className="font-medium">
                                {job.title}
                            </TableCell>
                            <TableCell>
                                {job.company}
                            </TableCell>
                            <TableCell className="text-slate-500">
                                {job.location}
                            </TableCell>
                            <TableCell>
                                {getStatusBadge(job.status)}
                            </TableCell>
                            <TableCell className="text-slate-500">
                                {job.posted}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            <ExternalLink className="mr-2 h-4 w-4" /> View Job
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-green-600">
                                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-yellow-600">
                                            <XCircle className="mr-2 h-4 w-4" /> Reject
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
