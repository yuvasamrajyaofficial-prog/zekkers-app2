'use client';
import React from 'react';

interface Props {
  initialData: any;
  studentId?: string;
}

export default function StudentAnalyticsClient({
  initialData,
  studentId,
}: Props) {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border">
      <h4 className="font-semibold">Student Analytics</h4>
      <p className="text-sm text-slate-500 mt-2">
        Student ID: <strong>{studentId ?? 'N/A'}</strong>
      </p>
      <div className="mt-3 text-sm text-slate-600">
        Minimal analytics UI placeholder. Replace with charts and data fetch
        code.
      </div>
    </div>
  );
}
