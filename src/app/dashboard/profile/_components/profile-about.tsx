'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProfileData } from '@/services/profile';
import { User } from 'firebase/auth';

interface ProfileAboutProps {
    profile: ProfileData;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
    editMode: boolean;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({ profile, setProfile, editMode }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-xs text-slate-500">Full name</label>
        {editMode ? (
          <Input
            className="mt-1"
            value={profile.name}
            onChange={(e) => setProfile((p) => (p ? { ...p, name: e.target.value } : null))}
          />
        ) : (
          <div className="mt-1 font-semibold">{profile.name || '—'}</div>
        )}
      </div>

      <div>
        <label className="text-xs text-slate-500">Email</label>
        <div className="mt-1">{profile.email || '—'}</div>
      </div>

      <div>
        <label className="text-xs text-slate-500">Location</label>
        {editMode ? (
          <Input
            className="mt-1"
            value={profile.location}
            onChange={(e) =>
              setProfile((p) => (p ? { ...p, location: e.target.value } : null))
            }
          />
        ) : (
          <div className="mt-1">{profile.location || '—'}</div>
        )}
      </div>

      <div>
        <label className="text-xs text-slate-500">Phone</label>
        {editMode ? (
          <Input
            className="mt-1"
            value={profile.phone}
            onChange={(e) =>
              setProfile((p) => (p ? { ...p, phone: e.target.value } : null))
            }
          />
        ) : (
          <div className="mt-1">{profile.phone || '—'}</div>
        )}
      </div>
    </div>
    <div className="mt-4">
      <label className="text-xs text-slate-500">About</label>
      {editMode ? (
        <Textarea
          className="mt-1 h-24"
          value={profile.about}
          onChange={(e) =>
            setProfile((p) => (p ? { ...p, about: e.target.value } : null))
          }
        />
      ) : (
        <div className="mt-1 text-sm text-slate-600 min-h-[6rem]">
          {profile.about || '—'}
        </div>
      )}
    </div>
  </>
);
