'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal, Building2, GraduationCap, HeartHandshake } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const tenants = [
  {
    id: 'TNT-001',
    name: 'TechCorp Solutions',
    type: 'Employer',
    users: 12,
    status: 'Active',
    joined: '2024-01-15',
  },
  {
    id: 'TNT-002',
    name: 'Global University',
    type: 'College',
    users: 450,
    status: 'Active',
    joined: '2024-02-20',
  },
  {
    id: 'TNT-003',
    name: 'Helping Hands NGO',
    type: 'NGO',
    users: 5,
    status: 'Pending',
    joined: '2024-05-12',
  },
  {
    id: 'TNT-004',
    name: 'Innovate Inc.',
    type: 'Employer',
    users: 25,
    status: 'Suspended',
    joined: '2023-11-05',
  },
  {
    id: 'TNT-005',
    name: 'City College',
    type: 'College',
    users: 1200,
    status: 'Active',
    joined: '2023-09-01',
  },
];

export default function AdminTenantsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Tenants</h1>
            <p className="text-muted-foreground">Manage organizations, colleges, and NGOs.</p>
        </div>
        <Button>
            <Building2 className="mr-2 h-4 w-4" /> Add Tenant
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tenants..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>All Tenants</CardTitle>
            <CardDescription>A list of all registered organizations on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Users</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                                        {tenant.type === 'Employer' && <Building2 className="h-4 w-4" />}
                                        {tenant.type === 'College' && <GraduationCap className="h-4 w-4" />}
                                        {tenant.type === 'NGO' && <HeartHandshake className="h-4 w-4" />}
                                    </div>
                                    {tenant.name}
                                </div>
                            </TableCell>
                            <TableCell>{tenant.type}</TableCell>
                            <TableCell>{tenant.users}</TableCell>
                            <TableCell>
                                <Badge variant={tenant.status === 'Active' ? 'default' : tenant.status === 'Pending' ? 'secondary' : 'destructive'} 
                                    className={tenant.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : tenant.status === 'Pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : ''}>
                                    {tenant.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{tenant.joined}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Manage Users</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Suspend Tenant</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
