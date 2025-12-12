'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, GraduationCap, Building2, Handshake, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const partners = [
  {
    id: 'PRT-101',
    name: 'University of Oxford',
    type: 'University',
    location: 'Oxford, UK',
    students: '24,000+',
    status: 'Strategic Partner',
    logo: 'O',
  },
  {
    id: 'PRT-102',
    name: 'National University of Singapore',
    type: 'University',
    location: 'Singapore',
    students: '30,000+',
    status: 'Recruiting Partner',
    logo: 'N',
  },
  {
    id: 'PRT-103',
    name: 'Global Tech NGO',
    type: 'NGO',
    location: 'Worldwide',
    students: '10,000+',
    status: 'CSR Partner',
    logo: 'G',
  },
];

export default function PartnershipsPage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Global Partnerships</h1>
            <p className="text-muted-foreground">Manage relationships with universities and NGOs worldwide.</p>
        </div>
        <Button>
            <Handshake className="mr-2 h-4 w-4" /> Initiate Partnership
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search partners..."
              className="pl-8 bg-white"
            />
        </div>
      </div>

      <Tabs defaultValue="universities" className="w-full">
        <TabsList>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="ngos">NGOs</TabsTrigger>
            <TabsTrigger value="agencies">Recruitment Agencies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="universities" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner) => (
                    <Card key={partner.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-24 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10"></div>
                        <CardContent className="pt-0 relative">
                            <div className="h-16 w-16 rounded-lg bg-white shadow-sm border flex items-center justify-center text-2xl font-bold text-primary absolute -top-8 left-6">
                                {partner.logo}
                            </div>
                            <div className="mt-10 space-y-2">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">{partner.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            {partner.type === 'University' ? <GraduationCap className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                                            {partner.type}
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
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

                                <div className="pt-4 grid grid-cols-2 gap-2">
                                    <Button variant="outline" className="w-full">Events</Button>
                                    <Button className="w-full">Contact</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="ngos"><div className="p-8 text-center text-muted-foreground">NGO partners list would appear here.</div></TabsContent>
        <TabsContent value="agencies"><div className="p-8 text-center text-muted-foreground">Agency partners list would appear here.</div></TabsContent>
      </Tabs>
    </div>
  );
}
