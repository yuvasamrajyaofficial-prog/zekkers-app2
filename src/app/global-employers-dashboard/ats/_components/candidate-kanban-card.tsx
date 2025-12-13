'use client';
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Sparkles, Briefcase, MapPin, MoreVertical, FileCheck } from 'lucide-react';
import { AtsCandidate } from '@/types/ats';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface CandidateKanbanCardProps {
  candidate: AtsCandidate;
  isOverlay?: boolean;
}

export const CandidateKanbanCard: React.FC<CandidateKanbanCardProps> = ({
  candidate,
  isOverlay,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: candidate.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const scoreColor =
    candidate.aiMatchScore > 85
      ? 'text-green-600'
      : candidate.aiMatchScore > 70
      ? 'text-amber-600'
      : 'text-slate-500';

const visaStatusStyles: { [key: string]: string } = {
  'Visa-Ready': 'bg-green-100 text-green-700',
  'Needs Sponsorship': 'bg-amber-100 text-amber-700',
  'Work Permit': 'bg-blue-100 text-blue-700',
};


  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 bg-white rounded-lg border shadow-sm cursor-grab active:cursor-grabbing ${isOverlay ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Image
            src={candidate.avatar || ''}
            alt={candidate.name}
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{candidate.name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Briefcase size={12} /> {candidate.experienceYears} yrs
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {candidate.location}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-7 h-7">
              <MoreVertical size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Add Note</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3 pt-3 border-t flex items-center justify-between">
         <div className="flex flex-wrap gap-1">
          {candidate.visaStatus && <Badge className={visaStatusStyles[candidate.visaStatus] || 'bg-slate-100'}>{candidate.visaStatus}</Badge>}
        </div>
        <div className={`flex items-center gap-1 font-bold text-sm ${scoreColor}`}>
          <Sparkles size={14} />
          <span>{candidate.aiMatchScore}%</span>
        </div>
      </div>
    </div>
  );
};
