'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export default function SecurityPage() {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Security Settings Saved",
            description: "Your security policies have been updated.",
        });
    };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock /> Security & Login</CardTitle>
            <CardDescription>Manage your organization's security settings and access policies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="sso-mandatory" className="font-semibold">Enforce SSO-only Login for all team members</Label>
                <Switch id="sso-mandatory" />
            </div>
             <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="2fa-mandatory" className="font-semibold">Require 2FA for all Team Members</Label>
                <Switch id="2fa-mandatory" defaultChecked />
            </div>
             <div className="flex justify-end">
                <Button onClick={handleSave}>Save Security Settings</Button>
            </div>
        </CardContent>
    </Card>
  );
}
