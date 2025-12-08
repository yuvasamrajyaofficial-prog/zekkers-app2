
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
  Briefcase,
  MapPin,
  CheckSquare,
  MessageCircle,
  FileCheck,
} from 'lucide-react';
import { GlobalCandidate } from '@/types/global-candidate';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const visaStatusStyles: { [key in GlobalCandidate['visaStatus']]: string } = {
  'Visa-Ready': 'bg-green-100 text-green-700',
  'Needs Sponsorship': 'bg-amber-100 text-amber-700',
  'Work Permit': 'bg-blue-100 text-blue-700',
};

export const GlobalCandidateCard: React.FC<{ candidate: GlobalCandidate, onViewProfile: () => void }> = ({
  candidate,
  onViewProfile,
}) => {
  const scoreColor =
    candidate.aiMatch > 85
      ? 'text-green-600'
      : candidate.aiMatch > 70
      ? 'text-amber-600'
      : 'text-slate-500';

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, boxShadow: 'var(--tw-shadow-lg)' }}
      onClick={onViewProfile}
      className="cursor-pointer"
    >
      <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex-row items-start gap-4">
          <Image
            src={candidate.avatar}
            alt={candidate.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1">
            <CardTitle className="text-lg">{candidate.name}</CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} /> {candidate.country}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={12} /> {candidate.experience} years
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <div>
            <div
              className={`flex items-center gap-2 font-bold mb-3 ${scoreColor}`}
            >
              <Sparkles size={18} />
              <span className="text-2xl">{candidate.aiMatch}%</span>
              <span className="text-sm font-semibold">AI Fit Score</span>
            </div>
             <div className="flex items-center gap-2 mb-3">
                <Badge className={visaStatusStyles[candidate.visaStatus]}>{candidate.visaStatus}</Badge>
                <Badge variant="outline">{candidate.englishProficiency} English</Badge>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                Top Skills
              </h4>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex flex-wrap items-center justify-end gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle size={14} /> Message
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <CheckSquare size={14} /> Shortlist
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
