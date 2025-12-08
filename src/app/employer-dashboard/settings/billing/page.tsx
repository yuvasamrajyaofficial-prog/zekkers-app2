
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';

export default function BillingSettingsShortcutPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard />Billing & Plans</CardTitle>
                <CardDescription>
                    Manage your subscription, view invoices, and purchase add-ons from the main billing dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    This section provides a quick link to the full billing management page.
                </p>
                <Button asChild>
                    <Link href="/employer-dashboard/billing">
                        Go to Billing Dashboard
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
