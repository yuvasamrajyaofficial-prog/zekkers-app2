'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CompanyProfilePage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Company Profile</h1>
            <p className="text-muted-foreground">Manage your company details and branding.</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Publicly visible company details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input placeholder="e.g. ZekkTech" defaultValue="ZekkTech" />
                </div>
                <div className="space-y-2">
                    <Label>Website</Label>
                    <Input placeholder="https://" defaultValue="https://zekk.tech" />
                </div>
                <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input placeholder="e.g. Technology" defaultValue="Technology" />
                </div>
                <div className="space-y-2">
                    <Label>About</Label>
                    <Textarea placeholder="Tell us about your company..." className="min-h-[100px]" />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Contact Details</CardTitle>
                <CardDescription>How candidates can reach you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="hr@zekk.tech" />
                </div>
                <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" placeholder="+91..." />
                </div>
                <div className="space-y-2">
                    <Label>Headquarters</Label>
                    <Input placeholder="City, Country" defaultValue="Bengaluru, India" />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
