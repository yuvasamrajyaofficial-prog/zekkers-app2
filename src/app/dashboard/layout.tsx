
'use client';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './_components/app-sidebar';
import Topbar from './_components/top-bar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light flex flex-col h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Topbar />
          <main className="flex-1 bg-white overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
