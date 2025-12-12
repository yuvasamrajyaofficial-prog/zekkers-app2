'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Globe, MapPin, Briefcase, Plane } from 'lucide-react';

const intlJobs = [
  {
    id: 'INT-001',
    title: 'Software Engineer',
    company: 'TechGlobal GmbH',
    location: 'Berlin, Germany',
    type: 'Full-time',
    visa: 'Visa Sponsorship Available',
    posted: '1 day ago',
  },
  {
    id: 'INT-002',
    title: 'Marketing Manager',
    company: 'Asia Pacific Corp',
    location: 'Singapore',
    type: 'Full-time',
    visa: 'Local Candidates Only',
    posted: '3 days ago',
  },
  {
    id: 'INT-003',
    title: 'Product Designer',
    company: 'Nordic Design AB',
    location: 'Stockholm, Sweden',
    type: 'Contract',
    visa: 'Visa Sponsorship Available',
    posted: '1 week ago',
  },
];

export default function EmployerInternationalJobsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">International Jobs</h1>
            <p className="text-muted-foreground">Explore and post job opportunities worldwide.</p>
        </div>
        <Button>
            <Plane className="mr-2 h-4 w-4" /> Post International Job
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search international jobs..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <div className="grid gap-4">
        {intlJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded bg-blue-50 flex items-center justify-center text-blue-500">
                                <Globe className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <p className="text-muted-foreground">{job.company}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <Badge variant={job.visa.includes('Sponsorship') ? 'default' : 'secondary'} className={job.visa.includes('Sponsorship') ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                {job.visa}
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
