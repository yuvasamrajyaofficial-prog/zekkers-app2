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
  Library,
  PlusCircle,
  Search,
  Users,
  Calendar,
  Briefcase,
  Star,
  BookOpen,
} from 'lucide-react';

// --- Types ---
type Program = {
  id: string;
  name: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Active' | 'Upcoming' | 'Completed';
  enrolled: number;
  completionRate: number;
  partnerships: number;
};

type Cohort = {
  id: string;
  name: string;
  program: string;
  startDate: string;
  endDate: string;
  studentCount: number;
  attendance: number;
  placementRate: number;
};

// --- Mock Data ---
const mockPrograms: Program[] = [
  { id: 'prog1', name: 'Digital Literacy for All', category: 'Digital Literacy', duration: '6 Weeks', level: 'Beginner', status: 'Active', enrolled: 120, completionRate: 85, partnerships: 3 },
  { id: 'prog2', name: 'Advanced IT Support Skills', category: 'IT', duration: '3 Months', level: 'Intermediate', status: 'Active', enrolled: 45, completionRate: 92, partnerships: 5 },
  { id: 'prog3', name: 'Retail & Customer Service Excellence', category: 'Retail', duration: '4 Weeks', level: 'Beginner', status: 'Upcoming', enrolled: 150, completionRate: 0, partnerships: 8 },
  { id: 'prog4', name: 'Spoken English & Communication', category: 'Soft Skills', duration: '8 Weeks', level: 'Intermediate', status: 'Completed', enrolled: 95, completionRate: 98, partnerships: 2 },
];

const mockCohorts: Cohort[] = [
    { id: 'coh1', name: 'DL-Mumbai-Q3-2024', program: 'Digital Literacy for All', startDate: '2024-07-01', endDate: '2024-08-15', studentCount: 30, attendance: 95, placementRate: 60 },
    { id: 'coh2', name: 'IT-Pune-Q3-2024', program: 'Advanced IT Support Skills', startDate: '2024-07-15', endDate: '2024-10-15', studentCount: 22, attendance: 98, placementRate: 75 },
    { id: 'coh3', name: 'DL-Delhi-Q2-2024', program: 'Digital Literacy for All', startDate: '2024-04-01', endDate: '2024-05-15', studentCount: 28, attendance: 91, placementRate: 55 },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- Sub-Components ---

const ProgramCard = ({ program }: { program: Program }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <Badge variant={program.status === 'Active' ? 'default' : 'secondary'} className={program.status === 'Active' ? 'bg-green-100 text-green-700' : ''}>{program.status}</Badge>
                </div>
                <CardDescription>{program.category} • {program.duration}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
                 <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5"><Users size={14}/> {program.enrolled} Enrolled</div>
                    <div className="flex items-center gap-1.5"><Star size={14}/> {program.completionRate}% Completion</div>
                    <div className="flex items-center gap-1.5 col-span-2"><Briefcase size={14}/> {program.partnerships} Employer Partners</div>
                </div>
            </CardContent>
            <div className="p-4 pt-0 flex justify-end gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button size="sm">View Dashboard</Button>
            </div>
        </Card>
    </motion.div>
);

const CohortRow = ({ cohort }: { cohort: Cohort }) => (
    <motion.tr variants={itemVariants} className="hover:bg-slate-50">
        <td className="p-4 font-semibold">{cohort.name}</td>
        <td className="p-4">{cohort.program}</td>
        <td className="p-4">{new Date(cohort.startDate).toLocaleDateString()}</td>
        <td className="p-4">{cohort.studentCount}</td>
        <td className="p-4">{cohort.attendance}%</td>
        <td className="p-4 text-green-600 font-bold">{cohort.placementRate}%</td>
        <td className="p-4 text-right">
            <Button size="sm" variant="ghost">View</Button>
        </td>
    </motion.tr>
)

// --- Main Component ---

export default function ProgramsAndCohortsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: 'all', category: 'all' });

  const filteredPrograms = useMemo(() => {
    return mockPrograms.filter(p => 
        (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())) &&
        (filters.status === 'all' || p.status.toLowerCase() === filters.status) &&
        (filters.category === 'all' || p.category.toLowerCase() === filters.category.toLowerCase())
    );
  }, [search, filters]);
  
  const filteredCohorts = useMemo(() => {
    return mockCohorts.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || c.program.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);


  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Library className="text-primary" />
                Programs & Cohorts
              </CardTitle>
              <CardDescription className="mt-1">
                Manage skill training, community cohorts, trainers, and learning outcomes.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline"><PlusCircle size={16} className="mr-2"/> Create Program</Button>
                <Button><PlusCircle size={16} className="mr-2"/> Create Cohort</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="programs" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="programs">Programs</TabsTrigger>
                    <TabsTrigger value="cohorts">Cohorts (Batches)</TabsTrigger>
                </TabsList>
                
                {/* Search & Filters */}
                <div className="my-6 p-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Search by name, category, or cohort ID..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                     <Select value={filters.status} onValueChange={v => setFilters(f => ({...f, status: v}))}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Upcoming">Upcoming</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filters.category} onValueChange={v => setFilters(f => ({...f, category: v}))}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Digital Literacy">Digital Literacy</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <TabsContent value="programs">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPrograms.map(p => <ProgramCard key={p.id} program={p}/>)}
                    </motion.div>
                </TabsContent>

                <TabsContent value="cohorts">
                    <Card>
                        <motion.table variants={containerVariants} initial="hidden" animate="visible" className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4 text-left font-semibold">Cohort</th>
                                    <th className="p-4 text-left font-semibold">Program</th>
                                    <th className="p-4 text-left font-semibold">Start Date</th>
                                    <th className="p-4 text-left font-semibold">Students</th>
                                    <th className="p-4 text-left font-semibold">Attendance</th>
                                    <th className="p-4 text-left font-semibold">Placements</th>
                                    <th className="p-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCohorts.map(c => <CohortRow key={c.id} cohort={c} />)}
                            </tbody>
                        </motion.table>
                    </Card>
                </TabsContent>

            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
