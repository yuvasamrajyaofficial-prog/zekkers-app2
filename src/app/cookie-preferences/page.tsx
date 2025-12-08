'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CookiePreferences() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

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
          <CardTitle className="text-2xl font-bold">Cookie Preferences</CardTitle>
          <p className="mt-2 text-slate-600">
            Manage your cookie settings to control your experience.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label htmlFor="necessary" className="font-semibold">
                Strictly Necessary
              </Label>
              <p className="text-xs text-slate-500">
                These cookies are essential for the website to function and cannot
                be switched off.
              </p>
            </div>
            <Switch id="necessary" checked disabled />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label htmlFor="analytics" className="font-semibold">
                Analytics Cookies
              </Label>
              <p className="text-xs text-slate-500">
                These cookies allow us to count visits and traffic sources so we
                can measure and improve the performance of our site.
              </p>
            </div>
            <Switch
              id="analytics"
              checked={analytics}
              onCheckedChange={setAnalytics}
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <Label htmlFor="marketing" className="font-semibold">
                Marketing Cookies
              </Label>
              <p className="text-xs text-slate-500">
                These cookies may be set through our site by our advertising
                partners to build a profile of your interests.
              </p>
            </div>
            <Switch
              id="marketing"
              checked={marketing}
              onCheckedChange={setMarketing}
            />
          </div>
          <div className="mt-4">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
