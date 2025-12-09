
'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from './_components/admin-sidebar';
import Topbar from './_components/top-bar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light flex flex-col min-h-screen">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <Topbar dashboardName="Admin Dashboard" />
          <main className="flex-1 bg-white overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
