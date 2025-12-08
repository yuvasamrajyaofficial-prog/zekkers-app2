'use client';
import React, { useState, useMemo } from 'react';
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
  TrendingUp,
  CheckCircle,
  FileText,
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


// --- Main Component ---
export default function PlacementsPage() {
  const [drives, setDrives] = useState(mockDrives);
  
  return (
    <div className="p-4 md:p-6">
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
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                    <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                        <FileText className="w-12 h-12 mx-auto text-slate-400" />
                        <h3 className="mt-4 font-semibold text-lg">Job Pool Coming Soon</h3>
                        <p className="text-sm text-slate-500 mt-1">A curated list of job opportunities will be available here.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
