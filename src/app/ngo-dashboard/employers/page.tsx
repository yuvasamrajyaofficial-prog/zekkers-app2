'use client';
import React, { useState, useMemo, useCallback } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Handshake,
  Search,
  PlusCircle,
  Mail,
  Users,
  CheckCircle,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { MOCK_PARTNERS } from '@/services/partners';
import type { Partner } from '@/services/partners';
import { PartnerCard } from './_components/partner-card';
import { PartnerProfileDrawer } from './_components/partner-profile-drawer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const KpiCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
)

export default function NgoEmployersPage() {
  const [partners] = useState<Partner[]>(MOCK_PARTNERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewingPartner, setViewingPartner] = useState<Partner | null>(null);

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        partner.name.toLowerCase().includes(searchLower) ||
        partner.location.toLowerCase().includes(searchLower);
      const matchesType = typeFilter === 'all' || partner.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [partners, searchQuery, typeFilter]);
  
  const kpiStats = useMemo(() => ({
    total: partners.length,
    hiring: partners.filter(p => p.partnershipStatus === 'Connected').length,
    placed: partners.reduce((acc, p) => acc + p.placementRate, 0), // This is a mock calc
    international: partners.filter(p => p.location !== 'India').length
  }), [partners]);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Handshake className="text-primary" />
                Employer Partners
              </CardTitle>
              <CardDescription className="mt-1">
                Manage hiring partners, track placements, and build relationships.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <Mail size={16} className="mr-2" /> View Requests
              </Button>
              <Button>
                <PlusCircle size={16} className="mr-2" /> Find New Partner
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KpiCard title="Total Partners" value={kpiStats.total} icon={<Users/>} />
            <KpiCard title="Active Hiring" value={kpiStats.hiring} icon={<CheckCircle/>} />
            <KpiCard title="Students Placed" value={kpiStats.placed} icon={<TrendingUp/>} />
            <KpiCard title="International Partners" value={kpiStats.international} icon={<Globe/>} />
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-slate-50">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, location, skills..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Partner Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Partner Types</SelectItem>
                <SelectItem value="University">University</SelectItem>
                <SelectItem value="College">College</SelectItem>
                <SelectItem value="NGO">NGO</SelectItem>
                <SelectItem value="Training Institute">Training Institute</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            {filteredPartners.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                  <Handshake className="w-12 h-12 mx-auto text-slate-400" />
                  <h3 className="mt-4 font-semibold text-lg">No Employer Partners Found</h3>
                  <p className="text-sm text-slate-500 mt-1">
                      Try adjusting your filters or add a new partner.
                  </p>
              </div>
            ) : (
              <motion.div
                  key={typeFilter + searchQuery}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                  {filteredPartners.map(partner => (
                      <PartnerCard key={partner.id} partner={partner} onViewProfile={() => setViewingPartner(partner)} />
                  ))}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
      
       <PartnerProfileDrawer
        partner={viewingPartner}
        onClose={() => setViewingPartner(null)}
      />
    </div>
  );
}
