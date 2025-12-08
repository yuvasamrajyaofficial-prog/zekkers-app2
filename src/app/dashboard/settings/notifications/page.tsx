
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const NotificationToggle = ({ id, label, description, defaultChecked = true }: { id: string, label: string, description: string, defaultChecked?: boolean }) => (
    <div className="flex items-start justify-between p-4 border rounded-lg hover:bg-slate-50/50 transition-colors">
        <div className="space-y-0.5 pr-4">
            <Label htmlFor={id} className="text-base font-semibold cursor-pointer">{label}</Label>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch id={id} defaultChecked={defaultChecked} />
    </div>
);

export default function NotificationsPage() {
  return (
     <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications from Zekkers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <NotificationToggle 
                    id="job-recs"
                    label="Job Recommendations"
                    description="Receive new job matches based on your profile and activity."
                />
                 <NotificationToggle 
                    id="app-status"
                    label="Application Status Updates"
                    description="Get notified when an employer views your application or changes its status."
                />
                 <NotificationToggle 
                    id="interview-reminders"
                    label="Interview Reminders"
                    description="Reminders for your upcoming interviews."
                />
                 <NotificationToggle 
                    id="deadline-alerts"
                    label="Saved Job Deadline Alerts"
                    description="Notifications for saved jobs that are about to expire."
                />
                 <NotificationToggle 
                    id="recruiter-messages"
                    label="Recruiter Messages"
                    description="Alerts for new messages from employers."
                />
                 <NotificationToggle 
                    id="competition-alerts"
                    label="Competition Alerts"
                    description="Stay updated on new competitions and results."
                />
            </CardContent>
        </Card>
        <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>
     </div>
  );
}
