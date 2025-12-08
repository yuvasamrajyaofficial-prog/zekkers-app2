
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
import {
  CreditCard,
  PlusCircle,
  Search,
  FileText,
  TrendingUp,
  Mail,
  Sparkles,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// --- Types ---
type CreditType = 'Assessment' | 'Job Boost' | 'Email' | 'AI Feature';
interface CreditTransaction {
  id: string;
  date: string;
  description: string;
  type: CreditType;
  amount: number; // positive for additions, negative for deductions
  balance: number;
}

// --- Mock Data ---
const mockTransactions: CreditTransaction[] = [
  { id: 'txn-1', date: '2024-07-29', description: 'Used on "Senior Go Developer" Assessment', type: 'Assessment', amount: -5, balance: 95 },
  { id: 'txn-2', date: '2024-07-28', description: 'Boosted "Marketing Lead" job post', type: 'Job Boost', amount: -1, balance: 19 },
  { id: 'txn-3', date: '2024-07-28', description: 'Generated 5 job descriptions', type: 'AI Feature', amount: -5, balance: 495 },
  { id: 'txn-4', date: '2024-07-27', description: 'Bulk email to 200 candidates', type: 'Email', amount: -200, balance: 4800 },
  { id: 'txn-5', date: '2024-07-25', description: 'Purchased 100 Assessment Credits', type: 'Assessment', amount: 100, balance: 100 },
];

const kpiData = {
    assessment: { title: 'Assessment Credits', value: 95, icon: <FileText/> },
    jobBoost: { title: 'Job Boost Credits', value: 19, icon: <TrendingUp/> },
    email: { title: 'Email Credits', value: 4800, icon: <Mail/> },
    ai: { title: 'AI Feature Credits', value: 495, icon: <Sparkles/> },
};


// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Sub-Components ---
const KpiCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{value.toLocaleString()}</p>
            </CardContent>
        </Card>
    </motion.div>
);

// --- Main Component ---
export default function CreditUsagePage() {
    const { toast } = useToast();
    const [transactions, setTransactions] = useState(mockTransactions);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t =>
            (t.description.toLowerCase().includes(search.toLowerCase())) &&
            (typeFilter === 'all' || t.type === typeFilter)
        );
    }, [transactions, search, typeFilter]);

    const handleBuyCredits = () => {
        toast({ title: "Buy Credits (Mock)", description: "This would open a modal to purchase more credits." });
    };

    return (
        <div className="p-4 md:p-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl font-bold flex items-center gap-3"><CreditCard /> Credit Usage</CardTitle>
                            <CardDescription>Track consumption of credits for assessments, job boosts, emails, and AI features.</CardDescription>
                        </div>
                        <Button onClick={handleBuyCredits} className="w-full md:w-auto"><PlusCircle size={16} className="mr-2"/> Buy More Credits</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {Object.values(kpiData).map(kpi => <KpiCard key={kpi.title} title={kpi.title} value={kpi.value} icon={kpi.icon}/>)}
                    </motion.div>
                    
                    <div className="p-4 mb-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search descriptions..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <Select value={typeFilter} onValueChange={v => setTypeFilter(v)}>
                            <SelectTrigger className="w-full md:w-[200px]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="Assessment">Assessment</SelectItem>
                                <SelectItem value="Job Boost">Job Boost</SelectItem>
                                <SelectItem value="Email">Email</SelectItem>
                                <SelectItem value="AI Feature">AI Feature</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                     <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                                {filteredTransactions.map(t => (
                                    <motion.tr key={t.id} variants={itemVariants}>
                                        <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{t.description}</TableCell>
                                        <TableCell><Badge variant="outline">{t.type}</Badge></TableCell>
                                        <TableCell className={`font-medium ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>{t.amount > 0 ? `+${t.amount}` : t.amount}</TableCell>
                                        <TableCell>{t.balance}</TableCell>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </Table>
                         {filteredTransactions.length === 0 && <div className="text-center py-16 text-muted-foreground">No transactions match your criteria.</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
