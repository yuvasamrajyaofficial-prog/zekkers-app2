'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AccessibilityPage() {
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
          <CardTitle className="text-3xl font-bold">Accessibility</CardTitle>
          <p className="mt-2 text-slate-600">
            Our commitment to making Zekkers usable for everyone.
          </p>
        </CardHeader>
        <CardContent className="text-sm prose prose-slate max-w-none">
          <h2 className="font-semibold text-lg">Our Commitment</h2>
          <p>
            We follow Web Content Accessibility Guidelines (WCAG) 2.1 to ensure
            our platform is accessible. This includes support for screen readers,
            keyboard navigation, and sufficient color contrast.
          </p>
          <h2 className="font-semibold text-lg mt-4">Features</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>High-contrast and reduced-motion options available in settings.</li>
            <li>Semantic HTML for screen reader compatibility.</li>
            <li>Full keyboard navigation support.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
