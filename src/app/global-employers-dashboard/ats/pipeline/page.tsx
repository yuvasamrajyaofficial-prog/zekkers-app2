
'use client';
import React, { useState, useMemo } from 'react';
import { AtsBoard } from '@/app/global-employers-dashboard/ats/_components/ats-board';
import { MOCK_ATS_CANDIDATES, MOCK_STAGES, AtsCandidate } from '@/types/ats';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Kanban } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Job } from '@/types/job';
import { MOCK_JOBS } from '@/lib/mock-data/jobs';

export default function ATSPipeline(){
  const [jobFilter, setJobFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredCandidates = useMemo(() => {
    let candidates = MOCK_ATS_CANDIDATES;

    if (jobFilter !== 'all') {
      candidates = candidates.filter(c => c.jobId === jobFilter);
    }

    if (activeTab === 'visa-ready') {
      candidates = candidates.filter(c => c.visaStatus === 'Visa-Ready');
    }
    
    // Add more tab filters as needed

    return candidates;
  }, [jobFilter, activeTab]);

  return (
    <div className="p-4 md:p-6 flex flex-col h-full">
      <div className="flex-shrink-0">
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
              <Select defaultValue="all" onValueChange={setJobFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Filter by job..."/>
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="all">All Jobs</SelectItem>
                      {MOCK_JOBS.map(job => (
                         <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
              <Button variant="outline">View Analytics</Button>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="mt-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="visa-ready">Visa-Ready</TabsTrigger>
            <TabsTrigger value="assessment-passed">Assessment Passed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 mt-6 overflow-x-auto">
        <div className="min-w-[1200px] pb-4">
           <AtsBoard candidates={filteredCandidates} stages={MOCK_STAGES} />
        </div>
      </div>
    </div>
  )
}
