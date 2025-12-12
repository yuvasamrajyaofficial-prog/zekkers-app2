'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, DollarSign, Download, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: 'TXN-1001',
    description: 'Recruitment Fee - Senior Dev',
    amount: '$12,500',
    date: '2024-05-15',
    status: 'Paid',
    type: 'Expense',
  },
  {
    id: 'TXN-1002',
    description: 'Job Posting Bundle (Global)',
    amount: '$2,500',
    date: '2024-05-10',
    status: 'Paid',
    type: 'Expense',
  },
  {
    id: 'TXN-1003',
    description: 'Referral Bonus Payout',
    amount: '$1,000',
    date: '2024-05-05',
    status: 'Processing',
    type: 'Expense',
  },
];

export default function FinancePage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Financial Overview</h1>
            <p className="text-muted-foreground">Track your recruitment spending and budget.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
            <Button>
                <CreditCard className="mr-2 h-4 w-4" /> Add Funds
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend (YTD)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$145,200</div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
                    +10% from last year
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$54,800</div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
                    On track
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Cost per Hire</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$4,200</div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
                    -5% from last quarter
                </div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Receipt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((txn) => (
                        <TableRow key={txn.id}>
                            <TableCell className="font-medium">{txn.description}</TableCell>
                            <TableCell>{txn.date}</TableCell>
                            <TableCell>{txn.type}</TableCell>
                            <TableCell>{txn.amount}</TableCell>
                            <TableCell>
                                <Badge variant={txn.status === 'Paid' ? 'default' : 'secondary'} className={txn.status === 'Paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                    {txn.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
