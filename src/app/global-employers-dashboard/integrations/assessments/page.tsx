'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ClipboardCheck,
  Cog,
  Trash2,
  TestTube2,
  BookOpen,
  KeyRound,
  Webhook,
  Shield,
  Code2,
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
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- Types ---
type IntegrationStatus = 'Connected' | 'Not Connected' | 'Error';
interface AssessmentIntegration {
  id: string;
  name: string;
  logo: React.ReactNode;
  status: IntegrationStatus;
  description: string;
}

// --- Mock Data ---
const mockIntegrations: AssessmentIntegration[] = [
  { id: 'hackerrank', name: 'HackerRank', logo: <Code2 className="text-green-500" />, status: 'Connected', description: 'Technical assessments for developers.' },
  { id: 'testgorilla', name: 'TestGorilla', logo: <Cog className="text-blue-500" />, status: 'Not Connected', description: 'Wide range of skills tests.' },
  { id: 'codility', name: 'Codility', logo: <Code2 className="text-purple-500" />, status: 'Not Connected', description: 'Code tests for engineering teams.' },
  { id: 'custom', name: 'Custom Runner', logo: <Cog className="text-slate-500" />, status: 'Not Connected', description: 'Integrate your own assessment platform.' },
];

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Sub-Components ---
const IntegrationCard = ({ integration, onConfigure }: { integration: AssessmentIntegration; onConfigure: (integration: AssessmentIntegration) => void; }) => {
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
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl font-bold">{integration.logo}</div>
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

const IntegrationDrawer = ({ integration, onClose }: { integration: AssessmentIntegration | null; onClose: () => void }) => {
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
export default function AssessmentProvidersPage() {
  const [selected, setSelected] = useState<AssessmentIntegration | null>(null);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <ClipboardCheck className="text-primary" /> Assessment Providers
              </CardTitle>
              <CardDescription>
                Connect platforms like HackerRank, TestGorilla, or your own custom assessment runner.
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2"><BookOpen size={16}/> View Docs</Button>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {mockIntegrations.map(integration => (
              <IntegrationCard key={integration.id} integration={integration} onConfigure={setSelected} />
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <IntegrationDrawer integration={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
