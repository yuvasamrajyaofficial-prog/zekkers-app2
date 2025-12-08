
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Monitor, Sun, Moon } from 'lucide-react';

export default function ThemeSettingsPage() {
  return (
     <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the Zekkers dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <Label className="text-base font-semibold">Theme</Label>
                <p className="text-sm text-muted-foreground mb-4">Choose how you would like Zekkers to appear.</p>
                <RadioGroup defaultValue="system" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                        <Label
                        htmlFor="light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <Sun className="mb-3 h-6 w-6" />
                            Light
                        </Label>
                    </div>
                     <div>
                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                        <Label
                        htmlFor="dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <Moon className="mb-3 h-6 w-6" />
                            Dark
                        </Label>
                    </div>
                     <div>
                        <RadioGroupItem value="system" id="system" className="peer sr-only" />
                        <Label
                        htmlFor="system"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <Monitor className="mb-3 h-6 w-6" />
                            System
                        </Label>
                    </div>
                </RadioGroup>
            </CardContent>
        </Card>
        <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>
     </div>
  );
}
