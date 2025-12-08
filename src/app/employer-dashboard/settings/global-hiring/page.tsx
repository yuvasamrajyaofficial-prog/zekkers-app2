'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

export default function GlobalHiringSettingsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Globe/> Global Hiring Settings</CardTitle>
            <CardDescription>Configure your preferences and policies for hiring international talent.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor="visa-sponsorship" className="font-semibold">Offer Visa Sponsorship</Label>
                <Switch id="visa-sponsorship" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="allowed-regions">Allowed Hiring Regions</Label>
                <Select>
                    <SelectTrigger id="allowed-regions">
                        <SelectValue placeholder="Select regions... (e.g., Europe, SE Asia)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="north-america">North America</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="middle-east">Middle East</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="currency-default">Default Salary Currency for Global Roles</Label>
                <Select>
                    <SelectTrigger id="currency-default">
                        <SelectValue placeholder="Select currency... (e.g., USD, EUR)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="AED">AED (د.إ)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end">
                <Button>Save Global Settings</Button>
            </div>
        </CardContent>
    </Card>
  );
}
