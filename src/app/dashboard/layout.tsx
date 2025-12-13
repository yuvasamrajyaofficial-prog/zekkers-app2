
'use client';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './_components/app-sidebar';
import Topbar from './_components/top-bar';
import AuthGuard from '@/components/auth-guard';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['student']}>
      <div className="light flex flex-col min-h-screen bg-background">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Topbar />
            <div className="flex-1 bg-white overflow-y-auto">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </AuthGuard>
  );
}
