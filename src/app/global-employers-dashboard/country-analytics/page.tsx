
'use client';
import React, { useState } from 'react';
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
  BarChart,
  Globe,
  Users,
  DollarSign,
  Clock,
  FileText,
  Shield,
  Lightbulb,
  Download,
  TrendingUp,
  BrainCircuit,
  PieChart as PieChartIcon,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  LineChart,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
} from 'recharts';
import { Badge } from '@/components/ui/badge';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- Mock Data ---
const mockCountryData = {
  germany: {
    hdi: 68,
    talentPool: 1200000,
    avgSalary: '€75,000',
    timeToHire: 42,
    visa: 'Moderate',
    compliance: 'Medium Risk',
    diversity: [
        { name: 'Female', value: 48, color: 'hsl(var(--chart-1))'},
        { name: 'Male', value: 52, color: 'hsl(var(--chart-2))'},
    ],
    skillTrends: [
        {name: 'Jan', Go: 20, Python: 45},
        {name: 'Mar', Go: 35, Python: 48},
        {name: 'May', Go: 50, Python: 40},
        {name: 'Jul', Go: 65, Python: 35},
    ]
  },
  india: {
    hdi: 45,
    talentPool: 8500000,
    avgSalary: '₹12 LPA',
    timeToHire: 28,
    visa: 'Easy (Local)',
    compliance: 'Low Risk',
    diversity: [
        { name: 'Female', value: 35, color: 'hsl(var(--chart-1))'},
        { name: 'Male', value: 65, color: 'hsl(var(--chart-2))'},
    ],
    skillTrends: [
        {name: 'Jan', React: 60, Java: 50},
        {name: 'Mar', React: 75, Java: 45},
        {name: 'May', React: 90, Java: 40},
        {name: 'Jul', React: 110, Java: 38},
    ]
  },
};

type Country = keyof typeof mockCountryData;

// --- Sub-Components ---
const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <motion.div variants={itemVariants}>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">{icon}{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </motion.div>
);

const StatCard = ({ title, value }: { title: string, value: string | number }) => (
    <div className="p-3 bg-slate-100 rounded-lg text-center">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-lg font-bold">{value}</p>
    </div>
);

const DifficultyIndicator = ({ level }: { level: string }) => {
    const colors: {[key: string]: string} = {
        Easy: 'bg-green-500',
        Moderate: 'bg-yellow-500',
        Challenging: 'bg-orange-500',
        Critical: 'bg-red-500',
    };
    return <div className={`w-3 h-3 rounded-full ${colors[level]}`}></div>;
}


// --- Main Component ---
export default function CountryAnalyticsPage() {
  const [country, setCountry] = useState<Country>('germany');
  const data = mockCountryData[country];

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header & Country Selector */}
        <motion.div variants={itemVariants}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Country Analytics</h1>
                    <p className="text-slate-500 mt-1">Deep-dive into talent markets for strategic decisions.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Select value={country} onValueChange={(v) => setCountry(v as Country)}>
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="germany">Germany</SelectItem>
                            <SelectItem value="india">India</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="w-full md:w-auto gap-2"><Download size={16}/> Export Report</Button>
                </div>
            </div>
        </motion.div>
        
        {/* Overview Stats */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <motion.div variants={itemVariants}><StatCard title="Hiring Difficulty" value={`${data.hdi}/100`}/></motion.div>
            <motion.div variants={itemVariants}><StatCard title="Talent Pool" value={`${(data.talentPool / 1000000).toFixed(1)}M`}/></motion.div>
            <motion.div variants={itemVariants}><StatCard title="Avg. Salary (SDE)" value={data.avgSalary}/></motion.div>
            <motion.div variants={itemVariants}><StatCard title="Avg. Time-to-Hire" value={`${data.timeToHire} days`}/></motion.div>
            <motion.div variants={itemVariants}><StatCard title="Visa Process" value={data.visa}/></motion.div>
            <motion.div variants={itemVariants}><StatCard title="Compliance Risk" value={data.compliance}/></motion.div>
        </motion.div>


        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Talent Availability & Skill Density" icon={<Users />}>
                <div className="h-80 bg-slate-100 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">[Interactive Country Map Placeholder]</p>
              </div>
            </Section>

            <Section title="Talent Trends & Skill Forecast (AI)" icon={<TrendingUp />}>
                 <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.skillTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                        <Legend />
                        <Line type="monotone" dataKey="Go" stroke="hsl(var(--chart-1))" name="Go Developers"/>
                        <Line type="monotone" dataKey="Python" stroke="hsl(var(--chart-2))" name="Python Developers"/>
                        <Line type="monotone" dataKey="React" stroke="hsl(var(--chart-4))" name="React Developers"/>
                        <Line type="monotone" dataKey="Java" stroke="hsl(var(--chart-5))" name="Java Developers"/>
                    </LineChart>
                 </ResponsiveContainer>
            </Section>
          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-6 lg:sticky lg:top-6">
            <Section title="AI Recommendations" icon={<Lightbulb className="text-amber-500" />}>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2"><ArrowRight size={14} className="mt-1 shrink-0"/>Focus on Berlin for senior Go developers.</li>
                    <li className="flex items-start gap-2"><ArrowRight size={14} className="mt-1 shrink-0"/>Salary for mid-level roles is 10% higher than market average.</li>
                    <li className="flex items-start gap-2"><ArrowRight size={14} className="mt-1 shrink-0"/>High availability of visa-ready candidates in the IT sector.</li>
                </ul>
            </Section>

            <Section title="Diversity & Inclusion" icon={<PieChartIcon />}>
                <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                        <Pie data={data.diversity} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} label>
                            {data.diversity.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                        <Legend iconSize={10}/>
                    </RechartsPieChart>
                </ResponsiveContainer>
            </Section>

            <Section title="Compliance Summary" icon={<Shield />}>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500 mt-1 shrink-0"/>GDPR compliant</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500 mt-1 shrink-0"/>Standard 4-week notice period</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500 mt-1 shrink-0"/>Remote work contracts are straightforward.</li>
                </ul>
            </Section>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
