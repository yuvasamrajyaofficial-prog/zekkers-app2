'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  PlusCircle,
  Search,
  Users,
  Calendar,
  Building,
  DollarSign,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Drive, DriveStatus } from '@/services/drives';

// --- Types ---
type DriveType = 'on-campus' | 'off-campus' | 'virtual' | 'pool';

// --- Mock Data ---
const mockDrives: Drive[] = [
  { id: 'd-1', title: 'ZekkTech Campus Drive 2025', company: 'ZekkTech', role: 'Software Engineer', ctc: '8-12 LPA', date: '2025-08-15', driveType: 'on-campus', status: 'upcoming', applicantsCount: 0 },
  { id: 'd-2', title: 'DataWave Analyst Hiring', company: 'DataWave', role: 'Data Analyst', ctc: '6-9 LPA', date: '2025-07-20', driveType: 'virtual', status: 'active', applicantsCount: 85 },
  { id: 'd-3', title: 'GlobalSoft Grad Program', company: 'GlobalSoft Inc.', role: 'Graduate Engineer Trainee', ctc: '15-20 LPA', date: '2024-06-10', driveType: 'pool', status: 'completed', applicantsCount: 250 },
];

const mockJobPool = [
  { id: 'j-1', title: 'Junior Frontend Developer', company: 'TechStart', location: 'Bangalore (Hybrid)', type: 'Full-time', salary: '4-6 LPA', posted: '2 days ago' },
  { id: 'j-2', title: 'Digital Marketing Intern', company: 'GrowthX', location: 'Remote', type: 'Internship', salary: '15k/month', posted: '1 week ago' },
  { id: 'j-3', title: 'Customer Support Executive', company: 'ServiceFirst', location: 'Mumbai', type: 'Full-time', salary: '3-4 LPA', posted: '3 days ago' },
  { id: 'j-4', title: 'Content Writer', company: 'CreativeHub', location: 'Remote', type: 'Contract', salary: '20k/month', posted: 'Just now' },
];

const kpiData = [
  { title: 'Active Drives', value: '3' },
  { title: 'Total Placements', value: '480' },
  { title: 'Avg. Package', value: '₹5.2 LPA' },
  { title: 'Hiring Partners', value: '25' },
];

const statusColors: { [key in DriveStatus]: string } = {
  upcoming: 'bg-blue-100 text-blue-700',
  active: 'bg-green-100 text-green-700',
  completed: 'bg-slate-100 text-slate-600',
  cancelled: 'bg-red-100 text-red-700',
};


// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- Sub-Components ---
const KpiCard = ({ title, value }: { title: string, value: string }) => (
    <motion.div variants={itemVariants}>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    </motion.div>
);

const DriveCard = ({ drive }: { drive: Drive }) => (
    <motion.div variants={itemVariants} whileHover={{y: -3}} className="h-full">
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{drive.title}</CardTitle>
                    <Badge className={statusColors[drive.status || 'upcoming']}>{drive.status}</Badge>
                </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                    <Building size={14}/> <span>{drive.company}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
                 <div className="flex items-center gap-2 text-sm"><Briefcase size={14} className="text-muted-foreground"/> {drive.role}</div>
                 <div className="flex items-center gap-2 text-sm"><DollarSign size={14} className="text-muted-foreground"/> {drive.ctc}</div>
                 <div className="flex items-center gap-2 text-sm"><Calendar size={14} className="text-muted-foreground"/> {drive.date ? new Date(drive.date).toLocaleDateString() : 'TBD'}</div>
            </CardContent>
            <div className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={14}/>
                    <span>{drive.applicantsCount} Applicants</span>
                </div>
                <Button size="sm">View Drive</Button>
            </div>
        </Card>
    </motion.div>
);

const JobPoolCard = ({ job }: { job: any }) => (
    <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                {job.company.charAt(0)}
            </div>
            <div>
                <h3 className="font-semibold text-base">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {job.posted}</span>
            <Button size="sm" variant="outline" className="h-8">Apply <ExternalLink size={12} className="ml-1"/></Button>
        </div>
    </motion.div>
);


// --- Main Component ---
export default function PlacementsPage() {
  const [drives, setDrives] = useState(mockDrives);
  
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Briefcase className="text-primary"/> Placements & Job Pool
              </CardTitle>
              <CardDescription>
                Manage placement drives, track job opportunities, and connect beneficiaries with employers.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline"><PlusCircle size={16} className="mr-2"/> Post a Job</Button>
                <Button><PlusCircle size={16} className="mr-2"/> Create Drive</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {kpiData.map(kpi => <KpiCard key={kpi.title} title={kpi.title} value={kpi.value}/>)}
            </motion.div>
          
            <Tabs defaultValue="drives" className="w-full">
                <TabsList>
                    <TabsTrigger value="drives">Placement Drives</TabsTrigger>
                    <TabsTrigger value="job-pool">Job Pool</TabsTrigger>
                </TabsList>
                
                <TabsContent value="drives" className="mt-6">
                    <div className="p-4 mb-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search drives by name, company, role..." className="pl-10"/>
                        </div>
                        <Select>
                            <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="All Statuses"/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {drives.map(drive => <DriveCard key={drive.id} drive={drive} />)}
                    </motion.div>
                </TabsContent>

                <TabsContent value="job-pool" className="mt-6">
                    <div className="p-4 mb-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search job pool..." className="pl-10"/>
                        </div>
                        <Button variant="outline">Filter</Button>
                    </div>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        {mockJobPool.map(job => <JobPoolCard key={job.id} job={job} />)}
                    </motion.div>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
