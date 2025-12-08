
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
} from 'lucide-react';
import type { Candidate } from '@/types/candidate';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onViewProfile: (candidate: Candidate) => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const statusColors: { [key: string]: string } = {
  Applied: 'bg-slate-100 text-slate-600',
  Screening: 'bg-blue-100 text-blue-600',
  Interview: 'bg-purple-100 text-purple-600',
};

export const CandidateCard: React.FC<CandidateCardProps> = ({
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
          <Image
            src={candidate.avatar || ''}
            alt={candidate.name}
            width={48}
            height={48}
            className="rounded-full"
          />
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
              <DropdownMenuItem>Shortlist</DropdownMenuItem>
              <DropdownMenuItem>Assign Assessment</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2">
              Top Skills
            </h4>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 4 && (
                <Badge variant="outline">+{candidate.skills.length - 4}</Badge>
              )}
            </div>
             {candidate.missingSkills && candidate.missingSkills.length > 0 && (
                <div className="mt-2">
                    <h4 className="text-xs font-semibold text-red-500 mb-1">Missing Skills</h4>
                    <div className="flex flex-wrap gap-1">
                        {candidate.missingSkills.map(skill => (
                            <Badge key={skill} variant="destructive">{skill}</Badge>
                        ))}
                    </div>
                </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  className={`${statusColors[candidate.status] || 'bg-slate-100 text-slate-600'}`}
                >
                  {candidate.status}
                </Badge>
                <a
                  href={candidate.resumeURL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <FileText size={14} /> View Resume
                </a>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-green-600 font-bold">
                <Sparkles size={16} />
                <span>{candidate.aiMatchScore}% AI Match</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
