'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function HelpCenterPage() {
  const router = useRouter();
  const faqs: any[] = [];
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
          <CardTitle className="text-3xl font-bold">Help Center</CardTitle>
          <p className="mt-2 text-slate-600">How can we help you today?</p>
        </CardHeader>
        <CardContent>
          <div className="relative mt-4">
            <Input placeholder="Search articles..." className="pl-10 h-12" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="mt-6 grid gap-4">
            {faqs.length ? (
              faqs.map((f: any) => <article key={f.id}>{f.q}</article>)
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-lg border">
                <h2 className="font-semibold">No Articles Yet</h2>
                <p className="text-slate-500 mt-2">
                  Our knowledge base is being built. Check back soon!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
