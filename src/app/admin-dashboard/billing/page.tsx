'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Plus, CheckCircle2 } from 'lucide-react';
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
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    date: "2024-04-15",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    date: "2024-05-01",
  },
  {
    invoice: "INV003",
    paymentStatus: "Paid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    date: "2024-03-20",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    date: "2024-02-10",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    date: "2024-01-05",
  },
];

export default function AdminBillingPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing & Credits</h1>
            <p className="text-muted-foreground">Manage your billing information and view invoice history.</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Payment Method
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Current Plan */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the <span className="font-semibold text-primary">Enterprise Plan</span>.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-medium">Enterprise Plan</p>
                            <p className="text-sm text-muted-foreground">$299/month • Billed Annually</p>
                        </div>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Next Billing Date</p>
                        <p className="text-lg font-semibold mt-1">July 1, 2025</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Credits Remaining</p>
                        <p className="text-lg font-semibold mt-1 text-green-600">14,500</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Active Users</p>
                        <p className="text-lg font-semibold mt-1">45 / Unlimited</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Default payment method.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-4 border rounded-lg bg-slate-50/50 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-slate-500" />
                        <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2028</p>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" className="w-full">Edit</Button>
                </div>
            </CardContent>
             <CardFooter className="flex-col items-start gap-2 text-sm text-muted-foreground">
                <p>Billing email: billing@zekkers.com</p>
                <p>Tax ID: US-123456789</p>
            </CardFooter>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>View and download past invoices.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.totalAmount}</TableCell>
                            <TableCell>
                                <Badge variant={invoice.paymentStatus === 'Paid' ? 'default' : 'secondary'} className={invoice.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                    {invoice.paymentStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
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
