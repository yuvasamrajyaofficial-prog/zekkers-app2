
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RolesPage() {
    const { toast } = useToast();

    const handleCreateRole = () => {
        toast({
            title: "Create Role (Mock)",
            description: "This would open a modal to create a new role with specific permissions.",
        });
    };

  return (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="flex items-center gap-2"><ShieldCheck /> Roles & Permissions</CardTitle>
                    <CardDescription>Define custom roles and manage access control for your team.</CardDescription>
                </div>
                <Button onClick={handleCreateRole}><PlusCircle size={16} className="mr-2"/>Create Role</Button>
            </div>
        </CardHeader>
        <CardContent>
             <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                <h3 className="font-semibold text-lg">Role-Based Access Control (RBAC)</h3>
                <p className="text-sm text-slate-500 mt-1">
                    A permission matrix for creating and managing roles will be built here.
                </p>
            </div>
        </CardContent>
    </Card>
  );
}
