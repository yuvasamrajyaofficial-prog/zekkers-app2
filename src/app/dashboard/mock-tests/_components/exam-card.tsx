
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Exam } from '@/lib/exams';
import Link from 'next/link';
import { BookOpen, Languages, Clock, ListChecks } from 'lucide-react';

export const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
      className="bg-white p-4 rounded-xl border flex flex-col"
    >
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-slate-800 pr-2">{exam.title}</h3>
            <Badge variant="secondary" className="capitalize shrink-0">{exam.category}</Badge>
        </div>
        
        <div className="mt-2 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{exam.durationMins} minutes</span>
            </div>
            <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4" />
                <span>{exam.sections.reduce((total, s) => total + s.questions.length, 0)} Questions</span>
            </div>
             <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                <span>{exam.language?.join(', ')}</span>
            </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex items-center justify-end">
          <Button size="sm" asChild>
            <Link href="/dashboard/study-materials">View Details</Link>
          </Button>
      </div>
    </motion.div>
  );
};
