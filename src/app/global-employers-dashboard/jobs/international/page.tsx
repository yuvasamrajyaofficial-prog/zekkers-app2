'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Globe, MapPin, Briefcase, Plane, Filter } from 'lucide-react';

const intlJobs = [
  {
    id: 'INT-001',
    title: 'Senior Software Engineer',
    location: 'London, UK',
    type: 'Full-time',
    applicants: 45,
    status: 'Active',
    posted: '2 days ago',
  },
  {
    id: 'INT-002',
    title: 'Regional Sales Director',
    location: 'Singapore',
    type: 'Full-time',
    applicants: 12,
    status: 'Active',
    posted: '5 days ago',
  },
  {
    id: 'INT-003',
    title: 'UX Researcher',
    location: 'Toronto, Canada',
    type: 'Contract',
    applicants: 28,
    status: 'Closing Soon',
    posted: '2 weeks ago',
  },
  {
    id: 'INT-004',
    title: 'Data Scientist',
    location: 'Berlin, Germany',
    type: 'Full-time',
    applicants: 8,
    status: 'Draft',
    posted: 'Just now',
  },
];

export default function InternationalJobsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">International Jobs</h1>
            <p className="text-muted-foreground">Manage your job postings across different countries.</p>
        </div>
        <Button>
            <Plane className="mr-2 h-4 w-4" /> Post New Job
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs..."
              className="pl-8 bg-white"
            />
        </div>
        <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter by Region
        </Button>
      </div>

      <div className="grid gap-4">
        {intlJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded bg-indigo-50 flex items-center justify-center text-indigo-500">
                                <Globe className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    {job.status === 'Draft' && <Badge variant="secondary">Draft</Badge>}
                                    {job.status === 'Closing Soon' && <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Closing Soon</Badge>}
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.type}</span>
                                    <span>Posted {job.posted}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                                <p className="text-2xl font-bold">{job.applicants}</p>
                                <p className="text-xs text-muted-foreground">Applicants</p>
                            </div>
                            <Button size="sm" variant="outline" className="mt-1">Manage</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
