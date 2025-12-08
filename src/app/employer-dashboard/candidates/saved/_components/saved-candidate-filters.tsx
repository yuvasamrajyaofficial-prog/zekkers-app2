
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
import { Search, X } from 'lucide-react';

interface SavedCandidateFiltersProps {
  filters: {
    searchQuery: string;
    experience: string;
    location: string;
    source: string;
    sortBy: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onReset: () => void;
}

export function SavedCandidateFilters({
  filters,
  setFilters,
  onReset,
}: SavedCandidateFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const activeFiltersCount =
    (filters.searchQuery ? 1 : 0) +
    (filters.experience !== 'all' ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.source !== 'all' ? 1 : 0);

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

        <Select
          value={filters.experience}
          onValueChange={(v) => handleFilterChange('experience', v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Experience Levels</SelectItem>
            <SelectItem value="0-1">0-1 year (Fresher)</SelectItem>
            <SelectItem value="1-3">1-3 years</SelectItem>
            <SelectItem value="3-6">3-6 years</SelectItem>
            <SelectItem value="6+">6+ years</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.source}
          onValueChange={(v) => handleFilterChange('source', v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Candidate Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="zekkers">Zekkers</SelectItem>
            <SelectItem value="campus">Campus</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="global">Global</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium">Sort by:</span>
          <Select
            value={filters.sortBy}
            onValueChange={(v) => handleFilterChange('sortBy', v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saved-desc">Most Recently Saved</SelectItem>
              <SelectItem value="match-score">Highest AI Match</SelectItem>
              <SelectItem value="exp-high-low">Experience (High to Low)</SelectItem>
              <SelectItem value="exp-low-high">Experience (Low to High)</SelectItem>
              <SelectItem value="alpha-az">Alphabetical (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={onReset} className="text-muted-foreground">
            <X className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
