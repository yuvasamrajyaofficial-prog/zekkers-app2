'use client';
import React from 'react';

interface CandidateProfileDrawerProps {
  open?: boolean;
  onClose?: () => void;
  candidateName?: string;
}

export default function CandidateProfileDrawer({
  open = false,
  onClose,
  candidateName,
}: CandidateProfileDrawerProps) {
  if (!open) return null;
  return (
    <aside className="fixed right-6 top-16 bottom-6 w-full max-w-xl bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-auto z-50">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{candidateName ?? 'Candidate'}</h3>
          <button className="px-3 py-1 border rounded" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-4 text-sm text-slate-600">
          Candidate details go here — resume, skills, scores, actions.
        </div>
      </div>
    </aside>
  );
}
