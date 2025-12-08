'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ShieldCheck, FileText, Banknote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function VerificationPage() {
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
          <CardTitle className="text-3xl font-bold">Verification Standards</CardTitle>
          <p className="mt-2 text-slate-600">
            Building a trusted ecosystem for safe and reliable hiring.
          </p>
        </CardHeader>
        <CardContent>
          <h2 className="font-semibold text-xl">Badge Levels</h2>
          <p className="text-slate-500 mt-1">
            Employers can earn badges by completing verification steps.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="font-semibold flex items-center gap-2">
                <ShieldCheck className="text-blue-500" /> Basic
              </h3>
              <ul className="list-disc pl-5 mt-2 text-slate-600 text-sm">
                <li>Email & domain verification</li>
                <li>Phone number verification</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="text-green-500" /> Document Verified
              </h3>
              <ul className="list-disc pl-5 mt-2 text-slate-600 text-sm">
                <li>Company registration docs & ID</li>
                <li>Manual review by our team</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-slate-50">
              <h3 className="font-semibold flex items-center gap-2">
                <Banknote className="text-purple-500" /> Premium
              </h3>
              <ul className="list-disc pl-5 mt-2 text-slate-600 text-sm">
                <li>Physical address verification</li>
                <li>Bank account verification</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Button>Request Verification</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
