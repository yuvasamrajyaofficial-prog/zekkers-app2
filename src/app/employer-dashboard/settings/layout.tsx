
'use client';

import React from 'react';
import SettingsSidebar from './_components/sidebar';

export default function EmployerSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 md:p-6">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
            <p className="text-slate-500 mt-1">Manage your account and preferences.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <aside className="lg:col-span-1">
                <SettingsSidebar />
            </aside>
            <main className="lg:col-span-3">
                {children}
            </main>
        </div>
    </div>
  );
}
