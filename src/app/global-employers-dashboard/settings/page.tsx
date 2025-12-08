'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User, Building, Mail, Phone, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/firebase';

export default function AccountSettingsPage() {
    const { toast } = useToast();
    const { user } = useUser();

    const handleSave = () => {
        toast({
            title: "Account Settings Saved",
            description: "Your profile information has been updated.",
        });
    };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><User /> Account Settings</CardTitle>
            <CardDescription>Manage your personal profile and contact information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
             <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    {user?.photoURL && <AvatarImage src={user.photoURL} />}
                    <AvatarFallback>{user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'G'}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1.5">
                    <Label htmlFor="picture">Profile Picture</Label>
                    <Input id="picture" type="file" className="max-w-sm"/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.displayName || ''} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" disabled defaultValue={user?.email || ''} />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input id="role" placeholder="e.g., Global Head of Talent" />
            </div>

             <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </CardContent>
    </Card>
  );
}
