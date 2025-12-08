
'use client';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  FileText,
  Calendar,
  MessageSquare,
  Star,
  PlusCircle,
} from 'lucide-react';
import type { Candidate } from '@/types/candidate';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface CandidateProfileDrawerProps {
  candidate: Candidate | null;
  onClose: () => void;
}

export const CandidateProfileDrawer: React.FC<CandidateProfileDrawerProps> = ({
  candidate,
  onClose,
}) => {
  if (!candidate) return null;

  return (
    <Sheet open={!!candidate} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto">
        <SheetHeader className="flex-row items-start gap-4">
          <Image
            src={candidate.avatar || ''}
            alt={candidate.name}
            width={80}
            height={80}
            className="rounded-full border-4 border-white shadow-md"
          />
          <div>
            <SheetTitle className="text-2xl font-bold">
              {candidate.name}
            </SheetTitle>
            <SheetDescription className="text-base">
              Applicant for{' '}
              <span className="font-semibold text-primary">
                {candidate.jobAppliedFor}
              </span>
            </SheetDescription>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {candidate.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} /> {candidate.experienceYears} years exp.
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} /> {candidate.education}
              </span>
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Contact and Resume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Mail size={16} className="text-muted-foreground" />
              <span className="text-sm">{candidate.email}</span>
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Phone size={16} className="text-muted-foreground" />
              <span className="text-sm">{candidate.phone || 'Not provided'}</span>
            </div>
          </div>
          
           <div className="p-4 border rounded-lg bg-slate-50/50">
             <h3 className="font-semibold text-lg mb-2">Resume</h3>
             <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Candidate's primary resume.</p>
                <Button asChild variant="outline" size="sm">
                    <a href={candidate.resumeURL} target="_blank" rel="noopener noreferrer">
                        <FileText size={14} className="mr-2"/> View Resume
                    </a>
                </Button>
             </div>
          </div>

          {/* AI Analysis */}
          <div className="p-4 border rounded-lg bg-primary/5">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Sparkles className="text-primary" /> AI Analysis
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  AI Match Score
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {candidate.aiMatchScore}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Profile Strength
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {candidate.profileStrength}%
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <h4 className="font-semibold">Top Skills</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            {candidate.missingSkills && candidate.missingSkills.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-red-600">Missing Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {candidate.missingSkills.map((skill) => (
                    <Badge key={skill} variant="destructive">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ATS Timeline & Notes */}
          <div>
            <h3 className="font-semibold text-lg mb-2">ATS Timeline & Notes</h3>
            <div className="space-y-4">
                 {/* This would be dynamically generated */}
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Calendar size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                        <p className="font-semibold">Interview Scheduled</p>
                        <p className="text-sm text-muted-foreground">For: 5th August 2024, 2:00 PM</p>
                    </div>
                 </div>
                 <div className="pl-14">
                    <Textarea placeholder="Add an internal note..."/>
                    <Button size="sm" className="mt-2">Add Note</Button>
                 </div>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-col sm:flex-row sm:justify-start gap-2">
          <Button>Move to Next Stage</Button>
          <Button variant="outline">Assign Assessment</Button>
          <Button variant="destructive">Reject</Button>
          <Button variant="ghost">Message Candidate</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
