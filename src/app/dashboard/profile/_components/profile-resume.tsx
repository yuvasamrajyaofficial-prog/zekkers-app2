
'use client';

import React, { useState, useEffect } from 'react';
import { useStorage, useFirestore } from '@/firebase';
import { uploadUserFile, ProfileData } from '@/services/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { User } from 'firebase/auth';

interface ProfileResumeProps {
    profile: ProfileData;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
    editMode: boolean;
    user: User | null;
}


export const ProfileResume: React.FC<ProfileResumeProps> = ({ profile, setProfile, editMode, user }) => {
  const storage = useStorage();
  const firestore = useFirestore();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  
  useEffect(() => {
    let isMounted = true;

    const handleResumeUpload = async () => {
      if (!resumeFile || !user || !firestore) return;
      if (isMounted) setAnalysisLoading(true);
      try {
        const url = await uploadUserFile(storage, user.uid, resumeFile, 'resumes');
        
        if (isMounted) {
          setProfile((p) => p ? { ...p, resumeUrl: url } : null);
          const userDocRef = doc(firestore, 'users', user.uid);
          updateDocumentNonBlocking(userDocRef, { resumeUrl: url });
        }

      } catch (err) {
        console.error(err);
        alert('Resume upload failed');
      } finally {
        if (isMounted) {
          setAnalysisLoading(false);
        }
      }
    };

    if (resumeFile) {
        handleResumeUpload();
    }

    return () => {
        isMounted = false;
    }
  }, [resumeFile, user, firestore, storage, setProfile]);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Resume</div>
        <div className="text-xs text-slate-400">
          Score: {profile.resumeScore || 0}%
        </div>
      </div>
      {profile.resumeUrl ? (
        <div className="mt-2 flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            View Resume
          </a>
        </div>
      ) : (
        <div className="mt-2 text-sm text-slate-500">No resume uploaded</div>
      )}
      {editMode && (
        <div className="mt-2">
          <Input
            type="file"
            accept="application/pdf"
            className="text-xs"
            onChange={(e) =>
              setResumeFile(e.target.files ? e.target.files[0] : null)
            }
          />
          <div className="mt-2 flex gap-2">
            <Button size="sm" disabled={analysisLoading}>
              {analysisLoading ? 'Analyzing...' : 'Upload & Analyze'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
