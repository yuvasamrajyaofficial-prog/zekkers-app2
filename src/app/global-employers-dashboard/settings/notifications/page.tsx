'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    const { toast } = useToast();
    
    const handleSave = () => {
        toast({
            title: "Notification Settings Saved",
            description: "Your preferences have been updated.",
        });
    };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
            <CardDescription>Control how you and your team receive alerts about global hiring activities.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <NotificationToggle 
                id="new-applicant"
                label="New Applicants"
                description="Get notified when a new candidate applies to a global job."
            />
            <NotificationToggle 
                id="visa-ready"
                label="New Visa-Ready Candidates"
                description="Alerts when new candidates with visa-ready status match your roles."
            />
            <NotificationToggle 
                id="compliance-alerts"
                label="Compliance & Legal Alerts"
                description="Notifications for expiring work permits or regulatory changes in your hiring regions."
            />
             <NotificationToggle 
                id="weekly-summary"
                label="Weekly Summary"
                description="Receive a weekly email digest of your global hiring activity."
                defaultChecked={false}
            />
            <div className="flex justify-end pt-4">
                <Button onClick={handleSave}>Save Notification Settings</Button>
            </div>
        </CardContent>
    </Card>
  );
}
