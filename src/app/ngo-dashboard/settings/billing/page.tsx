
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard /> Billing & Plans</CardTitle>
            <CardDescription>Manage your Zekkers subscription and view usage.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">Subscription Management</h3>
                <p className="text-sm text-slate-500 mt-1">
                    Your plan details, invoices, and usage metrics will be displayed here.
                </p>
                 <Button asChild className="mt-4">
                    <Link href="/ngo-dashboard/billing">Go to Full Billing Page</Link>
                 </Button>
            </div>
        </CardContent>
    </Card>
  );
}
