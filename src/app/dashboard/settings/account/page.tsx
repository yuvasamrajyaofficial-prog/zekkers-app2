
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';

export default function AccountSecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Email Address</CardTitle>
                <CardDescription>This is the email address you use to log in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input id="email" type="email" defaultValue="prashant.kumar@example.com" disabled />
                    <Button variant="outline" className="w-full sm:w-auto">Change</Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>For your security, we recommend using a strong, unique password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input id="current_password" type="password" />
                 </div>
                 <div className="space-y-2 relative">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input id="new_password" type={showPassword ? 'text' : 'password'} />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute bottom-2 right-3 text-slate-500"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                        ) : (
                        <Eye className="h-5 w-5" />
                        )}
                    </button>
                 </div>
                 <Button>Update Password</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                    <div>
                        <h4 className="font-semibold">Authenticator App</h4>
                        <p className="text-sm text-muted-foreground">Use an app like Google Authenticator.</p>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto">Set Up</Button>
                </div>
            </CardContent>
        </Card>
        
         <Card>
            <CardHeader>
                <CardTitle>Login Devices</CardTitle>
                <CardDescription>Here is a list of devices that have logged into your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <p className="font-medium">Chrome on macOS</p>
                        <p className="text-sm text-muted-foreground">Bengaluru, India · <span className="text-green-600">Active now</span></p>
                    </div>
                     <Button variant="ghost" size="sm">Details</Button>
                </div>
                <Separator />
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <p className="font-medium">Zekkers App on iPhone</p>
                        <p className="text-sm text-muted-foreground">Mumbai, India · 2 days ago</p>
                    </div>
                    <Button variant="ghost" size="sm">Details</Button>
                </div>
                 <Separator />
                <Button variant="destructive" className="mt-4">Log Out From All Devices</Button>
            </CardContent>
        </Card>
    </div>
  );
}
