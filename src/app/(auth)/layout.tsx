import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Branding & Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative flex-col justify-between p-12 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-slate-900/50 to-slate-950 z-0" />
        
        {/* Content */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold shadow-lg shadow-orange-500/20">
              ZK
            </div>
            Zekkers
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Unlock Your <span className="text-yellow-400">Potential</span> with Zekkers
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Join thousands of students and employers connecting on the most advanced job matching platform. AI-driven insights, verified opportunities, and a seamless experience await.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-slate-500">
          <p>© 2025 Zekkers Inc.</p>
          <div className="h-1 w-1 rounded-full bg-slate-700" />
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <div className="h-1 w-1 rounded-full bg-slate-700" />
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col bg-white relative">
        {/* Mobile Header (Visible only on mobile) */}
        <div className="lg:hidden p-6 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold">
              ZK
            </div>
            Zekkers
          </Link>
        </div>

        {/* Back Button (Desktop) */}
        <div className="absolute top-8 right-8 hidden lg:block">
           <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Back to website
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[400px] space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
