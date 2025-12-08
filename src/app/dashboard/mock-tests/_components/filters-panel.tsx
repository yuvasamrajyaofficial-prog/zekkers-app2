'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface FiltersPanelProps {
  filters: { category: string; year: string; language: string; };
  searchQuery: string;
  onFilterChange: (filters: { category: string; year: string; language: string; }) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
  uniqueYears: number[];
  uniqueLanguages: string[];
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ 
    filters, 
    searchQuery,
    onFilterChange,
    onSearchChange,
    onReset,
    uniqueYears,
    uniqueLanguages
}) => {
  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    (filters.year !== 'all' ? 1 : 0) +
    (filters.language !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="mb-6 space-y-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
                placeholder="Search for an exam..."
                className="pl-10 h-11 text-base"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
        <div className="flex flex-wrap gap-3 items-center">
            <Select 
                value={filters.category} 
                onValueChange={(value) => onFilterChange({ ...filters, category: value })}
            >
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Banking">Banking</SelectItem>
                    <SelectItem value="Campus & Private">Campus & Private</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                    <SelectItem value="Aptitude">Aptitude</SelectItem>
                </SelectContent>
            </Select>

            <Select 
                value={filters.year}
                onValueChange={(value) => onFilterChange({ ...filters, year: value })}
            >
                <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {uniqueYears.map(year => (
                        <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

             <Select 
                value={filters.language}
                onValueChange={(value) => onFilterChange({ ...filters, language: value })}
            >
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {uniqueLanguages.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {activeFiltersCount > 0 && (
                <button onClick={onReset} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <X size={14} /> Clear
                </button>
            )}
        </div>
    </div>
  );
};
