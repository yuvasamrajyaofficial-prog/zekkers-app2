'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Building2, GraduationCap, Handshake, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const partners = [
  {
    id: 'PRT-001',
    name: 'Tech Institute of Technology',
    type: 'College',
    location: 'San Francisco, CA',
    students: '5,000+',
    status: 'Connected',
    logo: 'T',
  },
  {
    id: 'PRT-002',
    name: 'Global Business School',
    type: 'College',
    location: 'New York, NY',
    students: '2,500+',
    status: 'Pending',
    logo: 'G',
  },
  {
    id: 'PRT-003',
    name: 'Code for Good',
    type: 'NGO',
    location: 'Remote',
    students: '1,200+',
    status: 'Available',
    logo: 'C',
  },
  {
    id: 'PRT-004',
    name: 'Engineering Excellence Univ',
    type: 'College',
    location: 'Boston, MA',
    students: '8,000+',
    status: 'Available',
    logo: 'E',
  },
];

export default function EmployerPartnershipsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Partnerships</h1>
            <p className="text-muted-foreground">Connect with colleges and NGOs for campus hiring.</p>
        </div>
        <Button>
            <Handshake className="mr-2 h-4 w-4" /> New Partnership Request
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search colleges or NGOs..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
            <TabsTrigger value="all">All Partners</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="available">Available to Connect</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner) => (
                    <Card key={partner.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-24 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-10"></div>
                        <CardContent className="pt-0 relative">
                            <div className="h-16 w-16 rounded-lg bg-white shadow-sm border flex items-center justify-center text-2xl font-bold text-primary absolute -top-8 left-6">
                                {partner.logo}
                            </div>
                            <div className="mt-10 space-y-2">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">{partner.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            {partner.type === 'College' ? <GraduationCap className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                                            {partner.type}
                                        </div>
                                    </div>
                                    <Badge variant={partner.status === 'Connected' ? 'default' : partner.status === 'Pending' ? 'secondary' : 'outline'}
                                        className={partner.status === 'Connected' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
                                        {partner.status}
                                    </Badge>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {partner.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Building2 className="h-3 w-3" /> {partner.students} Students
                                    </div>
                                </div>

                                <div className="pt-4">
                                    {partner.status === 'Connected' ? (
                                        <Button variant="outline" className="w-full">View Profile</Button>
                                    ) : partner.status === 'Pending' ? (
                                        <Button variant="secondary" className="w-full" disabled>Request Sent</Button>
                                    ) : (
                                        <Button className="w-full">Connect</Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
        {/* Other tabs would filter the list above */}
        <TabsContent value="connected"><div className="p-8 text-center text-muted-foreground">Filtered view would appear here.</div></TabsContent>
        <TabsContent value="pending"><div className="p-8 text-center text-muted-foreground">Filtered view would appear here.</div></TabsContent>
        <TabsContent value="available"><div className="p-8 text-center text-muted-foreground">Filtered view would appear here.</div></TabsContent>
      </Tabs>
    </div>
  );
}
