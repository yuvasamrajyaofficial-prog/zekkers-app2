'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, IndianRupee, Globe, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const JobCard: React.FC<{ job: Job & { aiMatch?: number } }> = ({ job }) => {
    
    const salaryDisplay = () => {
        if (!job.salaryMin) {
            return "Not Disclosed";
        }
        
        const country = job.country?.toLowerCase() || 'india';
        const currency = job.currency?.toUpperCase() || (country === 'india' ? 'INR' : 'USD');
        
        try {
            if (country === 'india') {
                const minLPA = (job.salaryMin / 100000).toFixed(1);
                const maxLPA = job.salaryMax ? ` - ${(job.salaryMax / 100000).toFixed(1)}` : '';
                return `₹${minLPA}${maxLPA} LPA`;
            }
            
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            
            const formattedMin = formatter.format(job.salaryMin);
            if (job.salaryMax) {
                return `${formattedMin} - ${formatter.format(job.salaryMax)}`;
            }
            return formattedMin;

        } catch (e) {
             // Fallback for uncommon currencies
            return `${job.currency || '$'}${job.salaryMin.toLocaleString()}`;
        }
    }

  const scoreColor = job.aiMatch && job.aiMatch > 85 ? 'text-green-600' : job.aiMatch && job.aiMatch > 70 ? 'text-amber-500' : 'text-slate-500';


  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: 'var(--tw-shadow-card-hover)' }}
      className="bg-card p-4 rounded-xl border shadow-card transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xl text-slate-500 flex-shrink-0">
          {job.company.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-base">{job.title}</p>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
             <Badge variant="outline" className="capitalize">{job.category}</Badge>
          </div>
           <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><MapPin size={14}/> {job.location}</div>
                <div className="flex items-center gap-1.5"><Briefcase size={14}/> {job.type}</div>
                <div className="flex items-center gap-1.5">
                    {job.country && job.country.toLowerCase() !== "india" ? <Globe size={14} /> : <IndianRupee size={14} />}
                    {salaryDisplay()}
                </div>
            </div>
        </div>
      </div>
       <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button asChild size="sm" className="flex-1 sm:flex-none"><Link href={`/dashboard/jobs/${job.id}`}>View Details</Link></Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Save</Button>
            </div>
            {job.aiMatch && (
                <div className={`flex items-center gap-1 font-bold text-sm ${scoreColor} self-end sm:self-auto`}>
                    <Star size={16} />
                    <span>{job.aiMatch}% Match</span>
                </div>
            )}
       </div>
    </motion.div>
  );
};

export default JobCard;
