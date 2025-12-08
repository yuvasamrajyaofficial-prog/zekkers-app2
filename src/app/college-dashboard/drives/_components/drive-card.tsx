'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  Building,
  Calendar,
  IndianRupee,
  Users,
  Eye,
  Edit,
} from 'lucide-react';
import type { Drive } from '@/services/drives';

interface DriveCardProps {
  drive: Drive;
}

const statusColors: { [key: string]: string } = {
  upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
  active: 'bg-green-100 text-green-700 border-green-200',
  completed: 'bg-slate-100 text-slate-600 border-slate-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export const DriveCard: React.FC<DriveCardProps> = ({ drive }) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: 'var(--tw-shadow-card-hover)' }}
      className="h-full"
    >
      <Card className="flex flex-col h-full shadow-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{drive.title}</CardTitle>
            <Badge
              variant="outline"
              className={`capitalize ${statusColors[drive.status || 'upcoming']}`}
            >
              {drive.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
            <Building className="w-4 h-4" />
            <span>{drive.company}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{drive.role}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <IndianRupee className="w-4 h-4" />
            <span>{drive.ctc}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {drive.date ? new Date(drive.date).toLocaleDateString() : 'TBD'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{drive.applicantsCount || 0} Applicants</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
