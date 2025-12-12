'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Globe, Clock } from 'lucide-react';

export default function LanguageSettingsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Language & Region</h1>
        <p className="text-muted-foreground">Manage your language preferences and regional settings.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Language</CardTitle>
            <CardDescription>Select your preferred language for the platform interface.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="language">Display Language</Label>
                <Select defaultValue="en">
                    <SelectTrigger id="language">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English (US)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Region & Timezone</CardTitle>
            <CardDescription>Set your local timezone for accurate interview scheduling.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-5">
                    <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select Timezone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (US & Canada)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (US & Canada)</SelectItem>
                        <SelectItem value="utc+0">GMT (London)</SelectItem>
                        <SelectItem value="utc+1">CET (Paris, Berlin)</SelectItem>
                        <SelectItem value="utc+5.5">IST (India)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mdy">
                    <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select Date Format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}
