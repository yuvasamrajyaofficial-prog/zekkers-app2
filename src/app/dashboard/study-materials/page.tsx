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
import { Input } from '@/components/ui/input';
import { BookOpen, ChevronLeft, Search } from 'lucide-react';
import { CategoryCard } from './_components/category-card';
import { studyCategories } from '@/lib/study-materials';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function StudyMaterialsPage() {
  const router = useRouter();
  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
       <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-4 gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <BookOpen className="text-primary" />
            Study Materials Hub
          </CardTitle>
          <CardDescription>
            Your comprehensive library for exam preparation and skill development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for exams, skills, or topics..."
              className="pl-10 h-12 text-base"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {studyCategories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
