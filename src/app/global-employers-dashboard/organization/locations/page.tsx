
'use client';
import React, { useState, useMemo } from 'react';
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
  Building,
  PlusCircle,
  Search,
  MoreVertical,
  MapPin,
  Mail,
  Phone,
  Users,
  Clock,
  Trash2,
  Edit,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// --- Types ---
type Office = {
  id: string;
  name: string;
  type: 'Headquarters' | 'Regional Hub' | 'Sales Office' | 'R&D Center';
  address: string;
  country: string;
  phone: string;
  email: string;
  timezone: string;
  employeeCount: number;
};

// --- Mock Data ---
const mockOffices: Office[] = [
  { id: 'loc-1', name: 'Global Headquarters', type: 'Headquarters', address: '123 Innovation Drive, Silicon Valley', country: 'USA', phone: '+1-415-555-0199', email: 'hq@globalcorp.com', timezone: 'PST (UTC-8)', employeeCount: 1200 },
  { id: 'loc-2', name: 'EMEA Sales Office', type: 'Sales Office', address: 'Unter den Linden 1, Berlin', country: 'Germany', phone: '+49-30-555-0100', email: 'emea@globalcorp.com', timezone: 'CET (UTC+1)', employeeCount: 250 },
  { id: 'loc-3', name: 'APAC R&D Center', type: 'R&D Center', address: '1 Fusionopolis Way, Singapore', country: 'Singapore', phone: '+65-6555-0123', email: 'apac-dev@globalcorp.com', timezone: 'SGT (UTC+8)', employeeCount: 400 },
  { id: 'loc-4', name: 'India Operations Hub', type: 'Regional Hub', address: 'Cyber Hub, Gurugram', country: 'India', phone: '+91-124-555-0155', email: 'india-ops@globalcorp.com', timezone: 'IST (UTC+5:30)', employeeCount: 800 },
];


// --- Animation Variants ---
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

// --- Sub-Components ---
const OfficeCard = ({ office, onDelete }: { office: Office; onDelete: (id: string) => void }) => (
    <motion.div variants={itemVariants} className="h-full">
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="truncate">{office.name}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">{office.type}</Badge>
                </div>
                 <CardDescription className="flex items-center gap-2 pt-1"><MapPin size={14}/>{office.address}, {office.country}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between bg-slate-50/50 p-4">
                 <div className="text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-1.5 truncate"><Phone size={14}/> <span className="truncate">{office.phone}</span></div>
                    <div className="flex items-center gap-1.5 truncate"><Mail size={14}/> <span className="truncate">{office.email}</span></div>
                    <div className="flex items-center gap-1.5"><Users size={14}/> {office.employeeCount} Employees</div>
                    <div className="flex items-center gap-1.5"><Clock size={14}/> {office.timezone}</div>
                </div>
                 <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm"><Edit size={14} className="mr-2"/>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(office.id)}><Trash2 size={14} className="mr-2"/>Delete</Button>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);


// --- Main Component ---
export default function OfficesLocations() {
    const [offices, setOffices] = useState(mockOffices);
    const [search, setSearch] = useState('');
    const { toast } = useToast();

    const filteredOffices = useMemo(() => {
        return offices.filter(o => 
            o.name.toLowerCase().includes(search.toLowerCase()) || 
            o.country.toLowerCase().includes(search.toLowerCase())
        );
    }, [offices, search]);

    const handleCreate = () => {
        toast({ title: "Add New Location (Mock)", description: "This would open a form to add a new office location." });
    };

    const handleDelete = (id: string) => {
        if(confirm('Are you sure you want to delete this location?')) {
            setOffices(prev => prev.filter(o => o.id !== id));
            toast({ title: "Location Deleted", variant: "destructive" });
        }
    };

    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-full">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl font-bold flex items-center gap-3"><Building /> Offices & Locations</CardTitle>
                            <CardDescription>Manage your global offices, timezones, and contact points.</CardDescription>
                        </div>
                        <Button onClick={handleCreate} className="w-full md:w-auto"><PlusCircle size={16} className="mr-2"/> Add New Location</Button>
                    </div>
                    <div className="relative pt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Search by office name or country..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                </CardHeader>
                <CardContent>
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredOffices.length > 0 ? (
                            filteredOffices.map(office => (
                                <OfficeCard key={office.id} office={office} onDelete={handleDelete} />
                            ))
                        ) : (
                            <div className="md:col-span-2 text-center py-16 text-muted-foreground">
                                No locations found matching your search.
                            </div>
                        )}
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
}
