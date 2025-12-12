
'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import EmployerSidebar from './_components/employer-sidebar';
import Topbar from './_components/top-bar';
import AuthGuard from '@/components/auth-guard';

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['employer']}>
      <div className="light flex flex-col min-h-screen">
        <SidebarProvider>
          <EmployerSidebar />
          <SidebarInset>
            <Topbar dashboardName="Employer Dashboard" />
            <main className="flex-1 bg-white overflow-y-auto">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </AuthGuard>
  );
}
