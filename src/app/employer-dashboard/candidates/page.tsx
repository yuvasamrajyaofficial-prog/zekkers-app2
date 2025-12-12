
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
  Search,
  LayoutGrid,
  List,
  Sparkles,
  Download,
  Users,
  X,
} from 'lucide-react';
import { CandidateCard } from './_components/candidate-card';
import { CandidateFilters } from './_components/candidate-filters';
import { CandidateProfileDrawer } from './_components/candidate-profile-drawer';
import { AICandidateFinder } from './_components/ai-candidate-finder';
import type { Candidate } from '@/types/candidate';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Job } from '@/types/job';

// Mock Data
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Anjali Sharma',
    email: 'anjali.sharma@example.com',
    location: 'Bengaluru, India',
    experienceYears: 2,
    jobId: 'priv-1',
    jobAppliedFor: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Figma'],
    missingSkills: ['GraphQL'],
    profileStrength: 88,
    aiMatchScore: 92,
    resumeURL: '#',
    status: 'Screening',
    appliedAt: '2024-07-28T10:00:00Z',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl,
    education: 'B.Tech in Computer Science',
  },
  {
    id: 'cand-2',
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    location: 'Pune, India',
    experienceYears: 5,
    jobId: 'priv-2',
    jobAppliedFor: 'Senior Backend Engineer',
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
    missingSkills: ['Go'],
    profileStrength: 95,
    aiMatchScore: 89,
    resumeURL: '#',
    status: 'Interview',
    appliedAt: '2024-07-25T09:00:00Z',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl,
    education: 'M.Tech in Computer Science',
  },
  {
    id: 'cand-3',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    location: 'Remote',
    experienceYears: 1,
    jobId: 'priv-1',
    jobAppliedFor: 'UX/UI Designer',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    missingSkills: ['Webflow'],
    profileStrength: 75,
    aiMatchScore: 81,
    resumeURL: '#',
    status: 'Applied',
    appliedAt: '2024-07-29T14:00:00Z',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar3')?.imageUrl,
    education: 'B.Des in Communication Design',
  },
];

const MOCK_JOBS: Job[] = [
    { id: 'priv-1', title: 'Frontend Developer', company: 'ZekkTech', type: 'hybrid', location: 'Bengaluru', status: 'published', category: 'private' },
    { id: 'priv-2', title: 'Senior Backend Engineer', company: 'ZekkTech', type: 'remote', location: 'Pune', status: 'published', category: 'private' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function CandidatesPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(
    null
  );
  const [isAiFinderOpen, setIsAiFinderOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const filteredAndSortedCandidates = useMemo(() => {
    let candidates = MOCK_CANDIDATES.filter(c => {
        const searchLower = searchQuery.toLowerCase();
        const nameMatch = c.name.toLowerCase().includes(searchLower);
        const skillMatch = c.skills.some(s => s.toLowerCase().includes(searchLower));
        const jobMatch = c.jobAppliedFor.toLowerCase().includes(searchLower);
        
        const jobFilterMatch = jobFilter === 'all' || c.jobId === jobFilter;

        return (nameMatch || skillMatch || jobMatch) && jobFilterMatch;
    });

    if (sortBy === 'latest') {
        candidates.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
    } else if (sortBy === 'match-score') {
        candidates.sort((a, b) => b.aiMatchScore - a.aiMatchScore);
    }
    
    return candidates;
  }, [searchQuery, jobFilter, sortBy]);

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedCandidates(filteredAndSortedCandidates.map((c) => c.id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleResetFilters = useCallback(() => {
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
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setIsAiFinderOpen(true)}
              >
                <Sparkles size={16} /> AI Candidate Finder
              </Button>
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
            jobs={MOCK_JOBS}
          />

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              All Applicants ({filteredAndSortedCandidates.length})
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
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {selectedCandidates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 mb-6 bg-primary/10 border border-primary/20 rounded-lg flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={
                    selectedCandidates.length === filteredAndSortedCandidates.length
                      ? true
                      : selectedCandidates.length > 0
                      ? 'indeterminate'
                      : false
                  }
                  onCheckedChange={(checked) => handleSelectAll(checked)}
                />
                <Label>{selectedCandidates.length} selected</Label>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Move to Screening
                </Button>
                <Button size="sm" variant="destructive">
                  Reject Selected
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedCandidates([])}
                >
                  <X className="w-4 h-4 mr-1" /> Clear
                </Button>
              </div>
            </motion.div>
          )}

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
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
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

      <AICandidateFinder
        isOpen={isAiFinderOpen}
        onClose={() => setIsAiFinderOpen(false)}
      />
    </div>
  );
}
