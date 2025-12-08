'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sparkles,
  Search,
  Save,
  Download,
  Users,
  SlidersHorizontal,
} from 'lucide-react';
import { Candidate } from '@/types/candidate';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AICandidateCard from './_components/ai-candidate-card';
import { CandidateProfileDrawer } from '../_components/candidate-profile-drawer';

// --- Mock Data ---
const MOCK_AI_RESULTS: Candidate[] = [
  {
    id: 'cand-ai-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    location: 'Mumbai, India',
    experienceYears: 4,
    jobId: 'priv-3',
    jobAppliedFor: 'Senior Frontend Engineer',
    skills: ['React', 'TypeScript', 'GraphQL', 'Next.js', 'Redux'],
    missingSkills: ['Jest'],
    profileStrength: 92,
    aiMatchScore: 95,
    resumeURL: '#',
    status: 'Sourced',
    appliedAt: '2024-07-20T10:00:00Z',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar1')?.imageUrl,
    education: 'B.E. in Computer Engineering',
  },
  {
    id: 'cand-ai-2',
    name: 'Arjun Verma',
    email: 'arjun.verma@example.com',
    location: 'Remote',
    experienceYears: 7,
    jobId: 'priv-4',
    jobAppliedFor: 'Principal Backend Engineer',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'AWS'],
    missingSkills: [],
    profileStrength: 98,
    aiMatchScore: 91,
    resumeURL: '#',
    status: 'Sourced',
    appliedAt: '2024-06-15T09:00:00Z',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar2')?.imageUrl,
    education: 'M.Tech in Software Systems',
  },
  {
    id: 'cand-ai-3',
    name: 'Sunita Kumar',
    email: 'sunita.k@example.com',
    location: 'Bengaluru, India',
    experienceYears: 3,
    jobId: 'priv-1',
    jobAppliedFor: 'Frontend Developer',
    skills: ['React', 'JavaScript', 'Redux', 'CSS'],
    missingSkills: ['TypeScript', 'Next.js'],
    profileStrength: 78,
    aiMatchScore: 84,
    resumeURL: '#',
    status: 'Sourced',
    appliedAt: '2024-07-27T11:00:00Z',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar3')?.imageUrl,
    education: 'B.E. in Information Technology',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function AICandidateFinderPage() {
  const [searchQuery, setSearchQuery] = useState(
    'Find me candidates with 3+ years experience in React + Node.js, based in Bangalore.'
  );
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Candidate[]>([]);
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState('ai-fit');

  const handleSearch = () => {
    setLoading(true);
    setResults([]);
    // Simulate AI search
    setTimeout(() => {
      setResults(MOCK_AI_RESULTS);
      setLoading(false);
    }, 1500);
  };
  
  const sortedResults = useMemo(() => {
    const sorted = [...results];
    switch (sortBy) {
        case 'ai-fit':
            sorted.sort((a,b) => b.aiMatchScore - a.aiMatchScore);
            break;
        case 'experience':
            sorted.sort((a,b) => b.experienceYears - a.experienceYears);
            break;
        case 'recent':
             sorted.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
            break;
    }
    return sorted;
  }, [results, sortBy]);


  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Sparkles className="text-primary" />
                AI Candidate Finder
              </CardTitle>
              <CardDescription className="mt-1">
                Use natural language to discover the best talent from the Zekkers
                pool.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2">
                <Save size={16} /> Save Search
              </Button>
              <Button variant="outline" className="gap-2">
                <Download size={16} /> Export Results
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 mb-6 bg-slate-50 rounded-lg border">
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-primary h-5 w-5" />
              <Input
                placeholder="e.g., Find me candidates with 3+ years experience in React + Node.js..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
             <motion.div
              initial={false}
              animate={{ height: showAdvanced ? 'auto' : 0, opacity: showAdvanced ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                <Input placeholder="Role / Job Title" />
                <Input placeholder="Skills (comma-separated)" />
                <Input placeholder="Experience (e.g., 3-5 years)" />
                <Input placeholder="Location" />
              </div>
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button onClick={handleSearch} disabled={loading} size="lg" className="w-full sm:w-auto">
                <Search size={16} className="mr-2" />
                {loading ? 'Searching...' : 'Find Candidates'}
              </Button>
              <Button variant="ghost" onClick={() => setShowAdvanced(!showAdvanced)} className="w-full sm:w-auto">
                <SlidersHorizontal size={16} className="mr-2" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
              </Button>
            </div>
          </div>

          {loading && (
            <div className="text-center py-16">
              <Sparkles className="w-12 h-12 mx-auto text-primary animate-pulse" />
              <p className="mt-4 font-semibold text-lg">
                AI is searching for matches...
              </p>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
              <Users className="w-12 h-12 mx-auto text-slate-400" />
              <h3 className="mt-4 font-semibold text-lg">
                Describe Your Ideal Candidate
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Use the search bar above to start discovering talent.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="font-semibold">
                  Found {results.length} recommended candidates
                </h3>
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ai-fit">AI Fit Score</SelectItem>
                            <SelectItem value="experience">Experience</SelectItem>
                            <SelectItem value="recent">Recently Active</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
              </div>
              <motion.div
                key="results-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {sortedResults.map((candidate) => (
                  <AICandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onViewProfile={() => setViewingCandidate(candidate)}
                  />
                ))}
              </motion.div>
            </>
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
