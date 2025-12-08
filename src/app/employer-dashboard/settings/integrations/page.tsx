
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plug } from 'lucide-react';

export default function IntegrationsSettingsShortcutPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Plug />Integrations & API</CardTitle>
                <CardDescription>
                    Connect with your favorite tools and build custom workflows from the main integrations dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    This section provides a quick link to the full integrations and API management page.
                </p>
                <Button asChild>
                    <Link href="/employer-dashboard/integrations">
                        Go to Integrations Dashboard
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
