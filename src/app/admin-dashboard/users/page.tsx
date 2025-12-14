'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, ShieldCheck, Ban, Eye, Filter } from 'lucide-react';

// Mock Data for Users
const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'student', status: 'active', joined: '2023-10-15' },
  { id: 2, name: 'Tech Solutions Ltd', email: 'hr@techsolutions.com', role: 'employer', status: 'verified', joined: '2023-11-02' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com', role: 'student', status: 'banned', joined: '2023-09-20' },
  { id: 4, name: 'Global Corp', email: 'recruiting@globalcorp.com', role: 'global_employer', status: 'pending', joined: '2023-12-01' },
  { id: 5, name: 'City College', email: 'admin@citycollege.edu', role: 'college', status: 'verified', joined: '2023-08-10' },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>;
      case 'verified': return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Verified</Badge>;
      case 'pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Pending</Badge>;
      case 'banned': return <Badge variant="destructive">Banned</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
            <p className="text-slate-500">Manage all registered users, employers, and organizations.</p>
        </div>
        <Button>
            <ShieldCheck className="mr-2 h-4 w-4" /> Verify New Users
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">All Users</CardTitle>
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Search users..." 
                            className="pl-8" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-slate-500">{user.email}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="capitalize">{user.role.replace('_', ' ')}</Badge>
                            </TableCell>
                            <TableCell>
                                {getStatusBadge(user.status)}
                            </TableCell>
                            <TableCell className="text-slate-500">
                                {user.joined}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            <Eye className="mr-2 h-4 w-4" /> View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <ShieldCheck className="mr-2 h-4 w-4" /> Verify User
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                            <Ban className="mr-2 h-4 w-4" /> Ban User
                                        </DropdownMenuItem>
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
