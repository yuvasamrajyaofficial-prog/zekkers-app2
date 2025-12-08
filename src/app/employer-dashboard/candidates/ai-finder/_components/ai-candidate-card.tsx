'use client';
import { Candidate } from '@/types/candidate';
import React from 'react';

export interface AICandidateCardProps {
  candidate: Candidate;
  onViewProfile?: () => void;
}

export default function AICandidateCard({
  candidate,
  onViewProfile,
}: AICandidateCardProps) {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{candidate.name}</div>
          <div className="text-xs text-slate-500">
            {candidate.jobAppliedFor} • {candidate.location}
          </div>
        </div>
        <div className="text-sm text-slate-600">
          {candidate.aiMatchScore ?? 0}%
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 border rounded" onClick={onViewProfile}>
          View
        </button>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded">
          Invite
        </button>
      </div>
    </div>
  );
}
