
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
  Youtube,
  Search,
  PlayCircle,
  Clock,
  BookOpen,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// --- Types ---
type Tutorial = {
  id: string;
  title: string;
  description: string;
  category: 'Getting Started' | 'Hiring Workflow' | 'Advanced Features';
  duration: number; // in minutes
  thumbnail: string;
};

// --- Mock Data ---
const mockTutorials: Tutorial[] = [
  { id: 'tut-1', title: 'Posting Your First Global Job', description: 'A step-by-step guide to creating and publishing a job for an international audience.', category: 'Getting Started', duration: 5, thumbnail: 'https://picsum.photos/seed/hiring/400/225' },
  { id: 'tut-2', title: 'Using the AI Candidate Finder', description: 'Leverage AI to search for the best talent across the globe based on your needs.', category: 'Hiring Workflow', duration: 8, thumbnail: 'https://picsum.photos/seed/talent/400/225' },
  { id: 'tut-3', title: 'Managing the ATS Pipeline', description: 'Learn how to effectively move candidates through your hiring stages.', category: 'Hiring Workflow', duration: 10, thumbnail: 'https://picsum.photos/seed/pipeline/400/225' },
  { id: 'tut-4', title: 'Configuring an Assessment Test', description: 'Set up technical or aptitude tests for your shortlisted candidates.', category: 'Hiring Workflow', duration: 7, thumbnail: 'https://picsum.photos/seed/assessment/400/225' },
  { id: 'tut-5', title: 'Understanding Global Salary Benchmarking', description: 'Make competitive offers by analyzing salary data across different countries.', category: 'Advanced Features', duration: 12, thumbnail: 'https://picsum.photos/seed/salary/400/225' },
  { id: 'tut-6', title: 'Setting Up SSO Integration', description: 'Connect your identity provider for seamless team login.', category: 'Advanced Features', duration: 6, thumbnail: 'https://picsum.photos/seed/sso/400/225' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative aspect-video">
                <Image src={tutorial.thumbnail} alt={tutorial.title} layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="gap-1.5"><Clock size={12}/>{tutorial.duration} min</Badge>
                </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <PlayCircle className="w-12 h-12 text-white/70 hover:text-white transition-colors"/>
                </div>
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" size="sm" className="w-full">Watch Now</Button>
            </CardContent>
        </Card>
    </motion.div>
);


export default function TutorialsPage() {
    const [search, setSearch] = useState('');

    const categories = useMemo(() => {
        const filtered = mockTutorials.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));
        
        const uniqueCategories = Array.from(new Set(filtered.map(t => t.category)));

        return uniqueCategories.map(cat => ({
            name: cat,
            tutorials: filtered.filter(t => t.category === cat)
        }));
    }, [search]);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <Youtube className="text-primary" /> Tutorials & Guides
          </CardTitle>
          <CardDescription>
            Master the Zekkers platform with our video guides and walkthroughs.
          </CardDescription>
           <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search tutorials..."
              className="pl-10 h-11 text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
            {categories.length > 0 ? (
                <div className="space-y-8">
                    {categories.map((category) => (
                        <section key={category.name}>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                {category.name}
                            </h2>
                            <motion.div
                                key={category.name}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {category.tutorials.map(tutorial => (
                                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                                ))}
                            </motion.div>
                        </section>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                    <h3 className="font-semibold text-lg">No Tutorials Found</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        No tutorials match your search query. Try another term.
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
