
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import {
  Sparkles,
  FileText,
  Briefcase,
  MapPin,
  MoreVertical,
  Calendar,
  ClipboardCheck,
} from 'lucide-react';
import type { Candidate } from '@/types/candidate';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface ShortlistedCandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onViewProfile: (candidate: Candidate) => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const assessmentStatusColors: { [key: string]: string } = {
    'Passed': 'text-green-600 bg-green-100',
    'Completed': 'text-blue-600 bg-blue-100',
    'Pending': 'text-amber-600 bg-amber-100',
    'Failed': 'text-red-600 bg-red-100'
};

const interviewStatusColors: { [key: string]: string } = {
    'Scheduled': 'text-purple-600 bg-purple-100',
    'Completed': 'text-green-600 bg-green-100',
    'Not Scheduled': 'text-slate-600 bg-slate-100',
};


export const ShortlistedCandidateCard: React.FC<ShortlistedCandidateCardProps> = ({
  candidate,
  isSelected,
  onSelect,
  onViewProfile,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, boxShadow: 'var(--tw-shadow-lg)' }}
    >
      <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex-row items-start gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(candidate.id)}
            className="mt-1"
          />
          {candidate.avatar && <Image
            src={candidate.avatar}
            alt={candidate.name}
            width={48}
            height={48}
            className="rounded-full"
          />}
          <div className="flex-1">
            <CardTitle className="text-lg">{candidate.name}</CardTitle>
            <CardDescription>{candidate.jobAppliedFor}</CardDescription>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} /> {candidate.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={12} /> {candidate.experienceYears} years
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onViewProfile(candidate)}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Move to Interview</DropdownMenuItem>
              <DropdownMenuItem>Assign Assessment</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                    <Label className="text-xs text-muted-foreground">AI Match</Label>
                    <div className="flex items-center gap-2 font-bold text-green-600">
                        <Sparkles size={16}/> {candidate.aiMatchScore}%
                    </div>
                </div>
                <div>
                    <Label className="text-xs text-muted-foreground">Profile Strength</Label>
                    <div className="font-bold text-blue-600">{candidate.profileStrength}%</div>
                    <Progress value={candidate.profileStrength} className="h-1 mt-1" />
                </div>
            </div>
             <Separator className="my-3" />
             <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                    <Label className="text-xs text-muted-foreground">Assessment</Label>
                    <Badge className={`gap-2 ${assessmentStatusColors[candidate.assessmentStatus || 'Pending']}`}>
                        <ClipboardCheck size={14} /> {candidate.assessmentStatus}
                        {candidate.assessmentScore && ` (${candidate.assessmentScore}%)`}
                    </Badge>
                </div>
                 <div>
                    <Label className="text-xs text-muted-foreground">Interview</Label>
                    <Badge className={`gap-2 ${interviewStatusColors[candidate.interviewStatus || 'Not Scheduled']}`}>
                        <Calendar size={14} /> {candidate.interviewStatus}
                    </Badge>
                </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex items-center justify-end">
            <Button onClick={() => onViewProfile(candidate)}>
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
