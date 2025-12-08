
'use client';

import React from 'react';
import SettingsSidebar from './_components/sidebar';

export default function NgoSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 md:p-6">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
            <p className="text-slate-500 mt-1">Manage your organization's account, workflows, and integrations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <aside className="md:col-span-1">
                <SettingsSidebar />
            </aside>
            <main className="md:col-span-3">
                {children}
            </main>
        </div>
    </div>
  );
}
