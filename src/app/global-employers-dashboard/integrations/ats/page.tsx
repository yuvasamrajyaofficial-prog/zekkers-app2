
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Plug,
  KeyRound,
  Cog,
  Shield,
  Trash2,
  TestTube2,
  BookOpen,
  Search,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';

// --- Types ---
type IntegrationStatus = 'Connected' | 'Not Connected' | 'Error';
interface ATSIntegration {
  id: string;
  name: string;
  logo: React.ReactNode;
  status: IntegrationStatus;
  description: string;
}

// --- Mock Data ---
const mockIntegrations: ATSIntegration[] = [
  { id: 'greenhouse', name: 'Greenhouse', logo: <span className="font-bold text-2xl text-green-600">G</span>, status: 'Connected', description: 'Sync jobs and candidates with Greenhouse.' },
  { id: 'lever', name: 'Lever', logo: <span className="font-bold text-2xl text-orange-500">L</span>, status: 'Not Connected', description: 'Integrate your Lever talent pipeline.' },
  { id: 'workday', name: 'Workday', logo: <span className="font-bold text-2xl text-blue-600">W</span>, status: 'Not Connected', description: 'Connect with Workday Recruiting.' },
  { id: 'smartrecruiters', name: 'SmartRecruiters', logo: <span className="font-bold text-2xl text-cyan-500">S</span>, status: 'Not Connected', description: 'Sync your hiring process.' },
  { id: 'bamboohr', name: 'BambooHR', logo: <span className="font-bold text-2xl text-lime-600">B</span>, status: 'Not Connected', description: 'Connect your HRIS and ATS.' },
  { id: 'zoho', name: 'Zoho Recruit', logo: <span className="font-bold text-2xl text-red-500">Z</span>, status: 'Not Connected', description: 'Integrate with Zoho Recruit.' },
];

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Sub-Components ---
const IntegrationCard = ({ integration, onConfigure }: { integration: ATSIntegration; onConfigure: (integration: ATSIntegration) => void; }) => {
    const statusColors = {
        'Connected': 'bg-green-100 text-green-700',
        'Not Connected': 'bg-slate-100 text-slate-600',
        'Error': 'bg-red-100 text-red-600',
    };
    return (
        <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">{integration.logo}</div>
                        <div>
                            <p className="font-semibold">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">{integration.description}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge className={`mb-2 ${statusColors[integration.status]}`}>{integration.status}</Badge>
                        <Button variant={integration.status === 'Connected' ? 'outline' : 'default'} size="sm" onClick={() => onConfigure(integration)}>
                            {integration.status === 'Connected' ? 'Manage' : 'Connect'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const IntegrationDrawer = ({ integration, onClose }: { integration: ATSIntegration | null; onClose: () => void }) => {
    const { toast } = useToast();
    if (!integration) return null;

    const handleAction = (action: string) => {
        toast({ title: `${action} (Mock)`, description: `This would trigger the ${action.toLowerCase()} process for ${integration.name}.` });
    };

    return (
        <Sheet open={!!integration} onOpenChange={open => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-3 text-2xl">{integration.logo} {integration.name}</SheetTitle>
                    <SheetDescription>Manage your {integration.name} integration settings.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                     <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Cog/>Configuration</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="api-key">API Key</Label>
                                <Input id="api-key" placeholder="Enter your API Key..."/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="subdomain">Subdomain</Label>
                                <Input id="subdomain" placeholder="e.g., yourcompany.greenhouse.io"/>
                            </div>
                            <div className="flex justify-between items-center">
                                <Button onClick={() => handleAction('Save Configuration')}>Save</Button>
                                <Button variant="outline" onClick={() => handleAction('Test Connection')} className="gap-2"><TestTube2 size={16}/> Test Connection</Button>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg text-destructive"><Trash2/>Danger Zone</CardTitle></CardHeader>
                        <CardContent>
                            <Button variant="destructive" className="w-full" onClick={() => handleAction('Disconnect Integration')}>Disconnect {integration.name}</Button>
                        </CardContent>
                    </Card>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

// --- Main Component ---
export default function ATSIntegrations() {
  const [integrations] = useState(mockIntegrations);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ATSIntegration | null>(null);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [integrations, search]);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Plug className="text-primary" /> ATS Integrations
              </CardTitle>
              <CardDescription>
                Sync candidates, jobs, and stages with your primary Applicant Tracking System.
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2"><BookOpen size={16}/> View API Docs</Button>
          </div>
          <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search integrations..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredIntegrations.map(integration => (
              <IntegrationCard key={integration.id} integration={integration} onConfigure={setSelected} />
            ))}
          </motion.div>
          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No integrations found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      <IntegrationDrawer integration={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
