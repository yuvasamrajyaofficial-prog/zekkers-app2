
'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users2,
  PlusCircle,
  MoreHorizontal,
  Search,
  User,
  Calendar,
  Edit,
  Trash2,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

// --- Types ---
type RecruiterStatus = 'Active' | 'Inactive' | 'Pending Invite';
type Recruiter = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  countries: string[];
  status: RecruiterStatus;
  lastLogin: string;
};

// --- Mock Data ---
const mockRecruiters: Recruiter[] = [
  { id: 'rec-1', name: 'Elena Petrova', email: 'elena.p@globalcorp.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl || '', role: 'Lead Recruiter - EMEA', countries: ['Germany', 'UK', 'France'], status: 'Active', lastLogin: '2 hours ago' },
  { id: 'rec-2', name: 'John Smith', email: 'john.s@globalcorp.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl || '', role: 'Sourcer - AMER', countries: ['USA', 'Canada'], status: 'Active', lastLogin: '1 day ago' },
  { id: 'rec-3', name: 'Priya Sharma', email: 'priya.s@globalcorp.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar3')?.imageUrl || '', role: 'Recruiter - APAC', countries: ['India', 'Singapore', 'Japan'], status: 'Active', lastLogin: '8 hours ago' },
  { id: 'rec-4', name: 'Kenji Tanaka', email: 'kenji.t@example.com', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&q=80', role: 'Recruiter - Japan', countries: ['Japan'], status: 'Pending Invite', lastLogin: 'N/A' },
  { id: 'rec-5', name: 'Fatima Al-Fassi', email: 'fatima.a@globalcorp.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80', role: 'Coordinator - MENA', countries: ['UAE', 'Saudi Arabia'], status: 'Inactive', lastLogin: '2 weeks ago' },
];

const statusColors: { [key in RecruiterStatus]: string } = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-slate-100 text-slate-600',
  'Pending Invite': 'bg-amber-100 text-amber-700',
};

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };


const TeamMemberRow = ({ member, onDelete }: { member: Recruiter, onDelete: (id: string) => void }) => (
    <motion.tr variants={itemVariants} className="hover:bg-slate-50">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{member.role}</Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {member.countries.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
        </div>
      </TableCell>
      <TableCell>
        <Badge className={statusColors[member.status]}>{member.status}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuItem><Edit size={14} className="mr-2"/>Edit Permissions</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete(member.id)}><Trash2 size={14} className="mr-2"/>Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </motion.tr>
);


// --- Main Component ---
export default function MultiCountryRecruiters() {
  const [recruiters, setRecruiters] = useState(mockRecruiters);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const filteredRecruiters = useMemo(() => {
    return recruiters.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.countries.join(',').toLowerCase().includes(search.toLowerCase())
    );
  }, [recruiters, search]);

  const handleInvite = () => {
    toast({ title: "Invite Sent (Mock)", description: "This would open a modal to invite a new recruiter and assign roles/countries." });
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this recruiter?')) {
        setRecruiters(prev => prev.filter(r => r.id !== id));
        toast({ title: "Recruiter Removed", variant: 'destructive'});
    }
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3"><Users2 /> Multi-country Recruiters</CardTitle>
              <CardDescription>Manage regional recruiter teams and their country scopes.</CardDescription>
            </div>
            <Button onClick={handleInvite} className="w-full md:w-auto"><PlusCircle size={16} className="mr-2"/> Invite Recruiter</Button>
          </div>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Search by name, email, or country..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
           <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recruiter</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Country Scope</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                {filteredRecruiters.map(recruiter => (
                  <TeamMemberRow key={recruiter.id} member={recruiter} onDelete={handleDelete} />
                ))}
              </motion.tbody>
            </Table>
            {filteredRecruiters.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">No recruiters found.</div>
            )}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
