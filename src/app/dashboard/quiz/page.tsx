
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BrainCircuit,
  FileText,
  CalendarDays,
  FileDown,
  Sparkles,
  Landmark,
  Train,
  Code,
  Lightbulb,
  BookCopy,
  Languages,
  MonitorSmartphone,
  Globe,
} from 'lucide-react';
import { QuizCategoryCard } from './_components/quiz-category-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MOCK_EXAMS } from '@/lib/exams';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const quizCategories = [
  { icon: <FileText />, title: 'Current Affairs', description: 'Stay updated daily', quizId: 'zekkers-mock-general-apt-2025' },
  { icon: <Landmark />, title: 'Banking', description: 'IBPS, SBI, RBI Exams', quizId: 'exam-ibps-po' },
  { icon: <Landmark />, title: 'SSC', description: 'CGL, CHSL, MTS Prep', quizId: 'exam-ssc-cgl' },
  { icon: <Lightbulb />, title: 'Aptitude', description: 'Quantitative & Logical', quizId: 'zekkers-mock-general-apt-2025' },
  { icon: <Code />, title: 'Tech & Coding', description: 'DS, Algo, System Design', quizId: 'campus-coding-test-2025' },
  { icon: <Globe />, title: 'General Knowledge', description: 'History, Geography, Polity', quizId: 'zekkers-mock-general-apt-2025' },
];

export default function QuizDashboardPage() {
  return (
    <div className="p-4 md:p-6 min-h-full bg-background">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Hero Section */}
        <motion.div>
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl">Quiz Dashboard</CardTitle>
                  <CardDescription className="text-primary-foreground/80 mt-1">
                    Practice smarter with AI-driven quizzes.
                  </CardDescription>
                </div>
                <div className="p-2 bg-white/20 rounded-full animate-pulse-glow">
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Quiz
                </Button>
                <Button variant="secondary" size="sm">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Daily Quiz
                </Button>
                <Button variant="secondary" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Weekly Current Affairs
                </Button>
                <Button variant="secondary" size="sm">
                  <FileDown className="w-4 h-4 mr-2" />
                  Saved & PDFs
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quiz Categories */}
        <motion.div>
          <h2 className="text-2xl font-bold text-navy mb-4">
            Explore Categories
          </h2>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {quizCategories.map((category, index) => (
              <Link href={`/dashboard/quiz/${category.quizId}`} key={index}>
                <QuizCategoryCard {...category} />
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* AI Quiz Generator */}
        <motion.div>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Sparkles className="text-primary" />
                        AI Quiz Generator
                    </CardTitle>
                    <CardDescription>
                        Create a custom quiz on any topic in seconds.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Enter topic, chapter, or paste text..."
                        className="h-12 text-base"
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Select defaultValue="10">
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="No. of Questions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 Questions</SelectItem>
                            <SelectItem value="10">10 Questions</SelectItem>
                            <SelectItem value="25">25 Questions</SelectItem>
                            <SelectItem value="50">50 Questions</SelectItem>
                        </SelectContent>
                        </Select>
                        <div className="flex-1 grid grid-cols-3 gap-2">
                            <Button variant="outline">Easy</Button>
                            <Button variant="outline" className="ring-2 ring-primary">Medium</Button>
                            <Button variant="outline">Hard</Button>
                        </div>
                    </div>
                     <Button size="lg" className="w-full">
                        Generate Quiz
                    </Button>
                </CardContent>
            </Card>
        </motion.div>

      </motion.div>
    </div>
  );
}
