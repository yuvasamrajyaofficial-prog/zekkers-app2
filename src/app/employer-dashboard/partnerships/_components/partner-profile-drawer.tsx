
'use client';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Star,
  PlusCircle,
  BookOpen,
  Users,
} from 'lucide-react';
import type { Partner } from '@/services/partners';
import { Separator } from '@/components/ui/separator';

interface PartnerProfileDrawerProps {
  partner: Partner | null;
  onClose: () => void;
}

const StatItem = ({icon, label, value}: {icon: React.ReactNode, label: string, value: string | number}) => (
    <div className="p-3 border rounded-lg bg-slate-50/50">
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">{icon} {label}</div>
        <div className="text-xl font-bold mt-1">{value}</div>
    </div>
)

export const PartnerProfileDrawer: React.FC<PartnerProfileDrawerProps> = ({
  partner,
  onClose,
}) => {
  if (!partner) return null;

  return (
    <Sheet open={!!partner} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-3xl overflow-y-auto">
        <SheetHeader className="relative">
            <div className="h-32 bg-slate-100 rounded-lg">
                {partner.banner && <Image src={partner.banner} alt={`${partner.name} banner`} layout="fill" objectFit="cover" className="rounded-lg"/>}
            </div>
            <div className="flex items-end gap-4 -mt-12 px-4">
                 <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-background bg-background shadow-md"
                />
                <div>
                    <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                        {partner.name}
                        {partner.kycStatus === 'verified' && <ShieldCheck className="w-6 h-6 text-blue-500"/>}
                    </SheetTitle>
                    <SheetDescription className="text-base">
                        {partner.type} • {partner.location}
                    </SheetDescription>
                </div>
            </div>
        </SheetHeader>

        <div className="py-6 px-1 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatItem icon={<Users size={14}/>} label="Students" value={partner.studentCount.toLocaleString()} />
                <StatItem icon={<Star size={14}/>} label="Placement Rate" value={`${partner.placementRate}%`} />
                <StatItem icon={<Briefcase size={14}/>} label="Avg. Package" value={`${partner.avgPackage} LPA`} />
                <StatItem icon={<BookOpen size={14}/>} label="Top Programs" value={partner.topPrograms.length} />
            </div>

            <Separator/>
            
            <div>
                 <h3 className="font-semibold text-lg mb-2">Top Programs & Skills</h3>
                 <div className="flex flex-wrap gap-2">
                    {partner.topPrograms.map(p => <Badge key={p}>{p}</Badge>)}
                 </div>
            </div>
             <div>
                 <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                 <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Mail size={14}/> {partner.contact.email}</p>
                    <p className="flex items-center gap-2"><Phone size={14}/> {partner.contact.phone}</p>
                 </div>
            </div>

        </div>

        <SheetFooter className="flex-col sm:flex-row sm:justify-start gap-2">
            {partner.partnershipStatus === 'Not Connected' && (
                <Button><PlusCircle size={16} className="mr-2"/> Request Partnership</Button>
            )}
             {partner.partnershipStatus === 'Connected' && (
                <Button><Briefcase size={16} className="mr-2"/> Start a Drive</Button>
            )}
          <Button variant="outline">Message TPO</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
