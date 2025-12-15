
'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import GlobalSidebar from './_components/global-sidebar';
import Topbar from './_components/top-bar';
import AuthGuard from '@/components/auth-guard';
import { Toaster } from '@/components/ui/toaster';

export default function GlobalEmployersDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['global_employer']}>
      <div className="theme-employer flex flex-col min-h-screen bg-background">
        <SidebarProvider>
          <GlobalSidebar />
          <SidebarInset>
            <Topbar dashboardName="Recruiter Dashboard" />
            <main className="flex-1 bg-white overflow-y-auto">
              {children}
            </main>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </AuthGuard>
  );
}
