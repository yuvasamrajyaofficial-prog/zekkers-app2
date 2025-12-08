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
import Image from 'next/image';
import {
  ShieldCheck,
  MapPin,
  Users,
  Briefcase,
  Star,
} from 'lucide-react';
import type { Partner } from '@/services/partners';

interface PartnerCardProps {
  partner: Partner;
  onViewProfile: (partner: Partner) => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const partnershipStatusColors: { [key: string]: string } = {
    'Connected': 'bg-green-100 text-green-700',
    'Pending': 'bg-amber-100 text-amber-700',
    'Not Connected': 'bg-slate-100 text-slate-600',
};

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onViewProfile }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, boxShadow: 'var(--tw-shadow-lg)' }}
      className="h-full"
    >
      <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex-row items-start gap-4">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            width={48}
            height={48}
            className="rounded-lg border bg-white"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{partner.name}</CardTitle>
                {partner.kycStatus === 'verified' && <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0"/>}
            </div>
            <CardDescription>{partner.type}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14}/> {partner.location}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5"><Users size={14}/> {partner.studentCount.toLocaleString()} Students</div>
                    <div className="flex items-center gap-1.5"><Briefcase size={14}/> {partner.placementRate}% Placed</div>
                    <div className="flex items-center gap-1.5 col-span-2"><Star size={14}/> {partner.avgPackage} LPA Avg.</div>
                </div>
                <div className="mt-3">
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1">Top Programs</h4>
                    <div className="flex flex-wrap gap-1">
                        {partner.topPrograms?.slice(0,3).map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                    </div>
                </div>
            </div>
             <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <Badge className={partnershipStatusColors[partner.partnershipStatus]}>{partner.partnershipStatus}</Badge>
                <Button size="sm" onClick={() => onViewProfile(partner)}>View Profile</Button>
            </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
