'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Building2, MapPin, Briefcase, Filter } from 'lucide-react';

const govJobs = [
  {
    id: 'GOV-001',
    title: 'IT Consultant',
    department: 'Ministry of Education',
    location: 'New Delhi, India',
    type: 'Contract',
    budget: '$45,000 - $60,000',
    posted: '3 days ago',
    status: 'Open',
  },
  {
    id: 'GOV-002',
    title: 'Cybersecurity Analyst',
    department: 'Department of Defense',
    location: 'Canberra, Australia',
    type: 'Full-time',
    budget: '$90,000 - $110,000',
    posted: '1 week ago',
    status: 'Reviewing',
  },
  {
    id: 'GOV-003',
    title: 'Project Manager',
    department: 'Health Service Executive',
    location: 'Dublin, Ireland',
    type: 'Full-time',
    budget: '€65,000 - €80,000',
    posted: '2 weeks ago',
    status: 'Closed',
  },
];

export default function GovernmentJobsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Government Contracts</h1>
            <p className="text-muted-foreground">Bid for and manage government projects and job postings.</p>
        </div>
        <Button>
            <Briefcase className="mr-2 h-4 w-4" /> New Proposal
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contracts..."
              className="pl-8 bg-white"
            />
        </div>
        <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter by Agency
        </Button>
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
                                    <span>{job.budget}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Badge variant={job.status === 'Open' ? 'default' : 'secondary'} className={job.status === 'Open' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                {job.status}
                            </Badge>
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
