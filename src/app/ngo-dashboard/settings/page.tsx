
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OrganizationSettingsPage() {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Organization Profile Saved",
            description: "Your changes have been saved successfully.",
        });
    };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building /> Organization Profile</CardTitle>
            <CardDescription>Manage your NGO's core details and registration information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>NGO Logo</Label>
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center">
                        <UploadCloud className="text-slate-400" />
                    </div>
                    <Input type="file" className="max-w-sm" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ngo-name">NGO Name</Label>
                    <Input id="ngo-name" defaultValue="Yuva Setu Foundation" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="reg-number">Registration Number</Label>
                    <Input id="reg-number" defaultValue="U85300MH2023NPL413491" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                     <Select defaultValue="ngo">
                        <SelectTrigger id="category">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ngo">NGO</SelectItem>
                            <SelectItem value="trust">Trust</SelectItem>
                            <SelectItem value="foundation">Foundation</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" defaultValue="https://yuvasetu.org" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter your registered address..." />
            </div>
            <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </CardContent>
    </Card>
  );
}
