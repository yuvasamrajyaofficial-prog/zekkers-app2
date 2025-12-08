
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
  FileText,
  Download,
  Search,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// --- Types ---
type InvoiceStatus = 'Paid' | 'Due' | 'Overdue';
interface Invoice {
  id: string;
  date: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'INR';
  status: InvoiceStatus;
  plan: string;
}

// --- Mock Data ---
const mockInvoices: Invoice[] = [
  { id: 'INV-2024-007', date: '2024-07-29', amount: 599, currency: 'USD', status: 'Paid', plan: 'Global Growth Plan' },
  { id: 'INV-2024-006', date: '2024-06-29', amount: 599, currency: 'USD', status: 'Paid', plan: 'Global Growth Plan' },
  { id: 'INV-2024-005', date: '2024-05-29', amount: 299, currency: 'USD', status: 'Paid', plan: 'Global Starter Plan' },
  { id: 'INV-2024-004', date: '2024-04-29', amount: 299, currency: 'USD', status: 'Paid', plan: 'Global Starter Plan' },
];

const statusColors: { [key in InvoiceStatus]: string } = {
  Paid: 'bg-green-100 text-green-700',
  Due: 'bg-amber-100 text-amber-700',
  Overdue: 'bg-red-100 text-red-700',
};

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };


// --- Main Component ---
export default function InvoicesPage() {
    const [invoices, setInvoices] = useState(mockInvoices);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { toast } = useToast();

    const filteredInvoices = useMemo(() => {
        return invoices.filter(i =>
            (i.id.toLowerCase().includes(search.toLowerCase()) || i.plan.toLowerCase().includes(search.toLowerCase())) &&
            (statusFilter === 'all' || i.status === statusFilter)
        );
    }, [invoices, search, statusFilter]);

    const handleDownload = (invoiceId: string) => {
        toast({ title: `Downloading ${invoiceId} (Mock)` });
    };
    
    const handleExportAll = () => {
        toast({ title: 'Exporting All Invoices (Mock)', description: 'A CSV file of your billing history will be downloaded.' });
    };

    return (
        <div className="p-4 md:p-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl font-bold flex items-center gap-3"><FileText /> Invoices</CardTitle>
                            <CardDescription>View, download, and manage your billing history.</CardDescription>
                        </div>
                        <Button onClick={handleExportAll} className="w-full md:w-auto"><Download size={16} className="mr-2"/> Download All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="p-4 mb-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search by invoice ID or plan..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <Select value={statusFilter} onValueChange={v => setStatusFilter(v)}>
                            <SelectTrigger className="w-full md:w-[200px]"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Due">Due</SelectItem>
                                <SelectItem value="Overdue">Overdue</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                                {filteredInvoices.map(invoice => (
                                    <motion.tr key={invoice.id} variants={itemVariants}>
                                        <TableCell className="font-medium">{invoice.id}</TableCell>
                                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{invoice.plan}</TableCell>
                                        <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(invoice.amount)}</TableCell>
                                        <TableCell><Badge className={statusColors[invoice.status]}>{invoice.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => handleDownload(invoice.id)}>
                                                <Download size={14} className="mr-2"/> PDF
                                            </Button>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </Table>
                        {filteredInvoices.length === 0 && <div className="text-center py-16 text-muted-foreground">No invoices match your criteria.</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
