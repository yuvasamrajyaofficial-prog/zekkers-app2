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
  Globe,
  PlusCircle,
  Users,
  BarChart,
  BookCopy,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { GlobalCandidateCard, GlobalCandidate } from './_components/global-candidate-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// --- Mock Data & Types ---
const mockGlobalCandidates: GlobalCandidate[] = [
  {
    id: 'gc-1',
    name: 'Kenji Tanaka',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar1')?.imageUrl || '',
    country: 'Japan',
    region: 'Asia',
    role: 'Software Engineer',
    skills: ['Go', 'Kubernetes', 'AWS'],
    experience: 5,
    visaStatus: 'Visa-Ready',
    englishProficiency: 'Fluent',
    aiMatch: 91,
  },
  {
    id: 'gc-2',
    name: 'Maria Schmidt',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar2')?.imageUrl || '',
    country: 'Germany',
    region: 'Europe',
    role: 'Product Manager',
    skills: ['Agile', 'Roadmapping', 'JIRA'],
    experience: 8,
    visaStatus: 'Work Permit',
    englishProficiency: 'Fluent',
    aiMatch: 88,
  },
  {
    id: 'gc-3',
    name: 'Ahmed Al-Farsi',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar3')?.imageUrl || '',
    country: 'UAE',
    region: 'Middle East',
    role: 'Civil Engineer',
    skills: ['AutoCAD', 'Project Management'],
    experience: 10,
    visaStatus: 'Needs Sponsorship',
    englishProficiency: 'Conversational',
    aiMatch: 82,
  },
  {
    id: 'gc-4',
    name: 'Sofia Rossi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80',
    country: 'USA',
    region: 'North America',
    role: 'Marketing Lead',
    skills: ['SEO', 'Content Strategy', 'Google Analytics'],
    experience: 6,
    visaStatus: 'Work Permit',
    englishProficiency: 'Native',
    aiMatch: 94,
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};


export default function EmployerGlobalHiringPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCandidates, setFilteredCandidates] = useState(mockGlobalCandidates);
  
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would trigger a backend search. Here we just filter mock data.
        const lowerQuery = searchQuery.toLowerCase();
        const results = mockGlobalCandidates.filter(c => 
            c.name.toLowerCase().includes(lowerQuery) ||
            c.role.toLowerCase().includes(lowerQuery) ||
            c.country.toLowerCase().includes(lowerQuery) ||
            c.skills.some(s => s.toLowerCase().includes(lowerQuery))
        );
        setFilteredCandidates(results);
    };

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Globe className="text-primary" />
                Global Hiring
              </CardTitle>
              <CardDescription className="mt-1">
                Discover, evaluate, and hire verified international talent.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2">
                <BookCopy size={16} /> Country Regulations
              </Button>
              <Button variant="outline" className="gap-2">
                <BarChart size={16} /> Global Insights
              </Button>
              <Button className="gap-2">
                <PlusCircle size={16} /> Post Global Job
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Global Talent Explorer */}
          <div className="p-4 mb-6 bg-slate-50 rounded-lg border">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search skills, roles, or names across 54+ countries..."
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                    Search Talent
                </Button>
                 <Button type="button" variant="ghost" className="text-muted-foreground gap-2 w-full md:w-auto">
                    <SlidersHorizontal size={16} />
                    Advanced Filters
                </Button>
              </div>
            </form>
          </div>

          {/* Results Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Top Matches ({filteredCandidates.length} found)
            </h3>
            {filteredCandidates.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <Users className="w-12 h-12 mx-auto text-slate-400" />
                <h3 className="mt-4 font-semibold text-lg">No Talent Found</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Try adjusting your search criteria to find global talent.
                </p>
              </div>
            ) : (
                <motion.div
                    key={searchQuery} // Re-trigger animation on new search
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                    {filteredCandidates.map(candidate => (
                        <GlobalCandidateCard key={candidate.id} candidate={candidate} />
                    ))}
                </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
