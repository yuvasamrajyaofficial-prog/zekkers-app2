'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function PrivacyPage() {
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
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <p className="text-sm text-slate-500 pt-1">Last updated: July 29, 2024</p>
        </CardHeader>
        <CardContent className="text-sm prose prose-slate max-w-none">
          <h2 className="font-semibold text-lg">Introduction</h2>
          <p className="mt-2">
            We respect your privacy and are committed to protecting it through our
            compliance with this policy. This policy describes the types of
            information we may collect from you or that you may provide when you
            visit the Zekkers website and our practices for collecting, using,
            maintaining, protecting, and disclosing that information.
          </p>
          <h2 className="font-semibold text-lg mt-4">
            Information We Collect About You
          </h2>
          <p className="mt-2">
            We collect several types of information from and about users of our
            Website, including information by which you may be personally
            identified, such as name, postal address, e-mail address, telephone
            number, or any other identifier by which you may be contacted online
            or offline.
          </p>
          <h2 className="font-semibold text-lg mt-4">
            How We Use Your Information
          </h2>
          <p className="mt-2">
            We use information that we collect about you or that you provide to
            us, including any personal information, to present our Website and its
            contents to you, to provide you with information, products, or
            services that you request from us, and to fulfill any other purpose
            for which you provide it.
          </p>
          {/* Add full policy content here */}
          <Button variant="outline" className="mt-6">
            Download as PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
