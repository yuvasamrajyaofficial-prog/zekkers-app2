'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Trophy,
  Code,
  Brain,
  Shield,
  Languages,
  Users,
  BarChart,
  Flame,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const competitionCategories = [
  { name: 'Coding', icon: <Code className="w-6 h-6" /> },
  { name: 'Aptitude', icon: <Brain className="w-6 h-6" /> },
  { name: 'Govt. Exams', icon: <Shield className="w-6 h-6" /> },
  { name: 'Languages', icon: <Languages className="w-6 h-6" /> },
];

const activeCompetitions = [
  {
    title: 'Frontend Development Sprint',
    difficulty: 'Intermediate',
    prize: '₹10,000 + Certificate',
    timeRemaining: '2d 4h',
    slotsLeft: 50,
    type: 'Coding',
  },
  {
    title: 'SQL Challenge Day',
    difficulty: 'Beginner',
    prize: 'Certificate of Excellence',
    timeRemaining: '1d 8h',
    slotsLeft: 120,
    type: 'Coding',
  },
  {
    title: 'Aptitude & Reasoning Champion',
    difficulty: 'Medium',
    prize: 'Zekkers Pro Subscription',
    timeRemaining: '5h 30m',
    slotsLeft: 25,
    type: 'Aptitude',
  },
   {
    title: 'SSC CGL Mock Exam',
    difficulty: 'Hard',
    prize: 'Performance Analytics Report',
    timeRemaining: '3d',
    slotsLeft: 250,
    type: 'Govt. Exams',
  },
];

const leaderboardData = [
  { rank: 1, name: 'Anjali Sharma', score: 9850, avatar: PlaceHolderImages.find(p => p.id === 'avatar1')!.imageUrl, country: 'IN' },
  { rank: 2, name: 'Rohan Verma', score: 9720, avatar: PlaceHolderImages.find(p => p.id === 'avatar2')!.imageUrl, country: 'IN' },
  { rank: 3, name: 'Priya Singh', score: 9680, avatar: PlaceHolderImages.find(p => p.id === 'avatar3')!.imageUrl, country: 'IN' },
  { rank: 4, name: 'Kenji Tanaka', score: 9550, avatar: PlaceHolderImages.find(p => p.id === 'company4')!.imageUrl, country: 'JP' },
  { rank: 5, name: 'Liam Murphy', score: 9490, avatar: PlaceHolderImages.find(p => p.id === 'company5')!.imageUrl, country: 'IE' },
];

export default function CompetitionsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 mb-8 rounded-2xl bg-gradient-to-br from-primary/5 via-white to-accent/5 border"
        >
          <Trophy className="w-16 h-16 text-primary mx-auto animate-pulse" />
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mt-4">
            Compete. Improve. Win.
          </h1>
          <p className="mt-2 text-lg text-slate-500">
            Level up your career in the Zekkers Skill Arena.
          </p>
          <Button size="lg" className="mt-6">
            Join a Competition <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Categories & Active Competitions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Categories */}
            <motion.section variants={containerVariants} initial="hidden" animate="visible">
              <h2 className="text-2xl font-bold mb-4">Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {competitionCategories.map((cat) => (
                  <motion.div key={cat.name} variants={itemVariants}>
                    <Card className="text-center p-4 hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
                        {cat.icon}
                      </div>
                      <p className="mt-3 font-semibold text-sm">{cat.name}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Active Competitions */}
            <motion.section variants={containerVariants} initial="hidden" animate="visible">
              <h2 className="text-2xl font-bold mb-4">Active Competitions</h2>
              <div className="space-y-4">
                {activeCompetitions.map((comp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                    }}
                  >
                    <Card className="p-4">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge variant="secondary">{comp.type}</Badge>
                            <Badge variant="outline">{comp.difficulty}</Badge>
                          </div>
                          <h3 className="text-lg font-bold mt-2">{comp.title}</h3>
                          <p className="text-sm text-amber-600 font-semibold mt-1">
                            Prize: {comp.prize}
                          </p>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
                          <div className="font-semibold text-primary">
                            {comp.timeRemaining} left
                          </div>
                          <p className="text-xs text-slate-500">
                            {comp.slotsLeft} slots remaining
                          </p>
                          <Button size="sm" className="mt-2 w-full sm:w-auto">
                            View Challenge
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Sidebar: Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="text-red-500" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>Top performers this week.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {leaderboardData.map((player) => (
                    <li key={player.rank} className="flex items-center gap-3">
                      <div className="font-bold text-slate-400 w-6 text-center">
                        {player.rank}
                      </div>
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{player.name}</p>
                        <p className="text-xs text-slate-500">{player.country}</p>
                      </div>
                      <div className="font-bold text-primary text-sm">
                        {player.score.toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
             <Card className="bg-gradient-to-br from-primary/90 to-accent/90 text-white">
                <CardHeader>
                    <CardTitle>Your Rank</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="text-4xl font-bold">#1,204</div>
                    <p className="text-sm text-primary-foreground/80 mt-1">Top 15%</p>
                    <Button variant="secondary" className="mt-4">Improve Your Rank</Button>
                </CardContent>
            </Card>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
