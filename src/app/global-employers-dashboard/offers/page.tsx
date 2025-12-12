'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FileText, CheckCircle2, Clock, Send, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const offers = [
  {
    id: 'OFF-001',
    candidate: 'John Doe',
    role: 'Senior Developer',
    location: 'Remote (UK)',
    salary: '£75,000',
    sent: '2 days ago',
    status: 'Pending',
    expires: '3 days',
  },
  {
    id: 'OFF-002',
    candidate: 'Jane Smith',
    role: 'Product Manager',
    location: 'New York, USA',
    salary: '$140,000',
    sent: '1 week ago',
    status: 'Accepted',
    expires: '-',
  },
  {
    id: 'OFF-003',
    candidate: 'Carlos Ruiz',
    role: 'UX Designer',
    location: 'Madrid, Spain',
    salary: '€55,000',
    sent: '3 days ago',
    status: 'Negotiating',
    expires: '4 days',
  },
];

export default function OffersPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Offers & Onboarding</h1>
            <p className="text-muted-foreground">Manage job offers and candidate onboarding progress.</p>
        </div>
        <Button>
            <Send className="mr-2 h-4 w-4" /> Create New Offer
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search offers..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-700">5</div>
                <p className="text-xs font-medium text-blue-600">Pending Offers</p>
            </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-700">12</div>
                <p className="text-xs font-medium text-green-600">Accepted This Month</p>
            </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
            <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-700">85%</div>
                <p className="text-xs font-medium text-purple-600">Acceptance Rate</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Offers</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Expires In</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {offers.map((offer) => (
                        <TableRow key={offer.id}>
                            <TableCell className="font-medium">{offer.candidate}</TableCell>
                            <TableCell>{offer.role}</TableCell>
                            <TableCell>{offer.location}</TableCell>
                            <TableCell>
                                <Badge variant={offer.status === 'Accepted' ? 'default' : offer.status === 'Pending' ? 'secondary' : 'outline'}
                                    className={offer.status === 'Accepted' ? 'bg-green-100 text-green-700 hover:bg-green-100' : offer.status === 'Negotiating' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : ''}>
                                    {offer.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{offer.expires}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Download className="h-4 w-4" />
                                </Button>
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
