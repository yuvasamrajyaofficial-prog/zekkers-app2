
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

interface ShortlistedCandidateFiltersProps {
  filters: {
      searchQuery: string;
      jobRole: string;
      assessmentStatus: string;
      interviewStatus: string;
      sortBy: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onReset: () => void;
  jobs: Job[];
}

export function ShortlistedCandidateFilters({
    filters,
    setFilters,
    onReset,
    jobs
}: ShortlistedCandidateFiltersProps) {

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({...prev, [key]: value}));
  }

  const activeFiltersCount = 
    (filters.searchQuery ? 1 : 0) + 
    (filters.jobRole !== 'all' ? 1 : 0) +
    (filters.assessmentStatus !== 'all' ? 1 : 0) +
    (filters.interviewStatus !== 'all' ? 1 : 0);

  return (
    <div className="p-4 mb-6 bg-slate-50 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, skills..."
            className="pl-10"
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
          />
        </div>

        <Select value={filters.jobRole} onValueChange={(v) => handleFilterChange('jobRole', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Job Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Job Roles</SelectItem>
            {jobs.map(job => (
                <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.assessmentStatus} onValueChange={(v) => handleFilterChange('assessmentStatus', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Assessment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assessment Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Passed">Passed</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filters.interviewStatus} onValueChange={(v) => handleFilterChange('interviewStatus', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Interview Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Interview Statuses</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Not Scheduled">Not Scheduled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.sortBy} onValueChange={(v) => handleFilterChange('sortBy', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="latest">Recently Shortlisted</SelectItem>
                <SelectItem value="match-score">Highest AI Match</SelectItem>
                <SelectItem value="exp-high-low">Experience (High to Low)</SelectItem>
                <SelectItem value="exp-low-high">Experience (Low to High)</SelectItem>
                <SelectItem value="alpha-az">Alphabetical (A-Z)</SelectItem>
            </SelectContent>
          </Select>

        {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={onReset} className="text-muted-foreground gap-2">
                <X className="w-4 h-4 mr-2" />
                Reset Filters ({activeFiltersCount})
            </Button>
        )}
      </div>
    </div>
  );
}
