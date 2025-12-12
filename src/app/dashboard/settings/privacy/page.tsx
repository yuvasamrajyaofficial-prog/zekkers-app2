'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Eye, Shield } from 'lucide-react';

export default function PrivacySettingsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Privacy & Permissions</h1>
        <p className="text-muted-foreground">Control who can see your profile and activity.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" /> Profile Visibility</CardTitle>
            <CardDescription>Manage who can view your profile and resume.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Allow employers to find you in search results.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Show Resume</Label>
                    <p className="text-sm text-muted-foreground">Allow verified employers to view your full resume.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Search Engine Indexing</Label>
                    <p className="text-sm text-muted-foreground">Allow search engines like Google to show your profile.</p>
                </div>
                <Switch />
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Data Sharing</CardTitle>
            <CardDescription>Control how your data is used for platform improvements.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Share Usage Data</Label>
                    <p className="text-sm text-muted-foreground">Help us improve Zekkers by sharing anonymous usage data.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Personalized Ads</Label>
                    <p className="text-sm text-muted-foreground">Allow us to show you relevant job ads based on your activity.</p>
                </div>
                <Switch defaultChecked />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
