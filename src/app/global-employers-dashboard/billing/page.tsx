'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Zap, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    id: 'INV-2024-001',
    date: '2024-05-01',
    amount: '$2,500.00',
    status: 'Paid',
    items: 'Enterprise Plan - Monthly',
  },
  {
    id: 'INV-2024-002',
    date: '2024-04-01',
    amount: '$2,500.00',
    status: 'Paid',
    items: 'Enterprise Plan - Monthly',
  },
  {
    id: 'INV-2024-003',
    date: '2024-03-01',
    amount: '$2,500.00',
    status: 'Paid',
    items: 'Enterprise Plan - Monthly',
  },
];

export default function BillingPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your enterprise plan and billing details.</p>
        </div>
        <Button>
            <Zap className="mr-2 h-4 w-4" /> Upgrade Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the <span className="font-semibold text-primary">Enterprise Global Plan</span>.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Enterprise Global</h3>
                            <p className="text-sm text-muted-foreground">$2,500/month • Renews on June 1, 2024</p>
                        </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Job Slots</p>
                        <p className="font-medium">Unlimited</p>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-full"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Candidate Database</p>
                        <p className="font-medium">Full Access</p>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-full"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">API Calls</p>
                        <p className="font-medium">45k / 100k used</p>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[45%]"></div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-md">
                    <CreditCard className="h-5 w-5 text-slate-500" />
                    <div className="flex-1">
                        <p className="font-medium text-sm">Mastercard ending in 8888</p>
                        <p className="text-xs text-muted-foreground">Expires 09/2026</p>
                    </div>
                    <Badge variant="outline">Default</Badge>
                </div>
                <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Method
                </Button>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Download</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((inv) => (
                        <TableRow key={inv.id}>
                            <TableCell className="font-medium">{inv.id}</TableCell>
                            <TableCell>{inv.date}</TableCell>
                            <TableCell>{inv.items}</TableCell>
                            <TableCell>{inv.amount}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    {inv.status}
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
