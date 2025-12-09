
'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import GlobalSidebar from './_components/global-sidebar';
import Topbar from './_components/top-bar';
import { Toaster } from '@/components/ui/toaster';

export default function GlobalEmployersDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light flex flex-col min-h-screen">
      <SidebarProvider>
        <GlobalSidebar />
        <SidebarInset>
          <Topbar dashboardName="Global Employers Dashboard" />
          <main className="flex-1 bg-white overflow-y-auto">
            {children}
          </main>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
