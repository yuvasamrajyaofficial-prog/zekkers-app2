'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase } from 'lucide-react';

export default function JobDefaultsSettingsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Briefcase />Job Posting Defaults</CardTitle>
            <CardDescription>Set default values to speed up the job creation process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="default-location">Default Job Location</Label>
                <Input id="default-location" placeholder="e.g., Bengaluru, India" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="default-perks">Default Perks & Benefits (template)</Label>
                <Textarea id="default-perks" placeholder="List common benefits like health insurance, flexible hours..." />
            </div>
             <div className="space-y-2">
                <Label htmlFor="screening-questions">Default Screening Questions (template)</Label>
                <Textarea id="screening-questions" placeholder="e.g., Are you legally authorized to work in India?" />
            </div>
            <div className="flex justify-end">
                <Button>Save Defaults</Button>
            </div>
        </CardContent>
    </Card>
  );
}
