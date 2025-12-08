
'use client';
import React, { useState, useMemo, useEffect } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FileText,
  PlusCircle,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { Candidate } from '@/types/candidate';
import { MOCK_CANDIDATES } from '@/lib/mock-data/candidates';
import { Job } from '@/types/job';
import { MOCK_JOBS } from '@/lib/mock-data/jobs';
import { useToast } from '@/hooks/use-toast';

// --- Types ---
type AssignmentStatus = 'Sent' | 'In Progress' | 'Submitted' | 'Grading' | 'Passed' | 'Failed';

interface Assignment {
  id: string;
  candidate: Candidate;
  job: Job;
  assignmentTitle: string;
  status: AssignmentStatus;
  sentDate: string;
  dueDate: string;
  score?: number;
}

// --- Mock Data ---
const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 'as-1', candidate: MOCK_CANDIDATES[0], job: MOCK_JOBS[0], assignmentTitle: 'React Mini-Project', status: 'Grading', sentDate: '2024-07-28', dueDate: '2024-08-01', score: 88 },
  { id: 'as-2', candidate: MOCK_CANDIDATES[1], job: MOCK_JOBS[1], assignmentTitle: 'Backend API Design Task', status: 'Submitted', sentDate: '2024-07-27', dueDate: '2024-07-30', score: 92 },
  { id: 'as-3', candidate: MOCK_CANDIDATES[2], job: MOCK_JOBS[0], assignmentTitle: 'UI/UX Case Study', status: 'Sent', sentDate: '2024-07-29', dueDate: '2024-08-05' },
];


const statusColors: { [key in AssignmentStatus]: string } = {
  Sent: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Submitted: 'bg-indigo-100 text-indigo-700',
  Grading: 'bg-purple-100 text-purple-700',
  Passed: 'bg-green-100 text-green-700',
  Failed: 'bg-red-100 text-red-700',
};

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Main Component ---
export default function AssignmentsPage() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { toast } = useToast();

    useEffect(() => {
        // Safe access to localStorage only on the client
        setAssignments(MOCK_ASSIGNMENTS);
    }, []);

    const filteredAssignments = useMemo(() => {
        return assignments.filter(a =>
            (a.candidate.name.toLowerCase().includes(search.toLowerCase()) || a.assignmentTitle.toLowerCase().includes(search.toLowerCase())) &&
            (statusFilter === 'all' || a.status === statusFilter)
        );
    }, [assignments, search, statusFilter]);

    const kpiData = useMemo(() => ({
        sent: assignments.length,
        pending: assignments.filter(a => ['Sent', 'In Progress'].includes(a.status)).length,
        submitted: assignments.filter(a => a.status === 'Submitted' || a.status === 'Grading').length,
        passed: assignments.filter(a => a.status === 'Passed').length,
    }), [assignments]);

    const handleCreate = () => {
        toast({ title: "Create Assignment (Mock)", description: "This would open a modal to create and send a new assignment." });
    };

    return (
        <div className="p-4 md:p-6">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-2xl font-bold flex items-center gap-3"><FileText/> Assignments</CardTitle>
                                <CardDescription>Manage skill tests, take-home tasks and coding assignments.</CardDescription>
                            </div>
                            <Button onClick={handleCreate} className="w-full md:w-auto"><PlusCircle size={16} className="mr-2"/> Create Assignment</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <motion.div variants={itemVariants}><Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Sent</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.sent}</p></CardContent></Card></motion.div>
                            <motion.div variants={itemVariants}><Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pending Submission</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.pending}</p></CardContent></Card></motion.div>
                            <motion.div variants={itemVariants}><Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pending Review</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.submitted}</p></CardContent></Card></motion.div>
                            <motion.div variants={itemVariants}><Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Passed</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.passed}</p></CardContent></Card></motion.div>
                        </motion.div>

                        <div className="p-4 mb-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                <Input placeholder="Search by candidate or assignment..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                            <Select value={statusFilter} onValueChange={v => setStatusFilter(v)}>
                                <SelectTrigger className="w-full md:w-[200px]"><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    {Object.keys(statusColors).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader><TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Assignment</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow></TableHeader>
                                <motion.tbody variants={containerVariants}>
                                    {filteredAssignments.map(a => (
                                        <motion.tr key={a.id} variants={itemVariants}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9"><AvatarImage src={a.candidate.avatar}/><AvatarFallback>{a.candidate.name.slice(0,2)}</AvatarFallback></Avatar>
                                                    <div>
                                                        <p className="font-semibold text-sm">{a.candidate.name}</p>
                                                        <p className="text-xs text-muted-foreground">{a.job.title}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{a.assignmentTitle}</TableCell>
                                            <TableCell>
                                                <div className={`flex items-center gap-1.5 text-sm ${new Date(a.dueDate) < new Date() ? 'text-destructive' : ''}`}>
                                                    <Clock size={14}/> {new Date(a.dueDate).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-bold">{a.score ? `${a.score}%` : 'N/A'}</TableCell>
                                            <TableCell><Badge className={statusColors[a.status]}>{a.status}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm">View Submission</Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </Table>
                            {filteredAssignments.length === 0 && <div className="text-center py-16 text-muted-foreground">No assignments match your criteria.</div>}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
