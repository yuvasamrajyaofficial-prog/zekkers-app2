'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KeyRound, PlusCircle, Copy, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ApiKeysPage() {
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
                    <CardTitle className="flex items-center gap-2"><KeyRound /> Developer API Keys</CardTitle>
                    <CardDescription>Generate and manage API keys for your applications.</CardDescription>
                </div>
                <Button onClick={handleGenerateKey}><PlusCircle size={16} className="mr-2"/>Create New Key</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Label</TableHead>
                            <TableHead>Key</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Production Key</TableCell>
                            <TableCell><Badge variant="secondary">prod_sk_...xxxx</Badge></TableCell>
                            <TableCell>Jul 20, 2024</TableCell>
                            <TableCell className="flex gap-1">
                                <Button variant="ghost" size="icon" className="w-8 h-8"><Copy size={14}/></Button>
                                <Button variant="ghost" size="icon" className="w-8 h-8"><Trash2 size={14}/></Button>
                            </TableCell>
                        </TableRow>
                          <TableRow>
                            <TableCell>Staging Key</TableCell>
                            <TableCell><Badge variant="secondary">staging_sk_...yyyy</Badge></TableCell>
                            <TableCell>Jun 15, 2024</TableCell>
                            <TableCell className="flex gap-1">
                                <Button variant="ghost" size="icon" className="w-8 h-8"><Copy size={14}/></Button>
                                <Button variant="ghost" size="icon" className="w-8 h-8"><Trash2 size={14}/></Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </CardContent>
    </Card>
  );
}
