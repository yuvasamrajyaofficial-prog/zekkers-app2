'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ZLoader from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateProfile } from 'firebase/auth';
import Image from 'next/image';

export default function AdminProfilePage() {
    const auth = useAuth();
    const user = auth.currentUser;
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isLoading, setIsLoading] = useState(false);

    if (!user) {
        return <div className="p-6"><ZLoader /></div>;
    }

    const handleSave = async () => {
        if (user) {
            setIsLoading(true);
            try {
                await updateProfile(user, { displayName: displayName });
                // Force a reload of the user object to get the new display name
                await user.reload();
                setIsEditing(false);
            } catch (error) {
                console.error("Failed to update profile", error);
                // You might want to show a toast message here
            } finally {
                setIsLoading(false);
            }
        }
    };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Admin Profile</h1>
        <div>
            {isEditing ? (
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>My Account</CardTitle>
            <CardDescription>Your administrator account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    {isEditing ? (
                        <Input 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="text-xl"
                        />
                    ) : (
                        <p className="font-semibold text-xl">{user.displayName || 'Admin User'}</p>
                    )}
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-sm font-mono">{user.uid}</p>
            </div>
             <div>
                <p className="text-sm font-medium text-muted-foreground">Last Sign-in</p>
                <p className="text-sm">{new Date(user.metadata.lastSignInTime!).toLocaleString()}</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
