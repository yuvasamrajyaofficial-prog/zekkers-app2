'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SecurityPage() {
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
          <CardTitle className="text-3xl font-bold">Security & Compliance</CardTitle>
          <p className="mt-2 text-slate-600">
            How we protect your data and ensure a secure platform.
          </p>
        </CardHeader>
        <CardContent className="text-sm prose prose-slate max-w-none">
          <h2 className="font-semibold text-lg">Data Protection</h2>
          <p className="mt-2">
            We use industry-standard encryption (TLS 1.3) for all data in
            transit and at rest. Your personal information is stored securely in
            our databases with strict access controls.
          </p>

          <h2 className="font-semibold text-lg mt-4">Compliance</h2>
          <p className="mt-2">
            We are compliant with GDPR and other major data protection
            regulations. You have the right to access, rectify, or delete your
            data at any time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
