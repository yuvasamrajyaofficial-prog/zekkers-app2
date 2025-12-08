
'use client';
import React from 'react';
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
            <CardTitle className="flex items-center gap-2"><Building /> Organization Information</CardTitle>
            <CardDescription>Manage your company's core details and branding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center">
                        <UploadCloud className="text-slate-400" />
                    </div>
                    <Input type="file" className="max-w-sm" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="ZekkTech" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="legal-name">Legal Business Name</Label>
                    <Input id="legal-name" defaultValue="ZekkTech Solutions Pvt. Ltd." />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                     <Select defaultValue="technology">
                        <SelectTrigger id="industry">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="technology">Software & IT</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <Select defaultValue="1000-5000">
                        <SelectTrigger id="company-size">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1-50">1-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-1000">201-1000 employees</SelectItem>
                            <SelectItem value="1000-5000">1000-5000 employees</SelectItem>
                            <SelectItem value="5000+">5000+ employees</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input id="website" defaultValue="https://zekktech.com" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea id="description" placeholder="A short description of your company..." defaultValue="ZekkTech builds modern web products used by millions, focusing on scalable and user-friendly solutions." />
            </div>
            <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </CardContent>
    </Card>
  );
}
