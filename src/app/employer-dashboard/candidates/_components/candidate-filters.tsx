'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Job } from '@/types/job';

interface CandidateFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  jobFilter: string;
  setJobFilter: (jobId: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  handleReset: () => void;
  jobs: Job[];
}

export function CandidateFilters({
    searchQuery,
    setSearchQuery,
    jobFilter,
    setJobFilter,
    sortBy,
    setSortBy,
    handleReset,
    jobs
}: CandidateFiltersProps) {

  const activeFiltersCount = (searchQuery ? 1 : 0) + (jobFilter !== 'all' ? 1 : 0);

  return (
    <div className="p-4 mb-6 bg-slate-50 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, skills, job title..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Job Post" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {jobs.map(job => (
                <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="w-full justify-start gap-2" disabled>
            <SlidersHorizontal size={16} /> More Filters
        </Button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Applied</SelectItem>
              <SelectItem value="match-score">Highest AI Match</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={handleReset} className="text-muted-foreground">
                <X className="w-4 h-4 mr-2" />
                Reset Filters
            </Button>
        )}
      </div>
    </div>
  );
}
