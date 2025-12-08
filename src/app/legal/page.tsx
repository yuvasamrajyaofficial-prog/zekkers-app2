'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LegalPage() {
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
          <CardTitle className="text-3xl font-bold">Legal</CardTitle>
          <p className="mt-2 text-slate-600">
            Important legal documents that govern your use of Zekkers.
          </p>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/cookie-preferences"
                className="text-blue-600 hover:underline"
              >
                Cookie Policy & Preferences
              </Link>
            </li>
            <li>
              <Link
                href="/report-abuse"
                className="text-blue-600 hover:underline"
              >
                Report Abuse Policy
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
