
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FileText,
  PlusCircle,
  Search,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Send,
} from 'lucide-react';
import { Candidate } from '@/types/candidate';
import { MOCK_CANDIDATES } from '@/lib/mock-data/candidates';
import { Job } from '@/types/job';
import { MOCK_JOBS } from '@/lib/mock-data/jobs';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/ui/combobox';

// --- Types ---
type OfferStatus = 'Draft' | 'Pending Approval' | 'Sent' | 'Accepted' | 'Declined' | 'Withdrawn';

interface Offer {
  id: string;
  candidate: Candidate;
  job: Job;
  status: OfferStatus;
  sentDate: string;
  expiryDate: string;
  salary: number;
  currency: 'USD' | 'EUR' | 'INR' | 'GBP';
  equity?: string;
}

// --- Mock Data ---
const mockOffers: Offer[] = [
  { id: 'off-1', candidate: MOCK_CANDIDATES[0], job: MOCK_JOBS[0], status: 'Sent', sentDate: '2024-08-01', expiryDate: '2024-08-08', salary: 85000, currency: 'USD' },
  { id: 'off-2', candidate: MOCK_CANDIDATES[1], job: MOCK_JOBS[1], status: 'Accepted', sentDate: '2024-07-25', expiryDate: '2024-08-01', salary: 120000, currency: 'USD', equity: '0.05%' },
  { id: 'off-3', candidate: MOCK_CANDIDATES[2], job: MOCK_JOBS[0], status: 'Draft', sentDate: 'N/A', expiryDate: 'N/A', salary: 75000, currency: 'USD' },
];

const statusColors: { [key in OfferStatus]: string } = {
  Draft: 'bg-slate-100 text-slate-600',
  'Pending Approval': 'bg-yellow-100 text-yellow-700',
  Sent: 'bg-blue-100 text-blue-700',
  Accepted: 'bg-green-100 text-green-700',
  Declined: 'bg-red-100 text-red-700',
  Withdrawn: 'bg-gray-100 text-gray-700',
};

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Sub-Components ---
const KpiCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    </motion.div>
);

// --- Main Component ---
export default function OfferManagementPage() {
    const [offers, setOffers] = useState(mockOffers);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { toast } = useToast();

    const candidateOptions = useMemo(() => MOCK_CANDIDATES.map(c => ({
        value: c.id,
        label: c.name,
    })), []);


    const filteredOffers = useMemo(() => {
        return offers.filter(o =>
            (o.candidate.name.toLowerCase().includes(search.toLowerCase()) || o.job.title.toLowerCase().includes(search.toLowerCase())) &&
            (statusFilter === 'all' || o.status === statusFilter)
        );
    }, [offers, search, statusFilter]);

    const kpiData = useMemo(() => ({
        sent: offers.filter(o => o.status !== 'Draft').length,
        accepted: offers.filter(o => o.status === 'Accepted').length,
        acceptanceRate: offers.filter(o => o.status !== 'Draft').length > 0 ? ((offers.filter(o => o.status === 'Accepted').length / offers.filter(o => o.status !== 'Draft').length) * 100).toFixed(0) : 0,
        avgTimeToAccept: '5.2 days',
    }), [offers]);

    const handleCreateOffer = () => {
        toast({ title: "Offer Created (Mock)", description: "The new offer has been saved as a draft." });
    };

    return (
        <div className="p-4 md:p-6">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-2xl font-bold flex items-center gap-3"><FileText/> Offer Management</CardTitle>
                                <CardDescription>Create offers, manage approvals, and track acceptance.</CardDescription>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full md:w-auto"><PlusCircle size={16} className="mr-2"/> Create Offer</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Create New Offer</DialogTitle>
                                        <DialogDescription>Fill in the details to generate an offer for a candidate.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label>Candidate</Label>
                                            <Combobox
                                                options={candidateOptions}
                                                placeholder="Select candidate..."
                                                searchPlaceholder="Search candidates..."
                                                notFoundText="No candidates found."
                                                onSelect={(value) => console.log(value)}
                                            />
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Job Role</Label>
                                            <Select><SelectTrigger><SelectValue placeholder="Select job role..."/></SelectTrigger><SelectContent>{MOCK_JOBS.map(j => <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>)}</SelectContent></Select>
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Salary</Label>
                                            <Input type="number" placeholder="e.g., 90000"/>
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Currency</Label>
                                            <Select><SelectTrigger><SelectValue placeholder="Select currency..."/></SelectTrigger><SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="EUR">EUR</SelectItem><SelectItem value="INR">INR</SelectItem></SelectContent></Select>
                                        </div>
                                          <div className="space-y-2">
                                            <Label>Equity (optional)</Label>
                                            <Input placeholder="e.g., 0.01%"/>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Offer Expiry Date</Label>
                                            <Input type="date"/>
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <Label>Attach Offer Letter</Label>
                                            <Input type="file" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" variant="outline">Save as Draft</Button>
                                        <Button type="submit" onClick={handleCreateOffer}>Send Offer</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                           <KpiCard title="Offers Sent" value={String(kpiData.sent)} icon={<Send/>}/>
                           <KpiCard title="Accepted" value={String(kpiData.accepted)} icon={<CheckCircle/>}/>
                           <KpiCard title="Acceptance Rate" value={`${kpiData.acceptanceRate}%`} icon={<TrendingUp/>}/>
                           <KpiCard title="Avg. Time to Accept" value={kpiData.avgTimeToAccept} icon={<Clock/>}/>
                        </motion.div>

                        <div className="p-4 mb-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                <Input placeholder="Search by candidate or job..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
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
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Candidate</TableHead>
                                        <TableHead>Job</TableHead>
                                        <TableHead>Offer</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <motion.tbody variants={containerVariants}>
                                    {filteredOffers.map(o => (
                                        <motion.tr key={o.id} variants={itemVariants}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {o.candidate.avatar && <Avatar className="h-9 w-9"><AvatarImage src={o.candidate.avatar}/><AvatarFallback>{o.candidate.name.slice(0,2)}</AvatarFallback></Avatar>}
                                                    <div>
                                                        <p className="font-semibold text-sm">{o.candidate.name}</p>
                                                        <p className="text-xs text-muted-foreground">{o.candidate.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{o.job.title}</TableCell>
                                            <TableCell className="font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: o.currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(o.salary)}</TableCell>
                                            <TableCell><Badge className={statusColors[o.status]}>{o.status}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm">View Offer</Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </Table>
                            {filteredOffers.length === 0 && <div className="text-center py-16 text-muted-foreground">No offers match your criteria.</div>}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
