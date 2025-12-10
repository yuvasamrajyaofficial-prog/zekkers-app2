
'use client';
import React from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  Check,
  X,
  Sparkles,
  Download,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// --- Mock Data ---

const plans = [
  {
    name: 'Free',
    price: '₹0',
    description: 'For individuals and small teams just getting started.',
    features: {
      'Active job posts': '1',
      'Candidate views': 'Limited',
      'AI JD Generator': false,
      'Global Hiring': false,
      'Basic ATS': true,
    },
    cta: 'Your Current Plan',
    isCurrent: false,
    isPopular: false,
  },
  {
    name: 'Starter',
    price: '₹4,999',
    priceSuffix: '/mo',
    description: 'For growing teams that need more hiring power.',
    features: {
      'Active job posts': '5',
      'Candidate views': 'Unlimited',
      'AI JD Generator': true,
      'Global Hiring': false,
      'Basic ATS': true,
    },
    cta: 'Your Current Plan',
    isCurrent: true,
    isPopular: true,
  },
  {
    name: 'Growth',
    price: '₹19,999',
    priceSuffix: '/mo',
    description: 'For companies scaling their hiring efforts.',
    features: {
      'Active job posts': '20',
      'Candidate views': 'Unlimited',
      'AI JD Generator': true,
      'Global Hiring': true,
      'Basic ATS': true,
    },
    cta: 'Upgrade to Growth',
    isCurrent: false,
    isPopular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: {
      'Active job posts': 'Unlimited',
      'Candidate views': 'Unlimited',
      'AI JD Generator': true,
      'Global Hiring': true,
      'Basic ATS': true,
    },
    cta: 'Contact Sales',
    isCurrent: false,
    isPopular: false,
  },
];

const currentUsage = {
    plan: 'Starter',
    renewalDate: 'August 29, 2024',
    paymentMethod: 'Visa **** 4242',
    jobPosts: { used: 3, limit: 5 },
    assessmentCredits: { used: 45, limit: 100 },
    aiGenerations: { used: 12, limit: 50 },
    teamSeats: { used: 2, limit: 5 },
};

const billingHistory = [
    { id: 'INV-2024-001', date: 'July 29, 2024', amount: '₹5,898.82', status: 'Paid' },
    { id: 'INV-2024-002', date: 'June 29, 2024', amount: '₹5,898.82', status: 'Paid' },
    { id: 'INV-2024-003', date: 'May 29, 2024', amount: '₹5,898.82', status: 'Paid' },
];

const UsageMeter = ({ title, used, limit }: { title: string, used: number, limit: number }) => (
    <div>
        <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium text-muted-foreground">{title}</span>
            <span>{used} / {limit}</span>
        </div>
        <Progress value={(used / limit) * 100} />
    </div>
);


export default function BillingPage() {
  return (
    <div className="p-4 md:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CreditCard /> Billing & Plans
          </h1>
          <p className="text-muted-foreground text-base mt-1 max-w-2xl">
            Manage your subscription, view invoices, and purchase add-ons.
          </p>
        </motion.div>

        {/* Plans Overview */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>
                Select the plan that best fits your hiring needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan, index) => (
                  <motion.div key={plan.name} variants={itemVariants} whileHover={{ y: -5 }}>
                    <Card className={`flex flex-col h-full ${plan.isPopular ? 'border-primary ring-2 ring-primary' : ''}`}>
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <p className="text-2xl font-bold">{plan.price} <span className="text-sm font-normal text-muted-foreground">{plan.priceSuffix}</span></p>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <ul className="space-y-3 text-sm">
                          {Object.entries(plan.features).map(([feature, value]) => (
                            <li key={feature} className="flex items-center gap-2">
                              {typeof value === 'boolean' ? (
                                value ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />
                              ) : (
                                <Sparkles className="w-4 h-4 text-blue-500" />
                              )}
                              <span>{feature}: <strong>{typeof value === 'boolean' ? '' : value}</strong></span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-6" variant={'default'} disabled={plan.isCurrent}>
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Current Plan & Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan & Usage</CardTitle>
                <CardDescription>Your current subscription details and limits.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-slate-50 border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div><p className="text-xs text-muted-foreground">Plan</p><p className="font-bold">{currentUsage.plan}</p></div>
                    <div><p className="text-xs text-muted-foreground">Renews On</p><p className="font-bold">{currentUsage.renewalDate}</p></div>
                    <div><p className="text-xs text-muted-foreground">Payment</p><p className="font-bold">{currentUsage.paymentMethod}</p></div>
                    <div className="flex items-center space-x-2"><Switch id="auto-renew" defaultChecked/><Label htmlFor="auto-renew">Auto-Renew</Label></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UsageMeter title="Active Job Posts" used={currentUsage.jobPosts.used} limit={currentUsage.jobPosts.limit} />
                    <UsageMeter title="Assessment Credits" used={currentUsage.assessmentCredits.used} limit={currentUsage.assessmentCredits.limit} />
                    <UsageMeter title="AI Generations" used={currentUsage.aiGenerations.used} limit={currentUsage.aiGenerations.limit} />
                    <UsageMeter title="Team Seats" used={currentUsage.teamSeats.used} limit={currentUsage.teamSeats.limit} />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button>Upgrade Plan</Button>
                    <Button variant="outline">Buy More Credits</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
             <Card className="bg-primary/90 text-primary-foreground">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TrendingUp/> AI Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-primary-foreground/80">Your current usage suggests upgrading to the <strong className="font-bold text-white">Growth</strong> plan could reduce your cost-per-hire by an estimated <strong className="font-bold text-white">22%</strong>.</p>
                    <Button variant="secondary" className="w-full">See Analysis</Button>
                </CardContent>
            </Card>
          </motion.div>
        </div>


        {/* Billing History */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Download your past invoices and view payment history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={invoice.status === 'Paid' ? 'default' : 'destructive'}
                          className={invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download size={14} /> Download PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
}
