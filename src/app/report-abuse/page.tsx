'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function ReportAbusePage() {
  const router = useRouter();
  const [details, setDetails] = useState('');
  const submit = () => {
    // TODO: create report ticket
    alert('Report submitted');
  };
  return (
    <div className="p-6 max-w-3xl mx-auto">
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
          <CardTitle className="text-2xl font-bold">Report Abuse</CardTitle>
          <p className="mt-2 text-slate-600">
            Help us keep the Zekkers community safe.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="details">
              Please provide as much detail as possible.
            </Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={8}
              className="w-full"
              placeholder="Describe the issue, including links to jobs or profiles..."
            />
          </div>
          <div className="mt-4">
            <Button onClick={submit}>Submit Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
