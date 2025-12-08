
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFirestore, useUser } from '@/firebase';
import { getUserProfile, saveUserProfile, ProfileData } from '@/services/profile';
import ZLoader from '@/components/ui/loader';

const emptyProfile: Omit<ProfileData, 'id' | 'email'> = {
  name: "",
  phone: "",
  location: "",
  about: "",
  role: 'Student/Job Seeker',
  resumeScore: 0,
  skills: [],
  education: [],
  experience: [],
  projects: [],
  languages: [],
  certifications: [],
  social: {
    github: "",
    portfolio: "",
  },
  avatarUrl: "",
  resumeUrl: "",
};


export default function ProfileSettingsPage() {
    const { user, isLoading: userLoading } = useUser();
    const firestore = useFirestore();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        if (user && !profile) {
            setLoading(true);
            getUserProfile(firestore, user.uid)
                .then(userProfile => {
                    setProfile(userProfile || { ...emptyProfile, id: user.uid, name: user.displayName || '', email: user.email || '' });
                })
                .catch(err => {
                    console.error(err);
                    setProfile({ ...emptyProfile, id: user.uid, name: user.displayName || '', email: user.email || '' });
                })
                .finally(() => setLoading(false));
        } else if (!user && !userLoading) {
            setProfile(null);
            setLoading(false);
        }
    }, [user, userLoading, firestore, profile]);


    const handleSave = async () => {
        if (!user || !profile) return;
        setLoading(true);
        try {
            await saveUserProfile(firestore, user.uid, profile);
        } catch (error) {
            console.error("Failed to save profile", error);
        } finally {
            setLoading(false);
        }
    }
    
    if (loading || userLoading || !profile) return <div className="p-6 flex justify-center"><ZLoader /></div>

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Public Profile</CardTitle>
                <CardDescription>This is how others will see you on the site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                     <Avatar className="w-20 h-20">
                        <AvatarImage src={profile.avatarUrl} />
                        <AvatarFallback>{profile.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                     <div className='space-y-2'>
                        <Label htmlFor="picture">Profile Picture</Label>
                        <Input id="picture" type="file" className="max-w-sm" />
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB.</p>
                     </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={profile.name} onChange={e => setProfile(p => p ? {...p, name: e.target.value} : null)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="jobseekerType">Role</Label>
                        <Input id="jobseekerType" disabled value={profile.role} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Short Bio</Label>
                    <Textarea id="bio" value={profile.about} onChange={e => setProfile(p => p ? {...p, about: e.target.value} : null)} />
                </div>
                 <div className="space-y-2">
                    <Label>Social Links</Label>
                    <div className="space-y-2">
                         <Input placeholder="GitHub Profile URL" value={profile.social?.github || ''} onChange={e => setProfile(p => p ? {...p, social: {...p.social, github: e.target.value}} : null)} />
                         <Input placeholder="Portfolio URL" value={profile.social?.portfolio || ''} onChange={e => setProfile(p => p ? {...p, social: {...p.social, portfolio: e.target.value}} : null)} />
                    </div>
                </div>
            </CardContent>
        </Card>
         <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
        </div>
    </div>
  );
}
