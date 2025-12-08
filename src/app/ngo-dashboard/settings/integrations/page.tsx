
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plug } from 'lucide-react';
import Link from 'next/link';

export default function IntegrationsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plug /> Integrations</CardTitle>
            <CardDescription>Connect Zekkers with your existing tools from the main integrations dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
                This section provides a quick link to the full integrations and API management page.
            </p>
            <Button asChild>
                <Link href="/ngo-dashboard/integrations">
                    Go to Integrations Dashboard
                </Link>
            </Button>
        </CardContent>
    </Card>
  );
}
