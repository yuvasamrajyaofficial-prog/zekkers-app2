
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Edit, Download, Eye } from 'lucide-react';
import type { Course } from '@/services/courses';

interface CourseCardProps {
  course: Course;
  onView: (c: Course) => void;
  onEdit: (c: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onView, onEdit }) => {
  return (
    <motion.div whileHover={{ y: -4 }} className="h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge variant="secondary" className="capitalize shrink-0">{course.category}</Badge>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <p className="text-sm text-slate-600 line-clamp-2 flex-grow">{course.description}</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <Users className="w-3 h-3" /> <span>{course.enrolled ?? 0} enrolled</span>
            <span className="ml-4">{course.trainer}</span>
            <span className="ml-auto font-semibold text-primary">{course.progressPercent ?? 0}%</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => onView(course)} variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4"/> View
            </Button>
            <Button onClick={() => onEdit(course)} variant="outline" size="sm" className="gap-2">
              <Edit className="w-4 h-4" /> Edit
            </Button>
            <Button variant="ghost" size="sm" className="ml-auto gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
