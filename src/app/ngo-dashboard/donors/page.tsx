
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
import {
  HeartHandshake,
  PlusCircle,
  Search,
  UploadCloud,
  TrendingUp,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';


// --- Types ---
type TrustStatus = 'Verified' | 'Pending' | 'New';
type Donor = {
  id: string;
  name: string;
  logo: string;
  type: 'Corporate (CSR)' | 'Foundation' | 'Government' | 'Individual';
  totalCommitted: number;
  totalDisbursed: number;
  nextTrancheDate: string;
  trustStatus: TrustStatus;
  primaryContact: string;
};

// --- Mock Data ---
const mockDonors: Donor[] = [
  { id: 'd1', name: 'ZekkTech Foundation', logo: PlaceHolderImages.find(p => p.id === 'logo')?.imageUrl || '', type: 'Corporate (CSR)', totalCommitted: 5000000, totalDisbursed: 2500000, nextTrancheDate: '2024-09-15', trustStatus: 'Verified', primaryContact: 'csr@zekktech.com' },
  { id: 'd2', name: 'Global Giving Org', logo: PlaceHolderImages.find(p => p.id === 'company1')?.imageUrl || '', type: 'Foundation', totalCommitted: 2000000, totalDisbursed: 2000000, nextTrancheDate: 'N/A', trustStatus: 'Verified', primaryContact: 'grants@gg.org' },
  { id: 'd3', name: 'Skill India Mission', logo: PlaceHolderImages.find(p => p.id === 'company2')?.imageUrl || '', type: 'Government', totalCommitted: 10000000, totalDisbursed: 4000000, nextTrancheDate: '2024-08-30', trustStatus: 'Verified', primaryContact: 'contact@skillindia.gov.in' },
  { id: 'd4', name: 'Anonymous Philanthropist', logo: '', type: 'Individual', totalCommitted: 500000, totalDisbursed: 500000, nextTrancheDate: 'N/A', trustStatus: 'New', primaryContact: 'hidden' },
];

const mockPlacementsByDonor = [
    { name: 'ZekkTech', placements: 120 },
    { name: 'Skill India', placements: 250 },
    { name: 'Global Giving', placements: 80 },
    { name: 'Anonymous', placements: 15 },
];

const mockFundingByProgram = [
    { name: 'Digital Literacy', funding: 4000000 },
    { name: 'IT Support', funding: 7500000 },
    { name: 'Retail', funding: 3000000 },
    { name: 'Hospitality', funding: 2500000 },
];


const kpiData = {
    totalCommitments: 17500000,
    pledgedVsReceived: 90, // percentage
    disbursed: 9000000,
    burnRate: 75, // percentage
};

const trustStatusColors: { [key in TrustStatus]: string } = {
  Verified: 'bg-green-100 text-green-700',
  Pending: 'bg-amber-100 text-amber-700',
  New: 'bg-slate-100 text-slate-700',
};


// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Sub-Components ---
const KpiCard = ({ title, value, icon, subtext }: { title: string, value: string, icon: React.ReactNode, subtext?: string }) => (
    <motion.div variants={itemVariants}>
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
            </CardContent>
        </Card>
    </motion.div>
);


// --- Main Component ---
export default function DonorsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ type: 'all', status: 'all' });

  const filteredDonors = useMemo(() => {
    return mockDonors.filter(d =>
        (d.name.toLowerCase().includes(search.toLowerCase())) &&
        (filters.type === 'all' || d.type === filters.type) &&
        (filters.status === 'all' || d.trustStatus === filters.status)
    );
  }, [search, filters]);

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3"><HeartHandshake className="text-primary"/>Donor Reporting & Funding</CardTitle>
              <CardDescription>Manage donor commitments, disbursements, and reporting.</CardDescription>
            </div>
             <div className="flex flex-wrap gap-2">
              <Button variant="outline"><PlusCircle size={16} className="mr-2"/> New Commitment</Button>
              <Button><UploadCloud size={16} className="mr-2"/> Upload Invoice</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            {/* KPIs */}
             <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <KpiCard title="Total Commitments" value={`₹${(kpiData.totalCommitments/100000).toFixed(1)}L`} icon={<DollarSign/>} subtext="All active programs"/>
                <KpiCard title="Pledged vs Received" value={`${kpiData.pledgedVsReceived}%`} icon={<Calendar/>} subtext="This fiscal year"/>
                <KpiCard title="Total Disbursed" value={`₹${(kpiData.disbursed/100000).toFixed(1)}L`} icon={<TrendingUp/>} subtext="To beneficiaries & programs"/>
                <KpiCard title="Fund Utilization" value={`${kpiData.burnRate}%`} icon={<TrendingUp/>} subtext="Against disbursed funds"/>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Donors by Commitment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockDonors.sort((a,b) => b.totalCommitted - a.totalCommitted)} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} />
                                <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} />
                                <Bar dataKey="totalCommitted" name="Committed" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Beneficiaries Placed by Donor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockPlacementsByDonor}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} />
                                <Bar dataKey="placements" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Funding by Program Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockFundingByProgram}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `₹${value/100000}L`}/>
                                <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}} />
                                <Bar dataKey="funding" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
