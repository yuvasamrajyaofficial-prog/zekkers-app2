'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { MOCK_EXAMS } from '@/lib/exams';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import ExamsClient from './_components/exams-client';

export default function ExamsPage() {
  // In a real app, you'd fetch this from a service.
  const allExams = MOCK_EXAMS; 

  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <GraduationCap className="text-primary" />
            Exams Library
          </CardTitle>
          <CardDescription>
            Your gateway to mastering competitive exams with past papers and structured content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExamsClient exams={allExams} />
        </CardContent>
      </Card>
    </div>
  );
}
