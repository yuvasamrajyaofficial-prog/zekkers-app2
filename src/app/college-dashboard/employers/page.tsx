
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useEmployers } from '@/hooks/useEmployers';
import { Employer } from '@/services/employers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Building, Briefcase, Globe, CheckCircle } from 'lucide-react';
import ZLoader from '@/components/ui/loader';
import { StatCard } from './_components/StatCard';
import { EmployerCard } from './_components/EmployerCard';
import { ProfileDrawer } from './_components/ProfileDrawer';

export default function EmployerPartnersPage() {
  const { employers, loading } = useEmployers('demo-college');
  const [query, setQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Employer | null>(null);

  useEffect(() => {
    if (activeId) {
      const e = employers.find(emp => emp.id === activeId);
      setProfile(e || null);
    } else {
      setProfile(null);
    }
  }, [activeId, employers]);

  const stats = useMemo(() => {
    const total = employers.length;
    const verified = employers.filter(e => e.verified).length;
    const jobs = employers.reduce((a, b) => a + (b.jobsCount || 0), 0);
    const countries = Array.from(new Set(employers.map(e => e.country).filter((item): item is string => !!item)));
    return { total, verified, jobs, countries };
  }, [employers]);

  const filtered = useMemo(() => {
    return employers.filter(e =>
      (e.name.toLowerCase().includes(query.toLowerCase()) || e.industry?.toLowerCase().includes(query.toLowerCase())) &&
      (countryFilter === 'all' || e.country === countryFilter)
    );
  }, [employers, query, countryFilter]);

  const onFollow = async (id: string) => {
    // Mock follow logic
    alert(`Following employer ${id} (mock implementation)`);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Building className="w-6 h-6 text-primary" />
                Employer Partners
              </CardTitle>
              <CardDescription className="mt-1">
                Trusted government, private and international companies hiring through Zekkers.
              </CardDescription>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search employers or industry..."
                className="pl-9"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Employers" value={stats.total} icon={<Building size={16} className="text-muted-foreground" />} />
            <StatCard title="Verified Partners" value={stats.verified} icon={<CheckCircle size={16} className="text-muted-foreground" />} />
            <StatCard title="Open Jobs" value={stats.jobs.toLocaleString()} icon={<Briefcase size={16} className="text-muted-foreground" />} />
            <StatCard title="Countries" value={stats.countries.length} icon={<Globe size={16} className="text-muted-foreground" />} />
          </div>

          <div className="mb-6">
            <Select onValueChange={setCountryFilter} value={countryFilter}>
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Filter by country..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {stats.countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><ZLoader /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(emp => (
                <EmployerCard key={emp.id} emp={emp} onView={id => setActiveId(id)} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ProfileDrawer emp={profile} onClose={() => setActiveId(null)} onFollow={onFollow} />
    </div>
  );
};
