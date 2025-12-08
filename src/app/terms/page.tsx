'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function TermsPage() {
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
          <CardTitle className="text-3xl font-bold">Terms & Conditions</CardTitle>
          <p className="text-sm text-slate-500 pt-1">Last updated: July 29, 2024</p>
        </CardHeader>
        <CardContent className="text-sm prose prose-slate max-w-none">
          <h2 className="font-semibold text-lg">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Zekkers platform, you agree to be bound by
            these Terms and Conditions and our Privacy Policy. If you do not agree
            to these terms, please do not use our services.
          </p>

          <h2 className="font-semibold text-lg mt-4">2. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>
          {/* Full T&C content goes here */}
        </CardContent>
      </Card>
    </div>
  );
}
