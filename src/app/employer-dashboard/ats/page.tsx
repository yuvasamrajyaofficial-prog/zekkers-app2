'use client';
import React from 'react';
import { AtsBoard } from './_components/ats-board';
import { MOCK_ATS_CANDIDATES, MOCK_STAGES } from '@/types/ats';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Kanban } from 'lucide-react';

export default function EmployerAtsPage() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Kanban /> Applicant Tracking System
          </h1>
          <p className="text-muted-foreground mt-1">
            Drag and drop candidates through your hiring pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by job..."/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="fe-dev">Frontend Developer</SelectItem>
                    <SelectItem value="be-eng">Backend Engineer</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline">View Analytics</Button>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[1200px]">
           <AtsBoard candidates={MOCK_ATS_CANDIDATES} stages={MOCK_STAGES} />
        </div>
      </div>
    </div>
  );
}
