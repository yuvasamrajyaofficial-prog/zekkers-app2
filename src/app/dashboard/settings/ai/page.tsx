'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sparkles, Bot, BrainCircuit } from 'lucide-react';

export default function AISettingsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Personalization</h1>
        <p className="text-muted-foreground">Customize how AI helps you in your job search.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-purple-600" /> AI Recommendations</CardTitle>
            <CardDescription>Control AI-powered job and skill suggestions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Smart Job Matches</Label>
                    <p className="text-sm text-muted-foreground">Allow AI to recommend jobs based on your profile and activity.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Skill Gap Analysis</Label>
                    <p className="text-sm text-muted-foreground">Get AI suggestions for skills to learn based on your career goals.</p>
                </div>
                <Switch defaultChecked />
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-blue-600" /> AI Assistants</CardTitle>
            <CardDescription>Manage settings for Resume AI and Interview AI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Resume Auto-Optimization</Label>
                    <p className="text-sm text-muted-foreground">Allow Resume AI to suggest improvements automatically.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                    <Label className="text-base">Interview Practice Feedback</Label>
                    <p className="text-sm text-muted-foreground">Receive detailed AI feedback after mock interviews.</p>
                </div>
                <Switch defaultChecked />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save AI Preferences</Button>
      </div>
    </div>
  );
}
