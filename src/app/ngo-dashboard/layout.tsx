
'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import NgoSidebar from './_components/ngo-sidebar';
import Topbar from './_components/top-bar';

export default function NgoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="light flex flex-col h-screen">
      <SidebarProvider>
        <NgoSidebar />
        <SidebarInset>
          <Topbar dashboardName="NGO Dashboard" />
          <main className="flex-1 bg-white overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
