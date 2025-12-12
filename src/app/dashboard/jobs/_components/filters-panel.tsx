'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { Job } from '@/types/job';

const jobTypes: Job['type'][] = ["onsite", "hybrid", "remote", "wfh", "internship"];
const experienceLevels = ["Fresher (0-1)", "1-3 years", "3-5 years", "5-10 years", "10+ years"];

export const FiltersPanel: React.FC<{ filters: any; onFilterChange: (filters: any) => void; onReset: () => void }> = ({ filters, onFilterChange, onReset }) => {
  const handleSalaryChange = (value: number[]) => {
    onFilterChange({ ...filters, salary: value });
  };
  
  const handleAiScoreChange = (value: number) => {
    onFilterChange({ ...filters, aiScore: value });
  }

  const handleCheckboxChange = (filterKey: string, value: string) => {
    const currentValues = filters[filterKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];
    onFilterChange({ ...filters, [filterKey]: newValues });
  };

  const activeFiltersCount = Object.values(filters).reduce((count: number, value: any) => {
      if (Array.isArray(value) && value.length > 0) return count + value.length;
      if (typeof value === 'string' && value) return count + 1;
      // Check for aiScore specifically
      if (typeof value === 'number' && value > 0) return count + 1;
      // Check for salary range
      if (Array.isArray(value) && (value[0] !== 0 || value[1] !== 5000000)) return count + 1;
      return count;
  }, 0);


  return (
    <div className="p-4 bg-white rounded-xl border mb-6 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {/* AI Score Filter */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2 whitespace-nowrap">
                        AI Score {filters.aiScore > 0 ? `> ${filters.aiScore}%` : ''}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">AI Match Score</h4>
                            <p className="text-sm text-muted-foreground">Show jobs with a match score above:</p>
                        </div>
                        <div className="grid gap-2">
                           <Slider
                                defaultValue={[filters.aiScore]}
                                max={100}
                                step={1}
                                onValueChange={(value) => handleAiScoreChange(value[0])}
                            />
                            <div className="text-center font-bold text-lg">{filters.aiScore}%</div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

             {/* Salary Filter */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="whitespace-nowrap">Salary (LPA)</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Salary Range</h4>
                            <p className="text-sm text-muted-foreground">Filter by annual salary.</p>
                        </div>
                        <Slider
                            defaultValue={filters.salary.map((s: number) => s / 100000)}
                            max={100}
                            step={1}
                            onValueChange={(value) => handleSalaryChange(value.map(v => v * 100000))}
                        />
                         <div className="text-center font-medium">
                           ₹{filters.salary[0]/100000}L - ₹{filters.salary[1]/100000}L+
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

             {/* Experience Filter */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="whitespace-nowrap">Experience</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="grid gap-2">
                        {experienceLevels.map(level => (
                             <Label key={level} className="flex items-center gap-2 font-normal p-2 hover:bg-slate-50 rounded-md">
                                <Checkbox
                                    checked={filters.experience.includes(level)}
                                    onCheckedChange={() => handleCheckboxChange('experience', level)}
                                />
                                {level}
                            </Label>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Job Type Filter */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="whitespace-nowrap">Job Type</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="grid gap-2">
                        {jobTypes.map(type => (
                             <Label key={type} className="flex items-center gap-2 font-normal p-2 hover:bg-slate-50 rounded-md">
                                <Checkbox
                                    checked={filters.jobTypes.includes(type)}
                                    onCheckedChange={() => handleCheckboxChange('jobTypes', type)}
                                />
                                <span className="capitalize">{type}</span>
                            </Label>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Location Filter */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="whitespace-nowrap">Location</Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                     <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Location</h4>
                            <p className="text-sm text-muted-foreground">Filter by city, state, or country.</p>
                        </div>
                        <Input 
                            placeholder="e.g., Bengaluru, California, USA" 
                            value={filters.location}
                            onChange={(e) => onFilterChange({...filters, location: e.target.value})}
                        />
                    </div>
                </PopoverContent>
            </Popover>
            
            {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={onReset} className="text-sm text-muted-foreground gap-2 whitespace-nowrap">
                    <X size={16} />
                    Clear Filters ({activeFiltersCount})
                </Button>
            )}
        </div>
    </div>
  );
};

export default FiltersPanel;
