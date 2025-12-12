
'use client';
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CandidateFilters } from "./_components/candidate-filters";
import { CandidateCard } from "./_components/candidate-card";
import { CandidateProfileDrawer } from "./_components/candidate-profile-drawer";
import { Candidate } from "@/types/candidate";
import { Job } from "@/types/job";
import { MOCK_CANDIDATES } from "@/lib/mock-data/candidates";
import { MOCK_JOBS } from "@/lib/mock-data/jobs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, LayoutGrid, List } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};


export default function AllCandidatesPage(): JSX.Element {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    // Safe access to localStorage only on the client
    setCandidates(MOCK_CANDIDATES);
  }, []);

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter(c => {
        const searchLower = searchQuery.toLowerCase();
        const nameMatch = c.name.toLowerCase().includes(searchLower);
        const skillMatch = c.skills.some(s => s.toLowerCase().includes(searchLower));
        const jobMatch = c.jobAppliedFor.toLowerCase().includes(searchLower);
        
        const jobFilterMatch = jobFilter === 'all' || c.jobId === jobFilter;

        return (nameMatch || skillMatch || jobMatch) && jobFilterMatch;
    });

    if (sortBy === 'latest') {
        filtered.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
    } else if (sortBy === 'match-score') {
        filtered.sort((a, b) => (b.aiMatchScore ?? 0) - (a.aiMatchScore ?? 0));
    }
    
    return filtered;
  }, [candidates, searchQuery, jobFilter, sortBy]);


  const handleSelectCandidate = (id: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };
  
  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    setSelectedCandidates(checked === true ? filteredAndSortedCandidates.map((c) => c.id) : []);
  };

  const handleResetFilters = React.useCallback(() => {
      setSearchQuery('');
      setJobFilter('all');
      setSortBy('latest');
  }, []);

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Users />
                Candidates
              </CardTitle>
              <CardDescription className="mt-1">
                View, filter, and manage all applicants for your job posts.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2">
                <Download size={16} /> Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CandidateFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleReset={handleResetFilters}
            jobs={MOCK_JOBS as Job[]}
          />

          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={
                    selectedCandidates.length > 0 && selectedCandidates.length === filteredAndSortedCandidates.length
                      ? true
                      : selectedCandidates.length > 0
                      ? 'indeterminate'
                      : false
                  }
                  onCheckedChange={(checked) => handleSelectAll(checked)}
                />
                <Label htmlFor="select-all" className="text-sm font-medium">
                  {selectedCandidates.length > 0 ? `${selectedCandidates.length} selected` : `All Applicants (${filteredAndSortedCandidates.length})`}
                </Label>
              </div>
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
              <h3 className="mt-4 font-semibold text-lg">No Applicants Found</h3>
              <p className="text-sm text-slate-500 mt-1">
                Try adjusting your filters or post a new job to attract talent.
              </p>
            </div>
          ) : (
            <motion.div
              key={layout}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredAndSortedCandidates.map((candidate) => (
                <CandidateCard
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
