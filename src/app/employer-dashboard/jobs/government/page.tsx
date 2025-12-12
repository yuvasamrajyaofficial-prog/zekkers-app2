'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Building2, MapPin, Briefcase, Globe } from 'lucide-react';

const govJobs = [
  {
    id: 'GOV-001',
    title: 'Senior Systems Analyst',
    department: 'Department of Technology',
    location: 'Washington, D.C.',
    type: 'Full-time',
    salary: '$95,000 - $120,000',
    posted: '2 days ago',
  },
  {
    id: 'GOV-002',
    title: 'Public Health Specialist',
    department: 'Ministry of Health',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$70,000 - $85,000',
    posted: '5 days ago',
  },
  {
    id: 'GOV-003',
    title: 'Civil Engineer',
    department: 'Department of Transportation',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$80,000 - $100,000',
    posted: '1 week ago',
  },
];

export default function EmployerGovernmentJobsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Government Opportunities</h1>
            <p className="text-muted-foreground">Browse and post government-related job opportunities.</p>
        </div>
        <Button>
            <Briefcase className="mr-2 h-4 w-4" /> Post Government Job
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search government jobs..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <div className="grid gap-4">
        {govJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <p className="text-muted-foreground">{job.department}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.type}</span>
                                    <span>{job.salary}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Badge variant="secondary">{job.posted}</Badge>
                            <Button size="sm" variant="outline">View Details</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
