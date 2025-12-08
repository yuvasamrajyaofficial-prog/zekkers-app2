'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function APIPage() {
  const router = useRouter();
  return (
    <div className="p-6 max-w-5xl mx-auto">
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
          <CardTitle className="text-3xl font-bold">API & Integrations</CardTitle>
          <p className="mt-2 text-slate-600">
            Connect your tools and build on top of the Zekkers platform.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mt-6 bg-white p-6 rounded-xl border text-sm">
            <h2 className="font-semibold text-xl">Authentication</h2>
            <p className="mt-2">
              Use API keys or OAuth 2.0 to authenticate your requests. Rate limits
              apply to all endpoints.
            </p>
            <pre className="mt-4 p-4 bg-slate-800 text-slate-100 rounded-md overflow-x-auto">
              <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" https://api.zekkers.com/v1/jobs`}</code>
            </pre>
          </div>
          <div className="mt-6">
            <Button>View Full API Documentation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
