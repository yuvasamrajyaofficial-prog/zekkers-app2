
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DeveloperPage() {
    const { toast } = useToast();
    
    const handleGenerateKey = () => {
        toast({
            title: "API Key Generated (Mock)",
            description: "The new key has been securely stored and displayed.",
        });
    };

  return (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="flex items-center gap-2"><Code /> Developer & API</CardTitle>
                    <CardDescription>Generate API keys and configure webhooks for custom integrations.</CardDescription>
                </div>
                <Button onClick={handleGenerateKey}><PlusCircle size={16} className="mr-2"/>Generate API Key</Button>
            </div>
        </CardHeader>
        <CardContent>
             <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">API & Webhook Management</h3>
                <p className="text-sm text-slate-500 mt-1">
                    Your API keys, webhook endpoints, and developer documentation will appear here.
                </p>
            </div>
        </CardContent>
    </Card>
  );
}
