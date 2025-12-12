'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Copy, Gift, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const referrals = [
  {
    id: 'REF-001',
    name: 'Acme Corp',
    email: 'contact@acmecorp.com',
    date: '2024-05-10',
    status: 'Signed Up',
    reward: '$50 Credit',
  },
  {
    id: 'REF-002',
    name: 'Beta Industries',
    email: 'hr@betaind.com',
    date: '2024-05-12',
    status: 'Pending',
    reward: 'Pending',
  },
  {
    id: 'REF-003',
    name: 'Gamma Systems',
    email: 'info@gammasys.net',
    date: '2024-04-25',
    status: 'Completed',
    reward: '$50 Credit',
  },
];

export default function EmployerReferralsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Referral Program</h1>
            <p className="text-muted-foreground">Invite other companies and earn rewards.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-primary text-primary-foreground">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Gift className="h-6 w-6" /> Refer & Earn
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                    Invite a company to Zekkers and you both get <span className="font-bold text-white">$50 in job posting credits</span> when they post their first job.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 p-2 bg-white/10 rounded-md border border-white/20">
                        <Input 
                            readOnly 
                            value="https://zekkers.com/invite/ref_12345" 
                            className="bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0"
                        />
                        <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button variant="secondary" className="w-full font-semibold text-primary">
                        Share via Email
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Stats</CardTitle>
                <CardDescription>Track your referral success.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-slate-50 flex flex-col items-center justify-center text-center">
                    <Users className="h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground">Invites Sent</p>
                </div>
                <div className="p-4 border rounded-lg bg-slate-50 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-sm text-muted-foreground">Successful Referrals</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Referral History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date Invited</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Reward</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {referrals.map((ref) => (
                        <TableRow key={ref.id}>
                            <TableCell className="font-medium">{ref.name}</TableCell>
                            <TableCell>{ref.email}</TableCell>
                            <TableCell>{ref.date}</TableCell>
                            <TableCell>
                                <Badge variant={ref.status === 'Completed' ? 'default' : 'secondary'} className={ref.status === 'Completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                    {ref.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium text-green-600">
                                {ref.reward}
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
