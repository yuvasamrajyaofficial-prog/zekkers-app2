'use client';

import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from './_components/admin-sidebar';
import Topbar from '@/app/dashboard/_components/top-bar'; // Reusing Topbar for now or create admin specific
import AuthGuard from '@/components/auth-guard';
import { Toaster } from '@/components/ui/toaster';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <div className="theme-admin flex flex-col min-h-screen bg-background">
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <Topbar />
            <main className="flex-1 bg-white overflow-y-auto p-6">
              {children}
            </main>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </AuthGuard>
  );
}
