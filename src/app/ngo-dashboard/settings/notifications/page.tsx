
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


export default function NotificationsPage() {
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
            <CardTitle className="flex items-center gap-2"><Bell /> Notifications & Alerts</CardTitle>
            <CardDescription>Manage how you and your team receive important updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <NotificationToggle 
                id="new-participant"
                label="New Participant Signup"
                description="Get notified when a new beneficiary registers for a program."
            />
            <NotificationToggle 
                id="placement-update"
                label="Placement Updates"
                description="Alerts when a participant is shortlisted, interviewed, or placed."
            />
             <NotificationToggle 
                id="donor-reports"
                label="Donor Reporting Reminders"
                description="Reminders for upcoming CSR and donor report deadlines."
            />
             <NotificationToggle 
                id="compliance-alerts"
                label="Compliance Alerts"
                description="Notifications for expiring documents or compliance actions needed."
            />
            <div className="flex justify-end pt-4">
                <Button onClick={handleSave}>Save Notification Settings</Button>
            </div>
        </CardContent>
    </Card>
  );
}
