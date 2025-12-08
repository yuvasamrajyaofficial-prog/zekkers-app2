'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';

const NotificationToggle = ({ id, label, description, defaultChecked = true }: { id: string, label: string, description: string, defaultChecked?: boolean }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50/50 transition-colors">
        <div className="space-y-0.5 pr-4">
            <Label htmlFor={id} className="text-base font-semibold cursor-pointer">{label}</Label>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch id={id} defaultChecked={defaultChecked} />
    </div>
);


export default function NotificationsSettingsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
            <CardDescription>Control how your team receives alerts about candidates, jobs, and billing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <NotificationToggle 
                id="new-applicant"
                label="New Applicants"
                description="Get notified when a new candidate applies to one of your jobs."
            />
            <NotificationToggle 
                id="stage-change"
                label="Pipeline Stage Changes"
                description="Alerts when a candidate is moved to a new stage in your ATS."
            />
            <NotificationToggle 
                id="billing-alerts"
                label="Billing & Subscription"
                description="Receive reminders for renewals and payment status updates."
            />
            <NotificationToggle 
                id="integration-status"
                label="Integration & API Status"
                description="Get alerts for webhook failures or API issues."
            />
            <div className="flex justify-end pt-4">
                <Button>Save Notification Settings</Button>
            </div>
        </CardContent>
    </Card>
  );
}
