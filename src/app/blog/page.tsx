'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BlogPage() {
  const router = useRouter();
  const posts: any[] = []; // TODO: fetch from CMS or /posts
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
          <CardTitle className="text-3xl font-bold">Blog & Insights</CardTitle>
          <p className="mt-2 text-slate-600">
            The latest news, tips, and trends in the world of recruitment and career
            development.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mt-6 grid gap-6">
            {posts.length ? (
              posts.map((p: any) => (
                <article key={p.id} className="bg-white p-6 rounded-lg border">
                  <h3 className="font-semibold text-xl">{p.title}</h3>
                  <p className="text-sm text-slate-500 mt-2">{p.excerpt}</p>
                  <Button variant="link" className="p-0 mt-2">
                    Read More
                  </Button>
                </article>
              ))
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-lg border">
                <h2 className="font-semibold">No Posts Yet</h2>
                <p className="text-slate-500 mt-2">
                  Come back soon for articles and insights.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
