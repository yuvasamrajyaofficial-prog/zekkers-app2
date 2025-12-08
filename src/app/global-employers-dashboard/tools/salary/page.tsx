
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DollarSign,
  Lightbulb,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- Mock Data ---
const mockSalaryData: { [key: string]: any } = {
  'germany-swe-mid': {
    percentiles: { '25th': 65000, '50th': 78000, '75th': 92000 },
    recommended: { min: 75000, max: 85000 },
    currency: 'EUR',
    cities: [
      { name: 'Berlin', avg: 80000 },
      { name: 'Munich', avg: 85000 },
      { name: 'Hamburg', avg: 76000 },
      { name: 'Frankfurt', avg: 82000 },
    ],
  },
  'india-swe-mid': {
    percentiles: { '25th': 1800000, '50th': 2500000, '75th': 3500000 },
    recommended: { min: 2200000, max: 2800000 },
    currency: 'INR',
    cities: [
        { name: 'Bengaluru', avg: 2800000 },
        { name: 'Hyderabad', avg: 2400000 },
        { name: 'Pune', avg: 2200000 },
        { name: 'Gurugram', avg: 2600000 },
    ],
  },
   'usa-swe-mid': {
    percentiles: { '25th': 120000, '50th': 150000, '75th': 180000 },
    recommended: { min: 140000, max: 165000 },
    currency: 'USD',
    cities: [
        { name: 'San Francisco', avg: 180000 },
        { name: 'New York', avg: 160000 },
        { name: 'Austin', avg: 140000 },
        { name: 'Seattle', avg: 170000 },
    ],
  },
};

const StatCard = ({ title, value, currency, subtext }: { title: string, value: number, currency: string, subtext?: string }) => {
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(value);

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{formattedValue}</p>
                {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
            </CardContent>
        </Card>
    );
};


// --- Main Component ---
export default function GlobalSalaryBenchmarking() {
  const [filters, setFilters] = useState({
    country: 'germany',
    role: 'swe',
    experience: 'mid',
  });
  const [data, setData] = useState(mockSalaryData['germany-swe-mid']);

  const handleFilterChange = (key: string, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      const dataKey = `${newFilters.country}-${newFilters.role}-${newFilters.experience}`;
      setData(mockSalaryData[dataKey] || mockSalaryData['germany-swe-mid']);
  };

  const currencyFormatter = (value: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: data.currency,
        notation: 'compact',
        maximumFractionDigits: 0
    }).format(value);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <DollarSign className="text-primary" />
                Global Salary Benchmarking
              </CardTitle>
              <CardDescription className="mt-1">
                Make competitive offers with AI-powered salary intelligence.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Filters */}
            <motion.div variants={itemVariants} className="p-4 bg-slate-50 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={filters.country} onValueChange={(v) => handleFilterChange('country', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>
                    </SelectContent></Select>
                    <Select value={filters.role} onValueChange={(v) => handleFilterChange('role', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                        <SelectItem value="swe">Software Engineer</SelectItem>
                        <SelectItem value="pm">Product Manager</SelectItem>
                        <SelectItem value="da">Data Analyst</SelectItem>
                    </SelectContent></Select>
                    <Select value={filters.experience} onValueChange={(v) => handleFilterChange('experience', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                        <SelectItem value="junior">Junior (0-2 Yrs)</SelectItem>
                        <SelectItem value="mid">Mid-Level (3-5 Yrs)</SelectItem>
                        <SelectItem value="senior">Senior (5+ Yrs)</SelectItem>
                    </SelectContent></Select>
                </div>
            </motion.div>

            {/* Salary Benchmarks */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants}><StatCard title="25th Percentile" value={data.percentiles['25th']} currency={data.currency} subtext="Entry-level packages"/></motion.div>
                <motion.div variants={itemVariants}><StatCard title="50th Percentile (Median)" value={data.percentiles['50th']} currency={data.currency} subtext="Market average"/></motion.div>
                <motion.div variants={itemVariants}><StatCard title="75th Percentile" value={data.percentiles['75th']} currency={data.currency} subtext="For top talent"/></motion.div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* AI Recommendation */}
                <motion.div variants={itemVariants}>
                    <Card className="bg-primary/5 h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-primary"><Lightbulb/> AI Recommended Offer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{currencyFormatter(data.recommended.min)} - {currencyFormatter(data.recommended.max)}</p>
                            <p className="text-muted-foreground mt-1">This range is competitive for the selected role and market, designed to attract top 15% talent.</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* City-wise Distribution */}
                <motion.div variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MapPin/> Salary by Top Cities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={data.cities} layout="vertical" margin={{left: 20}}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} />
                                    <Tooltip formatter={currencyFormatter} cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                                    <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
