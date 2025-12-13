'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useFirestore, useStorage } from '@/firebase';
import {
  getUserProfile,
  saveUserProfile,
  uploadUserFile,
  type ProfileData,
} from '@/services/profile';
import ZLoader from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileAbout } from './_components/profile-about';
import { ProfileResume } from './_components/profile-resume';
import { ProfileSkills } from './_components/profile-skills';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { User } from 'firebase/auth';

import { useAuth } from '@/firebase/auth/use-user';

const emptyProfile: Omit<ProfileData, 'id' | 'email'> = {
  name: '',
  phone: '',
  location: '',
  about: '',
  role: 'Student/Job Seeker',
  resumeScore: 0,
  skills: [],
  education: [],
  experience: [],
  projects: [],
  languages: [],
  certifications: [],
  social: {
    github: '',
    portfolio: '',
  },
  avatarUrl: '',
  resumeUrl: '',
};

export default function ProfilePage() {
  const { user } = useAuth();
  const firestore = useFirestore();
  const storage = useStorage();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "users", user.uid);
  }, [user, firestore]);

  useEffect(() => {
    if (user && !profile) {
      setLoading(true);
      getUserProfile(firestore, user.uid)
        .then((userProfile) => {
          setProfile(
            userProfile || {
              ...emptyProfile,
              id: user.uid,
              name: user.displayName || '',
              email: user.email || '',
            }
          );
        })
        .catch((err) => {
          console.error(err);
          setProfile({
            ...emptyProfile,
            id: user.uid,
            name: user.displayName || '',
            email: user.email || '',
          });
        })
        .finally(() => setLoading(false));
    } else if (!user) {
      setProfile(null);
      setLoading(false);
    }
  }, [user, firestore, profile]);

  const saveCurrentProfile = async () => {
    if (!user || !profile) return;
    setSaving(true);
    try {
      await saveUserProfile(firestore, user.uid, profile);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert('Save failed. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile || !user || !storage || !firestore) return;
    try {
      const url = await uploadUserFile(storage, user.uid, avatarFile, 'avatar');
      const updatedProfile = { ...profile!, avatarUrl: url };
      setProfile(updatedProfile);
      saveUserProfile(firestore, user.uid, { avatarUrl: url }); // Non-blocking
      setAvatarFile(null);
    } catch (err) {
      console.error(err);
      alert('Avatar upload failed');
    }
  };

  const getDisplayDate = (timestamp: any) => {
    if (!timestamp) return 'Never';
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    const date = new Date(timestamp);
    if (!isNaN(date.getTime())) {
      return date.toLocaleString();
    }
    return 'Just now';
  };

  if (loading)
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <ZLoader />
      </div>
    );

  if (!user || !profile) return (
        <div className="p-6 text-center">
            <p>Could not load profile.</p>
        </div>
    );

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-sm text-slate-500">
            Edit your professional profile
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setEditMode((e) => !e)}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
          {editMode && (
            <Button onClick={saveCurrentProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32">
              <div className="w-32 h-32 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 text-xs text-center">
                    No Photo
                  </div>
                )}
              </div>

              {editMode && (
                <div className="mt-3">
                  <Input
                    type="file"
                    accept="image/*"
                    className="text-xs"
                    onChange={(e) =>
                      setAvatarFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  <div className="mt-2 flex gap-2">
                    <Button onClick={handleAvatarUpload} size="sm">
                      Upload
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1">
              <ProfileAbout
                profile={profile}
                setProfile={setProfile}
                editMode={editMode}
              />
              <ProfileResume
                profile={profile}
                setProfile={setProfile}
                editMode={editMode}
                user={user}
              />
              <ProfileSkills
                profile={profile}
                setProfile={setProfile}
                editMode={editMode}
              />
              <div className="mt-4 text-xs text-slate-400">
                Last updated: {getDisplayDate(profile.updatedAt)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
