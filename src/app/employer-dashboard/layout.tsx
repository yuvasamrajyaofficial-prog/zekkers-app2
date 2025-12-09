
'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import EmployerSidebar from './_components/employer-sidebar';
import Topbar from './_components/top-bar';

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light flex flex-col h-screen">
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
  );
}
