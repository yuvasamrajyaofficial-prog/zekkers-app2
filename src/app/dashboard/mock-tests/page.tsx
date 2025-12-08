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
import { BookOpen } from 'lucide-react';
import MockTestsClient from './_components/mock-tests-client';

export default function MockTestsPage() {
  const mockTests = MOCK_EXAMS; // In a real app, you'd fetch this.

  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <BookOpen className="text-primary" />
            Mock Tests
          </CardTitle>
          <CardDescription>
            Simulate real exam conditions and benchmark your performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MockTestsClient exams={mockTests} />
        </CardContent>
      </Card>
    </div>
  );
}
