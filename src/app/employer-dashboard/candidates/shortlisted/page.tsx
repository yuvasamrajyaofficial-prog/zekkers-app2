'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  LayoutGrid,
  List,
  UserCheck,
  Download,
} from 'lucide-react';
import { ShortlistedCandidateCard } from './_components/shortlisted-candidate-card';
import { ShortlistedCandidateFilters } from './_components/shortlisted-candidate-filters';
import { CandidateProfileDrawer } from '../../candidates/_components/candidate-profile-drawer';
import { Job } from '@/types/job';
import { MOCK_JOBS } from '@/lib/mock-data/jobs';
import { Candidate } from '@/types/candidate';
import { MOCK_CANDIDATES } from '@/lib/mock-data/candidates';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';


// Mock Data
const MOCK_SHORTLISTED_CANDIDATES: Candidate[] = MOCK_CANDIDATES.filter(c => c.status === 'Screening' || c.status === 'Interview').map(c => ({...c, assessmentStatus: 'Passed', assessmentScore: 85, interviewStatus: 'Scheduled' }));


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function ShortlistedCandidatesPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(
    null
  );

  const initialFilters = {
    searchQuery: '',
    jobRole: 'all',
    assessmentStatus: 'all',
    interviewStatus: 'all',
    sortBy: 'latest',
  };
  const [filters, setFilters] = useState(initialFilters);

  const filteredAndSortedCandidates = useMemo(() => {
    let candidates = MOCK_SHORTLISTED_CANDIDATES.filter(c => {
        const searchLower = filters.searchQuery.toLowerCase();
        const nameMatch = c.name.toLowerCase().includes(searchLower);
        const skillMatch = c.skills.some(s => s.toLowerCase().includes(searchLower));
        const jobMatch = c.jobAppliedFor.toLowerCase().includes(searchLower);
        
        const jobFilterMatch = filters.jobRole === 'all' || c.jobId === filters.jobRole;
        const assessmentMatch = filters.assessmentStatus === 'all' || c.assessmentStatus === filters.assessmentStatus;
        const interviewMatch = filters.interviewStatus === 'all' || c.interviewStatus === filters.interviewStatus;

        return (nameMatch || skillMatch || jobMatch) && jobFilterMatch && assessmentMatch && interviewMatch;
    });

    switch(filters.sortBy) {
        case 'latest':
             candidates.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
             break;
        case 'match-score':
             candidates.sort((a, b) => (b.aiMatchScore ?? 0) - (a.aiMatchScore ?? 0));
             break;
        case 'exp-high-low':
            candidates.sort((a,b) => b.experienceYears - a.experienceYears);
            break;
    }
    
    return candidates;
  }, [filters]);

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    setSelectedCandidates(checked === true ? filteredAndSortedCandidates.map((c) => c.id) : []);
  };

  const handleResetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <UserCheck />
                Shortlisted Candidates
              </CardTitle>
              <CardDescription className="mt-1">
                Review, evaluate, and progress your top candidates.
              </CardDescription>
            </div>
            <Button className="gap-2">
              <Download size={16} /> Export View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ShortlistedCandidateFilters 
            filters={filters}
            setFilters={setFilters}
            onReset={handleResetFilters}
            jobs={MOCK_JOBS}
          />

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {filteredAndSortedCandidates.length} Candidates
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant={layout === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setLayout('grid')}
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button
                variant={layout === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setLayout('list')}
                disabled
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {filteredAndSortedCandidates.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
              <Users className="w-12 h-12 mx-auto text-slate-400" />
              <h3 className="mt-4 font-semibold text-lg">No Shortlisted Candidates</h3>
              <p className="text-sm text-slate-500 mt-1">
                No candidates match your current filter criteria.
              </p>
            </div>
          ) : (
            <motion.div
              key={layout}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredAndSortedCandidates.map((candidate) => (
                <ShortlistedCandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedCandidates.includes(candidate.id)}
                  onSelect={handleSelectCandidate}
                  onViewProfile={() => setViewingCandidate(candidate)}
                />
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      <CandidateProfileDrawer
        candidate={viewingCandidate}
        onClose={() => setViewingCandidate(null)}
      />
    </div>
  );
}
