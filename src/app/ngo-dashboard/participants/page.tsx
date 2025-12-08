
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  PlusCircle,
  Search,
  MoreHorizontal,
  Download,
  Trash2,
  Send,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// --- Types ---
type ParticipantStatus = 'Active' | 'Completed' | 'Dropped' | 'Placed';

type Participant = {
  id: string;
  name: string;
  avatar: string;
  program: string;
  cohort: string;
  attendance: number;
  assessmentScore: number;
  jobReadiness: number;
  status: ParticipantStatus;
};

// --- Mock Data ---
const mockParticipants: Participant[] = [
  { id: 'p1', name: 'Riya Sharma', avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl || '', program: 'Digital Literacy', cohort: 'DL-Mumbai-Q3', attendance: 95, assessmentScore: 88, jobReadiness: 92, status: 'Active' },
  { id: 'p2', name: 'Amit Singh', avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl || '', program: 'Advanced IT Support', cohort: 'IT-Pune-Q3', attendance: 98, assessmentScore: 94, jobReadiness: 95, status: 'Placed' },
  { id: 'p3', name: 'Sunita Devi', avatar: PlaceHolderImages.find(p => p.id === 'avatar3')?.imageUrl || '', program: 'Retail Excellence', cohort: 'Retail-Delhi-Q2', attendance: 82, assessmentScore: 75, jobReadiness: 70, status: 'Active' },
  { id: 'p4', name: 'Karan Verma', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80', program: 'Digital Literacy', cohort: 'DL-Mumbai-Q3', attendance: 65, assessmentScore: 58, jobReadiness: 40, status: 'Dropped' },
  { id: 'p5', name: 'Meera John', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80', program: 'Advanced IT Support', cohort: 'IT-Pune-Q3', attendance: 99, assessmentScore: 97, jobReadiness: 98, status: 'Completed' },
];

const statusColors: { [key in ParticipantStatus]: string } = {
  Active: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Placed: 'bg-purple-100 text-purple-700',
  Dropped: 'bg-red-100 text-red-700',
};

// --- Animations ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Main Component ---
export default function ParticipantsPage() {
  const [participants, setParticipants] = useState(mockParticipants);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ program: 'all', cohort: 'all', status: 'all' });
  const [selected, setSelected] = useState<string[]>([]);

  const filteredParticipants = useMemo(() => {
    return participants.filter(p =>
        (p.name.toLowerCase().includes(search.toLowerCase())) &&
        (filters.program === 'all' || p.program === filters.program) &&
        (filters.cohort === 'all' || p.cohort === filters.cohort) &&
        (filters.status === 'all' || p.status === filters.status)
    );
  }, [participants, search, filters]);
  
  const handleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }
  
  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    setSelected(checked === true ? filteredParticipants.map(p => p.id) : []);
  }

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3"><Users/>Participants</CardTitle>
              <CardDescription>Manage all beneficiaries, their progress, and outcomes.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline"><PlusCircle size={16} className="mr-2"/> Add Participant</Button>
              <Button><Download size={16} className="mr-2"/> Import Participants</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="p-4 mb-6 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                  <Input placeholder="Search by name..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Select value={filters.program} onValueChange={v => setFilters(f => ({...f, program: v}))}>
                  <SelectTrigger className="w-full md:w-[200px]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Programs</SelectItem><SelectItem value="Digital Literacy">Digital Literacy</SelectItem><SelectItem value="Advanced IT Support">Advanced IT Support</SelectItem></SelectContent>
              </Select>
               <Select value={filters.status} onValueChange={v => setFilters(f => ({...f, status: v}))}>
                  <SelectTrigger className="w-full md:w-[180px]"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Placed">Placed</SelectItem><SelectItem value="Dropped">Dropped</SelectItem></SelectContent>
              </Select>
          </div>
          
          {/* Bulk Actions */}
          {selected.length > 0 && (
              <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="p-3 mb-4 bg-primary/10 rounded-lg border border-primary/20 flex flex-wrap items-center justify-between gap-2">
                  <div className="font-semibold text-sm">{selected.length} selected</div>
                  <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1.5"><Send size={14}/>Message</Button>
                      <Button size="sm" variant="outline" className="gap-1.5"><PlusCircle size={14}/>Assign to Cohort</Button>
                      <Button size="sm" variant="destructive" className="gap-1.5"><Trash2 size={14}/>Remove</Button>
                  </div>
              </motion.div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                      <Checkbox checked={selected.length > 0 && selected.length === filteredParticipants.length ? true : selected.length > 0 ? 'indeterminate' : false} onCheckedChange={handleSelectAll} />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Program/Cohort</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Assessment Score</TableHead>
                  <TableHead>Job Readiness</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                {filteredParticipants.map(p => (
                  <motion.tr key={p.id} variants={itemVariants} className="hover:bg-slate-50">
                    <TableCell><Checkbox checked={selected.includes(p.id)} onCheckedChange={() => handleSelect(p.id)} /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar><AvatarImage src={p.avatar} /><AvatarFallback>{p.name.slice(0,2)}</AvatarFallback></Avatar>
                        <span className="font-semibold">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{p.program}</div>
                      <div className="text-xs text-muted-foreground">{p.cohort}</div>
                    </TableCell>
                    <TableCell><Progress value={p.attendance} className="h-2 w-24"/> <span className="text-xs">{p.attendance}%</span></TableCell>
                    <TableCell className="font-bold">{p.assessmentScore}%</TableCell>
                    <TableCell className="font-bold text-primary">{p.jobReadiness}%</TableCell>
                    <TableCell><Badge className={statusColors[p.status]}>{p.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="w-8 h-8"><MoreHorizontal size={16}/></Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Assign Assessment</DropdownMenuItem>
                          <DropdownMenuItem>Download Certificate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </motion.tbody>
            </Table>
             {filteredParticipants.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">No participants found for the selected filters.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
