'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function RecruiterGuidelinesPage() {
  const router = useRouter();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="mb-4 gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Recruiter Guidelines</CardTitle>
          <p className="mt-2 text-slate-600">
            Best practices for fair, efficient, and successful hiring on Zekkers.
          </p>
        </CardHeader>
        <CardContent className="text-sm prose prose-slate max-w-none">
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Write accurate and detailed job descriptions.</strong> Be
              clear about roles, responsibilities, and qualifications to attract
              the right talent.
            </li>
            <li>
              <strong>Use assessments to reduce bias.</strong> Focus on skills
              and abilities rather than unconscious preferences.
            </li>
            <li>
              <strong>Respond promptly to applicants.</strong> A positive
              candidate experience reflects well on your brand.
            </li>
            <li>
              <strong>Maintain a high Company Score.</strong> Keep your profile
              updated and engage actively to build trust.
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
