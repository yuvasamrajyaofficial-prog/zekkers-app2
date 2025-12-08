'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function StudentGuidePage() {
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
          <CardTitle className="text-3xl font-bold">Student Guide</CardTitle>
          <p className="mt-2 text-slate-600">
            Your checklist for success on the Zekkers platform.
          </p>
        </CardHeader>
        <CardContent className="text-sm prose prose-slate max-w-none">
          <h2 className="font-semibold text-lg">Onboarding Checklist</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <strong>Complete your profile 100%.</strong> This is the most
              important step to attract recruiters.
            </li>
            <li>
              <strong>Upload your best resume.</strong> Our AI will analyze it and
              give you a score.
            </li>
            <li>
              <strong>Take a skills assessment.</strong> Prove your abilities and
              earn badges.
            </li>
            <li>
              <strong>Generate your first AI Roadmap.</strong> Get a personalized
              plan to achieve your career goals.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
