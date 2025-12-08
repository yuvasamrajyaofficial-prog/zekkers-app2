
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Employer } from '@/services/employers';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Globe, MapPin, Briefcase } from 'lucide-react';

export const EmployerCard: React.FC<{ emp: Employer; onView: (id: string) => void }> = ({ emp, onView }) => {
  return (
    <motion.div whileHover={{ y: -4 }} className="h-full">
      <Card className="flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow">
        <CardHeader className="flex-row items-start gap-4">
          <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-500 shrink-0">
            {emp.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{emp.name}</h3>
              {emp.verified && <CheckCircle className="w-5 h-5 text-blue-500" />}
            </div>
            <p className="text-sm text-muted-foreground">{emp.industry}</p>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <div className="flex-grow space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin size={14} /> {emp.country}</div>
            <div className="flex items-center gap-2"><Briefcase size={14} /> {emp.jobsCount ?? 0} active jobs</div>
            <div className="flex items-center gap-2"><Globe size={14} /> {emp.avgCtc ?? 'N/A'}</div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Badge variant={emp.trustScore && emp.trustScore > 85 ? 'default' : 'secondary'} className={emp.trustScore && emp.trustScore > 85 ? 'bg-green-100 text-green-700' : ''}>
              Trust Score: {emp.trustScore ?? 'N/A'}
            </Badge>
            <Button onClick={() => onView(emp.id)} size="sm">View Profile</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
