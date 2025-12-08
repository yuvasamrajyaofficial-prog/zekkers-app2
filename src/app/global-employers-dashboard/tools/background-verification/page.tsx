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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ShieldCheck,
  PlusCircle,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  FileDown,
  Users,
} from 'lucide-react';
import { MOCK_CANDIDATES } from '@/lib/mock-data/candidates';
import { useToast } from '@/hooks/use-toast';

// --- Types ---
type CheckStatus = 'Pending' | 'In Progress' | 'Completed - Clear' | 'Completed - Issues Found';
interface VerificationRequest {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  checkType: 'Standard' | 'Comprehensive';
  status: CheckStatus;
  lastUpdated: string;
}

// --- Mock Data ---
const mockRequests: VerificationRequest[] = [
  { id: 'bgv-1', candidateName: 'Anjali Sharma', candidateAvatar: MOCK_CANDIDATES[0].avatar || '', jobTitle: 'Frontend Developer', checkType: 'Standard', status: 'Completed - Clear', lastUpdated: '2024-07-28' },
  { id: 'bgv-2', candidateName: 'Rohan Verma', candidateAvatar: MOCK_CANDIDATES[1].avatar || '', jobTitle: 'Senior Backend Engineer', checkType: 'Comprehensive', status: 'In Progress', lastUpdated: '2024-07-30' },
  { id: 'bgv-3', candidateName: 'Priya Patel', candidateAvatar: MOCK_CANDIDATES[2].avatar || '', jobTitle: 'UX/UI Designer', checkType: 'Standard', status: 'Pending', lastUpdated: '2024-08-01' },
];

const statusConfig: { [key in CheckStatus]: { color: string; icon: React.ReactNode } } = {
  'Pending': { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} /> },
  'In Progress': { color: 'bg-blue-100 text-blue-700', icon: <Clock size={14} /> },
  'Completed - Clear': { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={14} /> },
  'Completed - Issues Found': { color: 'bg-red-100 text-red-700', icon: <AlertCircle size={14} /> },
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const KpiCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{value}</p>
            </CardContent>
        </Card>
    </motion.div>
);

export default function BackgroundVerificationPage() {
    const { toast } = useToast();
    const [requests, setRequests] = useState(mockRequests);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredRequests = useMemo(() => {
        return requests.filter(r =>
            (r.candidateName.toLowerCase().includes(search.toLowerCase())) &&
            (statusFilter === 'all' || r.status === statusFilter)
        );
    }, [requests, search, statusFilter]);

    const kpiData = useMemo(() => ({
        total: requests.length,
        pending: requests.filter(r => r.status === 'Pending' || r.status === 'In Progress').length,
        completed: requests.filter(r => r.status.startsWith('Completed')).length,
        issues: requests.filter(r => r.status === 'Completed - Issues Found').length,
    }), [requests]);

    const handleInitiate = () => {
        toast({ title: "Initiate Check (Mock)", description: "This would open a modal to select a candidate and check type." });
    };

    return (
        <div className="p-4 md:p-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl font-bold flex items-center gap-3"><ShieldCheck className="text-primary"/> Background Verification</CardTitle>
                            <CardDescription>Initiate and track background checks for your candidates.</CardDescription>
                        </div>
                        <Button onClick={handleInitiate} className="w-full md:w-auto"><PlusCircle size={16} className="mr-2"/> Initiate New Check</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <KpiCard title="Total Checks" value={kpiData.total} icon={<Users />} />
                        <KpiCard title="Pending Review" value={kpiData.pending} icon={<Clock />} />
                        <KpiCard title="Completed" value={kpiData.completed} icon={<CheckCircle />} />
                        <KpiCard title="Issues Found" value={kpiData.issues} icon={<AlertCircle />} />
                    </motion.div>

                    <div className="p-4 mb-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search by candidate name..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <Select value={statusFilter} onValueChange={v => setStatusFilter(v)}>
                            <SelectTrigger className="w-full md:w-[200px]"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                {Object.keys(statusConfig).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Job Role</TableHead>
                                    <TableHead>Check Type</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                                {filteredRequests.map(req => (
                                    <motion.tr key={req.id} variants={itemVariants}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={req.candidateAvatar}/>
                                                    <AvatarFallback>{req.candidateName.slice(0,2)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-semibold text-sm">{req.candidateName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{req.jobTitle}</TableCell>
                                        <TableCell><Badge variant="outline">{req.checkType}</Badge></TableCell>
                                        <TableCell>{new Date(req.lastUpdated).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge className={`${statusConfig[req.status].color} gap-1.5`}>
                                                {statusConfig[req.status].icon} {req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <FileDown size={14}/> View Report
                                            </Button>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </Table>
                        {filteredRequests.length === 0 && (
                            <div className="text-center py-16 text-muted-foreground">No verification requests match your criteria.</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
