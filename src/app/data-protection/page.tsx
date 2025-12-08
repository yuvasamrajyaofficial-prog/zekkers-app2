'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DataProtectionPage() {
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
          <CardTitle className="text-3xl font-bold">Data Protection</CardTitle>
          <p className="mt-2 text-slate-600">
            Your rights and our responsibilities regarding your data.
          </p>
        </CardHeader>
        <CardContent className="text-sm prose prose-slate max-w-none">
          <p>
            We are committed to protecting your data. This page outlines what
            data we collect, how it's processed, and how you can manage it.
          </p>
          <h2 className="font-semibold text-lg mt-4">Your Rights</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>The right to access your data.</li>
            <li>The right to rectify incorrect information.</li>
            <li>The right to erase your data.</li>
            <li>The right to data portability.</li>
          </ul>
          <div className="mt-6">
            <Button>Request Data Export</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
