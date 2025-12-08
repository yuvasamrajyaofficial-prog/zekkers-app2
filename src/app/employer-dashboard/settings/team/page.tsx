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
import { Input } from '@/components/ui/input';
import {
  Users2,
  PlusCircle,
  Shield,
  MoreHorizontal,
  Search,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

// --- Mock Data ---
const mockTeamMembers = [
  {
    id: 'user1',
    name: 'Rohit Mehra',
    email: 'rohit.mehra@zekktech.com',
    role: 'Company Admin',
    lastActive: '2 hours ago',
    status: 'Active',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl,
  },
  {
    id: 'user2',
    name: 'Anjali Desai',
    email: 'anjali.desai@zekktech.com',
    role: 'Recruiter',
    lastActive: '5 hours ago',
    status: 'Active',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl,
  },
  {
    id: 'user3',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'Interviewer',
    lastActive: '3 days ago',
    status: 'Pending Invite',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar3')?.imageUrl,
  },
   {
    id: 'user4',
    name: 'Sameer Khan',
    email: 'sameer.khan@zekktech.com',
    role: 'Recruiter',
    lastActive: '1 day ago',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&q=80',
  },
    {
    id: 'user5',
    name: 'Sunita Williams',
    email: 'sunita.w@zekktech.com',
    role: 'Recruiter',
    lastActive: '2 weeks ago',
    status: 'Suspended',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80',
  },
];

type TeamMember = typeof mockTeamMembers[0];

const statusColors: { [key: string]: string } = {
  Active: 'bg-green-100 text-green-700',
  'Pending Invite': 'bg-amber-100 text-amber-700',
  Suspended: 'bg-red-100 text-red-700',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};


const TeamMemberRow = ({ member }: { member: TeamMember }) => (
    <motion.tr variants={itemVariants} className="hover:bg-slate-50">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{member.role}</Badge>
      </TableCell>
      <TableCell>{member.lastActive}</TableCell>
      <TableCell>
        <Badge className={statusColors[member.status]}>{member.status}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><User className="mr-2 h-4 w-4" />View Profile</DropdownMenuItem>
            <DropdownMenuItem><Calendar className="mr-2 h-4 w-4" />View Activity</DropdownMenuItem>
            <DropdownMenuItem><FileText className="mr-2 h-4 w-4" />Edit Permissions</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </motion.tr>
);


// --- Main Page Component ---
export default function TeamSettingsPage() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return teamMembers;
    return teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teamMembers, searchQuery]);

  const handleInvite = () => {
    toast({
        title: "Invitation Sent (Mock)",
        description: "In a real application, an email would be sent to the new team member.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2"><Users2 /> Team & Roles</CardTitle>
              <CardDescription>Manage who has access to your company's dashboard.</CardDescription>
            </div>
            <Button className="gap-2" onClick={handleInvite}><PlusCircle size={16}/> Invite Member</Button>
          </div>
           <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or email..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TeamMemberRow key={member.id} member={member} />
                ))}
              </TableBody>
            </Table>
             {filteredMembers.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    No team members found for your search.
                </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
