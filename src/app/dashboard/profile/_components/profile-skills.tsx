'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProfileData } from '@/services/profile';

interface ProfileSkillsProps {
    profile: ProfileData;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
    editMode: boolean;
}


export const ProfileSkills: React.FC<ProfileSkillsProps> = ({ profile, setProfile, editMode }) => {
  const addSkill = () =>
    profile &&
    setProfile((p: ProfileData | null) => ({
      ...p!,
      skills: [...(p!.skills || []), { name: '', level: 50 }],
    }));
  const updateSkill = (i: number, key: 'name' | 'level', val: any) =>
    profile &&
    setProfile((p: ProfileData | null) => {
      const skills = [...(p!.skills || [])];
      skills[i] = { ...skills[i], [key]: val };
      return { ...p!, skills };
    });
  const removeSkill = (i: number) =>
    profile &&
    setProfile((p: ProfileData | null) => ({
      ...p!,
      skills: (p!.skills || []).filter((_: any, idx: number) => idx !== i),
    }));

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Skills</div>
        {editMode && (
          <Button onClick={addSkill} size="sm" variant="outline">
            Add Skill
          </Button>
        )}
      </div>

      <div className="mt-2 space-y-3">
        {(profile.skills || []).map((s: any, idx: number) => (
          <div key={idx} className="flex items-center gap-3">
            {editMode ? (
              <>
                <Input
                  value={s.name}
                  onChange={(e) => updateSkill(idx, 'name', e.target.value)}
                  placeholder="Skill name"
                  className="flex-1"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={s.level}
                  onChange={(e) => updateSkill(idx, 'level', Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-xs w-8 text-center">{s.level}%</span>
                <Button
                  onClick={() => removeSkill(idx)}
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                >
                  Remove
                </Button>
              </>
            ) : (
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <div>{s.name}</div>
                  <div className="text-xs text-slate-400">{s.level}%</div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        {(!profile.skills || profile.skills.length === 0) && !editMode && (
            <p className="text-sm text-slate-500">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};
