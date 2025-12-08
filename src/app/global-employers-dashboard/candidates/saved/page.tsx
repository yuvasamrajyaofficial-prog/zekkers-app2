
'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
  Save,
  Users,
  CheckCircle,
  TrendingUp,
  Globe,
  Download,
} from 'lucide-react';
import { Candidate } from '@/types/candidate';
import { MOCK_CANDIDATES } from '@/lib/mock-data/candidates';
import { SavedCandidateCard } from './_components/saved-candidate-card';
import { SavedCandidateFilters } from './_components/saved-candidate-filters';
import { CandidateProfileDrawer } from '../_components/candidate-profile-drawer';

// --- Mock Data Enhancements ---
const MOCK_SAVED_CANDIDATES: Candidate[] = MOCK_CANDIDATES.slice(0, 8).map((c, i) => ({
    ...c,
    status: 'Sourced',
    savedBy: i % 2 === 0 ? 'Priya Sharma' : 'You',
    savedAt: new Date(Date.now() - i * 3 * 24 * 3600 * 1000).toISOString(),
    source: i % 3 === 0 ? 'AI Finder' : (i % 3 === 1 ? 'Job Applicants' : 'Talent Pool') as any,
}));


// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const KpiCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    </motion.div>
);


// --- Main Component ---
export default function SavedCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
  const [filters, setFilters] = useState({
    searchQuery: '',
    experience: 'all',
    location: '',
    source: 'all',
    sortBy: 'saved-desc',
  });

  useEffect(() => {
    // Safe access to localStorage only on the client
    setCandidates(MOCK_SAVED_CANDIDATES);
  }, []);

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter(c => {
        const searchMatch = c.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(filters.searchQuery.toLowerCase()));
        
        const expMap: {[key: string]: [number, number]} = {
            '0-1': [0, 1], '1-3': [1,3], '3-6': [3,6], '6+': [6, 100]
        };
        const expRange = expMap[filters.experience];
        const expMatch = filters.experience === 'all' || (expRange && c.experienceYears >= expRange[0] && c.experienceYears <= expRange[1]);

        return searchMatch && expMatch;
    });

    switch(filters.sortBy){
        case 'saved-desc': filtered.sort((a, b) => new Date(b.savedAt || 0).getTime() - new Date(a.savedAt || 0).getTime()); break;
        case 'match-score': filtered.sort((a,b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0)); break;
        // more sorts...
    }

    return filtered;
  }, [candidates, filters]);

  const handleReset = useCallback(() => {
    setFilters({ searchQuery: '', experience: 'all', location: '', source: 'all', sortBy: 'saved-desc' });
  }, []);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3"><Save className="text-primary"/> Saved Candidates</CardTitle>
              <CardDescription>Your private talent pool. Review, organize, and engage with top prospects.</CardDescription>
            </div>
            <Button><Download size={16} className="mr-2"/> Export All</Button>
          </div>
        </CardHeader>
        <CardContent>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KpiCard title="Total Saved" value={candidates.length} icon={<Users/>}/>
                <KpiCard title="High-Fit (>85%)" value={candidates.filter(c => (c.aiMatchScore ?? 0) > 85).length} icon={<TrendingUp/>}/>
                <KpiCard title="Verified Profiles" value={candidates.filter(c => c.visaStatus === 'Visa-Ready').length} icon={<CheckCircle/>}/>
                <KpiCard title="Global Talent" value={candidates.filter(c => c.location !== 'India').length} icon={<Globe/>}/>
            </motion.div>

            <SavedCandidateFilters filters={filters} setFilters={setFilters} onReset={handleReset}/>

            {filteredAndSortedCandidates.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                    <Users className="w-12 h-12 mx-auto text-slate-400" />
                    <h3 className="mt-4 font-semibold text-lg">No Saved Candidates</h3>
                    <p className="text-sm text-slate-500 mt-1">Your saved talent pool is empty.</p>
                </div>
            ) : (
                 <motion.div
                    key={filters.sortBy + filters.searchQuery} // Re-trigger animation on filter change
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                    {filteredAndSortedCandidates.map(c => (
                        <SavedCandidateCard key={c.id} candidate={c} onViewProfile={() => setViewingCandidate(c)} />
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
