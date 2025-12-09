
'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import CollegeSidebar from './_components/college-sidebar';
import Topbar from '../employer-dashboard/_components/top-bar';

export default function CollegeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="light flex flex-col min-h-screen">
      <SidebarProvider>
        <CollegeSidebar />
        <SidebarInset>
          <Topbar dashboardName="College Dashboard" />
          <main className="flex-1 bg-white overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
