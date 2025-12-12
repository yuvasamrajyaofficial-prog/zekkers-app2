'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileEdit, Trash2, Calendar, Clock } from 'lucide-react';

const drafts = [
  {
    id: 'DRFT-001',
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    lastEdited: '2 hours ago',
    completion: 80,
  },
  {
    id: 'DRFT-002',
    title: 'Marketing Intern',
    location: 'New York, NY',
    type: 'Internship',
    lastEdited: '1 day ago',
    completion: 45,
  },
  {
    id: 'DRFT-003',
    title: 'Sales Executive',
    location: 'San Francisco, CA',
    type: 'Full-time',
    lastEdited: '3 days ago',
    completion: 95,
  },
];

export default function EmployerDraftsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Draft Jobs</h1>
            <p className="text-muted-foreground">Continue editing your saved job postings.</p>
        </div>
        <Button>
            <FileEdit className="mr-2 h-4 w-4" /> Create New Draft
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drafts.map((draft) => (
            <Card key={draft.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="mb-2">Draft</Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <CardTitle className="text-lg">{draft.title}</CardTitle>
                    <CardDescription>{draft.location} • {draft.type}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Last edited {draft.lastEdited}</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Completion</span>
                                <span>{draft.completion}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500" style={{ width: `${draft.completion}%` }}></div>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button className="w-full" variant="outline">
                                <FileEdit className="mr-2 h-4 w-4" /> Continue Editing
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
        
        {/* Empty State / Add New */}
        <Card className="border-dashed flex flex-col items-center justify-center p-6 hover:bg-slate-50 cursor-pointer transition-colors min-h-[250px]">
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <FileEdit className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Start a New Job</h3>
            <p className="text-sm text-muted-foreground text-center mt-1">Create a new job posting from scratch.</p>
        </Card>
      </div>
    </div>
  );
}
