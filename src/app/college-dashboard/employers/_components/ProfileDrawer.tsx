
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Employer } from '@/services/employers';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Bell, Link as LinkIcon, Linkedin, Mail } from 'lucide-react';

export const ProfileDrawer: React.FC<{ emp?: Employer | null; onClose: () => void; onFollow: (id: string) => void }> = ({ emp, onClose, onFollow }) => {
  if (!emp) return null;

  return (
    <Sheet open={!!emp} onOpenChange={open => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-500 shrink-0">
              {emp.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
            </div>
            <div>
              <SheetTitle className="text-2xl flex items-center gap-2">
                {emp.name}
                {emp.verified && <CheckCircle className="w-6 h-6 text-blue-500" />}
              </SheetTitle>
              <SheetDescription>{emp.industry} • {emp.country}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
             <div className="p-4 bg-slate-50 rounded-lg border">
                <div className="text-xs text-muted-foreground">Trust Score</div>
                <div className="font-bold text-2xl text-green-600">{emp.trustScore}%</div>
             </div>
             <div className="p-4 bg-slate-50 rounded-lg border">
                <div className="text-xs text-muted-foreground">Active Jobs</div>
                <div className="font-bold text-2xl">{emp.jobsCount ?? 0}</div>
             </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Company Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><LinkIcon size={14} /> Website: <a href={emp.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">{emp.website}</a></div>
              <div className="flex items-center gap-2"><Linkedin size={14} /> LinkedIn: <a href={emp.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:underline">View Profile</a></div>
              <div className="flex items-center gap-2"><Mail size={14} /> HR Contact: {emp.hrEmail || 'Not listed'}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">AI Insights for You</h4>
            <div className="p-4 border rounded-lg bg-blue-50/50">
              <p className="text-sm text-blue-800">Personalized match scores and skill-gap analysis coming soon.</p>
            </div>
          </div>

        </div>

        <SheetFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => onFollow(emp.id)}><Bell className="w-4 h-4 mr-2"/> Follow</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
