
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Sparkles,
  FileText,
  Briefcase,
  MapPin,
  MoreVertical,
  Calendar,
  User,
  Trash2,
  CheckSquare
} from 'lucide-react';
import type { Candidate } from '@/types/candidate';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SavedCandidateCardProps {
  candidate: Candidate;
  onViewProfile: (candidate: Candidate) => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const SavedCandidateCard: React.FC<SavedCandidateCardProps> = ({
  candidate,
  onViewProfile,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, boxShadow: 'var(--tw-shadow-lg)' }}
    >
      <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex-row items-start gap-4">
          {candidate.avatar && <Image
            src={candidate.avatar}
            alt={candidate.name}
            width={48}
            height={48}
            className="rounded-full"
          />}
          <div className="flex-1">
            <CardTitle className="text-lg">{candidate.name}</CardTitle>
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
                View Full Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Add Note</DropdownMenuItem>
              <DropdownMenuItem>Assign Assessment</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Remove from Saved
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                    <div className="text-xs text-muted-foreground">AI Match</div>
                    <div className="font-bold text-green-600 flex items-center gap-1"><Sparkles size={16}/>{candidate.aiMatchScore}%</div>
                </div>
                 <div>
                    <div className="text-xs text-muted-foreground">Profile Strength</div>
                    <div className="font-bold text-blue-600">{candidate.profileStrength}%</div>
                </div>
            </div>
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
                </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
             <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                <span className="flex items-center gap-1"><User size={12}/>Saved by {candidate.savedBy}</span>
                <span className="flex items-center gap-1"><Calendar size={12}/>{new Date(candidate.savedAt || '').toLocaleDateString()}</span>
             </div>
            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-2"><CheckSquare size={14}/> Shortlist</Button>
                <Button size="sm" onClick={() => onViewProfile(candidate)}>View Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
