
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
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Cog,
  Trash2,
  TestTube2,
  BookOpen,
  Bell,
  Users,
  Calendar,
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
import { Checkbox } from '@/components/ui/checkbox';

// --- Types ---
type IntegrationStatus = 'Connected' | 'Not Connected';
interface ChatIntegration {
  id: string;
  name: string;
  logo: React.ReactNode;
  status: IntegrationStatus;
  description: string;
}

// --- Mock Data ---
const mockIntegrations: ChatIntegration[] = [
  { id: 'slack', name: 'Slack', logo: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.8 122.8" className="h-8 w-8"><path fill="#e01e5a" d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9z"/><path fill="#e01e5a" d="M32.2 77.6c-7.1 0-12.9-5.8-12.9-12.9S25.1 51.8 32.2 51.8s12.9 5.8 12.9 12.9v25.8H32.2z"/><path fill="#36c5f0" d="M45.1 25.8c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v12.9H45.1V25.8z"/><path fill="#36c5f0" d="M45.1 32.2c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H19.3c-7.1 0-12.9-5.8-12.9-12.9S12.2 32.2 19.3 32.2h25.8z"/><path fill="#2eb67d" d="M97 45.1c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.1z"/><path fill="#2eb67d" d="M90.7 45.1c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.8c-7.1 0-12.9-5.8-12.9-12.9V19.3h12.9s12.9 0 12.9 12.9v12.9z"/><path fill="#ecb22e" d="M77.6 97c0 7.1-5.8 12.9-12.9 12.9S51.8 104.1 51.8 97s5.8-12.9 12.9-12.9H77.6V97z"/><path fill="#ecb22e" d="M77.6 90.7c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h25.8c7.1 0 12.9 5.8 12.9 12.9S110.5 90.7 103.4 90.7H77.6z"/></svg>, status: 'Connected', description: 'Real-time notifications in your Slack channels.' },
  { id: 'teams', name: 'Microsoft Teams', logo: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="h-8 w-8"><path fill="#4B53BC" d="M12.83 20.91c-.41.06-.82.09-1.24.09-3.7 0-6.7-3-6.7-6.7V8.5h4v5.8c0 1.51 1.25 2.7 2.7 2.7.41 0 .8-.11 1.15-.29v3.11zM11.9.8c1.37 0 2.5.64 3.3 1.5H9.6c.8-1.04 2-1.5 3.3-1.5z"/><path fill="#545BBD" d="M8.2 8.5v5.8c0 1.5 1.24 2.7 2.7 2.7.41 0 .8-.11 1.15-.29V8.5H8.2zm9.1-1.3c-.62-.51-1.34-.8-2.2-.8-1.5 0-2.7 1.25-2.7 2.7v7.2c.41.06.82.09 1.24.09 3.7 0 6.7-3 6.7-6.7 0-2.4-1.28-4.5-3.14-5.6zM2.8 5.7C1.2 6.8 0 8.8 0 11.2c0 3.7 3 6.7 6.7 6.7.45 0 .88-.06 1.3-.15V5.7H2.8z"/><path fill="#5D62BF" d="M7.8 5.7C6.7 4.1 4.9 3 2.8 3c-1.3 0-2.5.6-3.3 1.5.8.9 1.9 1.5 3.3 1.5 1.3 0 2.4-.6 3.2-1.3z"/></svg>, status: 'Not Connected', description: 'Push hiring updates to your Teams channels.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const IntegrationCard = ({ integration, onConfigure }: { integration: ChatIntegration; onConfigure: (integration: ChatIntegration) => void; }) => {
    const statusColors = { 'Connected': 'bg-green-100 text-green-700', 'Not Connected': 'bg-slate-100 text-slate-600', 'Error': 'bg-red-100 text-red-600' };
    return (
        <motion.div variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center">{integration.logo}</div>
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

const IntegrationDrawer = ({ integration, onClose }: { integration: ChatIntegration | null; onClose: () => void }) => {
    const { toast } = useToast();
    if (!integration) return null;

    const handleSave = () => {
        toast({ title: `Settings for ${integration.name} Saved (Mock)` });
        onClose();
    };

    return (
        <Sheet open={!!integration} onOpenChange={open => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-xl">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-3 text-2xl">{integration.logo} {integration.name}</SheetTitle>
                    <SheetDescription>Configure which notifications to receive in {integration.name}.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                    <div className="flex items-center space-x-2"><Checkbox id="new-applicant"/><Label htmlFor="new-applicant">New Applicant</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="interview-scheduled" defaultChecked/><Label htmlFor="interview-scheduled">Interview Scheduled</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="offer-accepted"/><Label htmlFor="offer-accepted">Offer Accepted</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="assessment-complete" defaultChecked/><Label htmlFor="assessment-complete">Assessment Completed</Label></div>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Settings</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default function ChatIntegrationsPage() {
  const [selected, setSelected] = useState<ChatIntegration | null>(null);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3"><MessageSquare className="text-primary"/> Chat & Communication</CardTitle>
            <CardDescription>Get real-time updates in your team's chat platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
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
