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
import { Progress } from '@/components/ui/progress';
import {
  Award,
  CheckCircle,
  Trophy,
  Star,
  Zap,
  Shield,
  BookOpen,
  Briefcase,
  UserCheck,
} from 'lucide-react';

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

const badges = [
  {
    name: 'Profile Pro',
    category: 'Profile',
    level: 'Gold',
    description: 'Achieved 100% profile completion.',
    icon: <UserCheck className="w-8 h-8" />,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    name: 'React Warrior',
    category: 'Skill',
    level: 'Silver',
    description: 'Mastered the basics of React.js.',
    icon: <Zap className="w-8 h-8" />,
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
  },
  {
    name: 'First Application',
    category: 'Application',
    level: 'Bronze',
    description: 'Sent your first job application.',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'text-orange-600',
    bg: 'bg-orange-600/10',
  },
  {
    name: 'Learning Streak',
    category: 'Learning',
    level: 'Silver',
    description: 'Completed learning tasks for 7 days in a row.',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
  },
  {
    name: 'Competition Finalist',
    category: 'Competition',
    level: 'Gold',
    description: 'Ranked in the Top 10 of a global competition.',
    icon: <Shield className="w-8 h-8" />,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    name: 'Hired!',
    category: 'Application',
    level: 'Diamond',
    description: 'Successfully secured a job through Zekkers.',
    icon: <Star className="w-8 h-8" />,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
];

const trophies = [
    {
        name: 'AI Roadmap Pioneer',
        description: 'Completed your first AI-generated career roadmap.',
    },
    {
        name: 'Century Applicator',
        description: 'Applied to 100 jobs.',
    },
    {
        name: 'Global Competitor',
        description: 'Participated in an international competition.',
    },
];

const BadgeCard = ({ badge }: { badge: typeof badges[0] }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`p-4 rounded-xl border flex flex-col items-center text-center transition-shadow hover:shadow-lg ${badge.bg}`}
  >
    <div className={`p-3 rounded-full ${badge.color}`}>{badge.icon}</div>
    <h3 className="font-bold text-sm mt-3">{badge.name}</h3>
    <p className="text-xs text-slate-500 mt-1 flex-1">{badge.description}</p>
    <div
      className={`mt-3 text-xs font-bold px-2 py-1 rounded-full border ${badge.color} ${badge.bg}`}
    >
      {badge.level}
    </div>
  </motion.div>
);

const TrophyCard = ({ trophy }: { trophy: typeof trophies[0] }) => (
    <motion.div
        variants={itemVariants}
        className="text-center p-4"
    >
        <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
        <h3 className="font-semibold mt-2 text-sm">{trophy.name}</h3>
        <p className="text-xs text-slate-500 mt-1">{trophy.description}</p>
    </motion.div>
)

export default function AchievementsPage() {
  const userXP = 750;
  const level = 12;
  const xpForNextLevel = 1000;
  const progress = (userXP / xpForNextLevel) * 100;

  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
      <Card>
        <CardHeader className="text-center md:text-left">
          <CardTitle className="text-2xl font-bold flex items-center justify-center md:justify-start gap-3">
            <Award className="text-primary" />
            My Achievements
          </CardTitle>
          <CardDescription>
            Your collection of badges, trophies, and milestones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-primary/90 to-accent/90 text-white p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">Current Level</p>
                  <p className="text-4xl font-bold">Level {level}</p>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-sm text-primary-foreground/80 text-right mb-1">
                    {userXP} / {xpForNextLevel} XP
                  </p>
                  <Progress
                    value={progress}
                    className="h-3 bg-white/20 [&>div]:bg-white"
                  />
                  <p className="text-xs text-primary-foreground/80 mt-1">
                    {xpForNextLevel - userXP} XP to next level
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Badges Grid */}
          <section className="mt-8">
            <h2 className="text-xl font-bold">Badges Earned</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {badges.map((badge) => (
                <BadgeCard key={badge.name} badge={badge} />
              ))}
            </motion.div>
          </section>

            {/* Trophy Cabinet */}
            <section className="mt-8">
            <h2 className="text-xl font-bold">Trophy Cabinet</h2>
                 <Card className="mt-4 bg-slate-100/50">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4"
                    >
                      {trophies.map((trophy) => (
                        <TrophyCard key={trophy.name} trophy={trophy} />
                      ))}
                      {/* Placeholder for locked trophy */}
                       <motion.div variants={itemVariants} className="text-center p-4 opacity-40">
                            <Trophy className="w-16 h-16 text-slate-400 mx-auto" />
                            <h3 className="font-semibold mt-2 text-sm text-slate-600">Locked</h3>
                            <p className="text-xs text-slate-500 mt-1">Keep going to unlock!</p>
                        </motion.div>
                    </motion.div>
                 </Card>
            </section>

          {/* Recently Earned */}
          <section className="mt-8">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-white border rounded-lg flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold text-sm">
                    Unlocked: <span className="text-primary">Profile Pro</span>
                  </p>
                  <p className="text-xs text-slate-500">2 days ago</p>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
