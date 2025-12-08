'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Category {
    title: string;
    slug: string;
}

interface Props {
  category?: Category | null;
}

export default function StudyCategoryClient({ category }: Props) {
    const router = useRouter();

  return (
    <div className="p-4 md:p-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 gap-2">
            <ChevronLeft size={16}/> Back to Categories
        </Button>
        <Card>
            <CardHeader>
                <CardTitle>{category?.title || "Study Materials"}</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                    <h3 className="font-semibold text-lg">Content Coming Soon</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Study materials for the <strong>{category?.title}</strong> category will be available here.
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
