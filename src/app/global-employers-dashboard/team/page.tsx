'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, MoreHorizontal, Shield, Mail } from 'lucide-react';
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

const teamMembers = [
  {
    id: 'TM-001',
    name: 'Sarah Connor',
    email: 'sarah.c@globalcorp.com',
    role: 'Admin',
    location: 'New York, USA',
    status: 'Active',
    avatar: 'SC',
  },
  {
    id: 'TM-002',
    name: 'Raj Patel',
    email: 'raj.p@globalcorp.com',
    role: 'Recruiter',
    location: 'Mumbai, India',
    status: 'Active',
    avatar: 'RP',
  },
  {
    id: 'TM-003',
    name: 'Elena Ivanova',
    email: 'elena.i@globalcorp.com',
    role: 'Hiring Manager',
    location: 'Berlin, Germany',
    status: 'Away',
    avatar: 'EI',
  },
  {
    id: 'TM-004',
    name: 'Kenji Sato',
    email: 'kenji.s@globalcorp.com',
    role: 'Recruiter',
    location: 'Tokyo, Japan',
    status: 'Active',
    avatar: 'KS',
  },
];

export default function TeamPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">Manage users, roles, and access permissions across regions.</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>All active users in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teamMembers.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={`/avatars/${member.id}.png`} alt={member.name} />
                                        <AvatarFallback>{member.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {member.role === 'Admin' && <Shield className="h-3 w-3 text-blue-500" />}
                                    {member.role}
                                </div>
                            </TableCell>
                            <TableCell>{member.location}</TableCell>
                            <TableCell>
                                <Badge variant={member.status === 'Active' ? 'default' : 'secondary'} className={member.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                    {member.status}
                                </Badge>
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
                                        <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                        <DropdownMenuItem>View Activity</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Remove User</DropdownMenuItem>
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
