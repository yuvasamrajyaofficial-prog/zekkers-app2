import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';
import { poppins, ptSans } from '@/app/fonts';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata = {
  title: 'Zekkers: Smart Job Matching for Students & Employers',
  description: 'Zekkers connects students and employers with trusted opportunities across government, private, and international sectors. AI-powered job matching, verified employers, and seamless applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${ptSans.variable}`}>
      <body>
        <FirebaseClientProvider>
          <div className="min-h-screen text-slate-900">{children}</div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
