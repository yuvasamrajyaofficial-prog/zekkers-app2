
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  Briefcase,
  MapPin,
  IndianRupee,
  Star,
  Clock,
  Trash2,
  FilePenLine,
  Globe,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mockSavedJobs = [
  {
    id: 'priv-1',
    title: 'Frontend Engineer',
    company: 'ZekkTech',
    logo: PlaceHolderImages.find(p => p.id === 'logo')!.imageUrl,
    location: 'Bengaluru',
    country: 'India',
    salary: '₹6-12 LPA',
    category: 'Private',
    aiMatch: 92,
    deadline: new Date(Date.now() + 5 * 24 * 3600 * 1000), // 5 days from now
    priority: 'High Priority',
  },
  {
    id: 'intl-1',
    title: 'Fullstack Developer',
    company: 'GlobalSoft Inc',
    logo: PlaceHolderImages.find(p => p.id === 'company1')!.imageUrl,
    location: 'Berlin',
    country: 'Germany',
    salary: '€70k-€90k',
    category: 'International',
    aiMatch: 85,
    deadline: new Date(Date.now() + 14 * 24 * 3600 * 1000),
    priority: 'Good Match',
  },
  {
    id: 'gov-1',
    title: 'Revenue Department Clerk',
    company: 'Government of India',
    logo: PlaceHolderImages.find(p => p.id === 'company2')!.imageUrl,
    location: 'Delhi',
    country: 'India',
    salary: 'Level 4 Pay Scale',
    category: 'Government',
    aiMatch: 78,
    deadline: new Date(Date.now() + 2 * 24 * 3600 * 1000), // 2 days from now
    priority: 'Apply Soon',
  },
  {
    id: 'priv-2',
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    logo: PlaceHolderImages.find(p => p.id === 'company3')!.imageUrl,
    location: 'Remote',
    country: 'India',
    salary: '₹8-14 LPA',
    category: 'Private',
    aiMatch: 88,
    deadline: new Date(Date.now() + 25 * 24 * 3600 * 1000),
    priority: 'Good Match',
  },
    {
    id: 'intl-2',
    title: 'DevOps Engineer',
    company: 'CloudNine',
    logo: PlaceHolderImages.find(p => p.id === 'company4')!.imageUrl,
    location: 'New York',
    country: 'USA',
    salary: '$90k-$120k',
    category: 'International',
    aiMatch: 75,
    deadline: new Date(Date.now() + 30 * 24 * 3600 * 1000),
    priority: 'Just Saved',
  },
];

const priorityStyles: { [key: string]: string } = {
  'High Priority': 'text-red-500 bg-red-500/10 border-red-500/20',
  'Apply Soon': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  'Good Match': 'text-green-500 bg-green-500/10 border-green-500/20',
  'Just Saved': 'text-slate-500 bg-slate-500/10 border-slate-500/20',
};

const getDaysLeft = (deadline: Date) => {
    const diff = deadline.getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} day${days > 1 ? 's' : ''} left`;
}

const SavedJobCard = ({ job }: { job: (typeof mockSavedJobs)[0] }) => {
    const daysLeft = getDaysLeft(job.deadline);
    const isExpired = daysLeft === 'Expired';
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3, boxShadow: 'var(--tw-shadow-card-hover)' }}
            className="bg-white p-4 rounded-xl border hover:shadow-lg transition-all flex flex-col"
        >
            <div className="flex items-start gap-4">
                <Image src={job.logo} alt={`${job.company} logo`} width={40} height={40} className="rounded-lg" />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-slate-800">{job.title}</h3>
                            <p className="text-sm text-slate-500">{job.company}</p>
                        </div>
                        <Badge variant="secondary" className="capitalize">{job.category}</Badge>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5"><MapPin size={14}/> {job.location}, {job.country}</div>
                        <div className="flex items-center gap-1.5">
                            {job.country.toLowerCase() === "india" ? <IndianRupee size={14} /> : <Globe size={14} />}
                            {job.salary}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-end">
                <div>
                     <div className={`text-xs font-bold flex items-center gap-1.5 ${priorityStyles[job.priority] || ''} px-2 py-1 rounded-full`}>
                        <Star size={14} />
                        {job.priority}
                    </div>
                    <div className={`mt-2 text-sm font-semibold flex items-center gap-1.5 ${isExpired ? 'text-red-500' : 'text-slate-600'}`}>
                        <Clock size={14}/>
                        {daysLeft}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8"><FilePenLine className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-red-500/80 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    <Button size="sm" disabled={isExpired}>Apply Now</Button>
                </div>
            </div>

        </motion.div>
    )
}

export default function SavedJobsPage() {
    const filterJobs = (category: string) => {
        if (category === 'All') return mockSavedJobs;
        return mockSavedJobs.filter(j => j.category === category);
    };
  
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Heart className="text-primary" />
            Saved Jobs
          </CardTitle>
          <CardDescription>
            Your personal job wishlist. Track, compare, and apply to roles you're interested in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="All">
            <div className="w-full overflow-x-auto pb-2 no-scrollbar">
                <TabsList>
                <TabsTrigger value="All">All Saved</TabsTrigger>
                <TabsTrigger value="Government">Government</TabsTrigger>
                <TabsTrigger value="Private">Private</TabsTrigger>
                <TabsTrigger value="International">International</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="All" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterJobs('All').map(job => <SavedJobCard key={job.id} job={job} />)}
                </div>
            </TabsContent>
             <TabsContent value="Government" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterJobs('Government').map(job => <SavedJobCard key={job.id} job={job} />)}
                </div>
            </TabsContent>
            <TabsContent value="Private" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterJobs('Private').map(job => <SavedJobCard key={job.id} job={job} />)}
                </div>
            </TabsContent>
            <TabsContent value="International" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterJobs('International').map(job => <SavedJobCard key={job.id} job={job} />)}
                </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
