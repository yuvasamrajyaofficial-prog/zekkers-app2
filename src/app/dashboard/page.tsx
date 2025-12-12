
'use client';
import React from 'react';
import ChatWindow from './_components/ChatWindow';

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50/50 min-h-full">
      <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] min-h-[500px]">
        <ChatWindow />
      </div>
    </div>
  );
}
