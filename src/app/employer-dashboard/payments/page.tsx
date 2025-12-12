'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Plus, CheckCircle2, Zap } from 'lucide-react';
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
    id: "TXN-001",
    description: "Job Posting - Senior Developer",
    amount: "$49.00",
    status: "Paid",
    date: "2024-05-15",
    invoice: "INV-2024-001",
  },
  {
    id: "TXN-002",
    description: "Monthly Subscription - Pro Plan",
    amount: "$199.00",
    status: "Paid",
    date: "2024-05-01",
    invoice: "INV-2024-002",
  },
  {
    id: "TXN-003",
    description: "Candidate Contact Credits (50)",
    amount: "$25.00",
    status: "Paid",
    date: "2024-04-20",
    invoice: "INV-2024-003",
  },
];

export default function EmployerPaymentsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing & Payments</h1>
            <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
        </div>
        <Button>
            <Zap className="mr-2 h-4 w-4" /> Upgrade Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Current Plan */}
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>You are currently on the <span className="font-semibold text-primary">Pro Plan</span>.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Pro Plan</h3>
                            <p className="text-sm text-muted-foreground">$199/month • Renews on June 1, 2024</p>
                        </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Job Postings</p>
                        <p className="font-medium">12 / 20 used</p>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[60%]"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Candidate Contacts</p>
                        <p className="font-medium">45 / 100 used</p>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[45%]"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Featured Jobs</p>
                        <p className="font-medium">1 / 3 used</p>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[33%]"></div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-md">
                    <CreditCard className="h-5 w-5 text-slate-500" />
                    <div className="flex-1">
                        <p className="font-medium text-sm">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                    </div>
                    <Badge variant="outline">Default</Badge>
                </div>
                <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Method
                </Button>
            </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
            <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Invoice</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((txn) => (
                        <TableRow key={txn.id}>
                            <TableCell className="font-medium">{txn.description}</TableCell>
                            <TableCell>{txn.date}</TableCell>
                            <TableCell>{txn.amount}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    {txn.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                    <Download className="h-3 w-3" /> PDF
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
