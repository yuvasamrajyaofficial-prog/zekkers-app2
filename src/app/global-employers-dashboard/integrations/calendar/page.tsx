
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
  Calendar,
  Cog,
  Trash2,
  BookOpen,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// --- Types ---
type IntegrationStatus = 'Connected' | 'Not Connected';
interface CalendarIntegration {
  id: string;
  name: string;
  logo: React.ReactNode;
  status: IntegrationStatus;
  description: string;
}

// --- Mock Data ---
const mockIntegrations: CalendarIntegration[] = [
  { id: 'google', name: 'Google Calendar', logo: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.4 10.2h-9.9v3.6h5.6c-.2 1.2-1.2 3.1-3.2 3.1-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c1.3 0 2.2.6 2.7 1.1l2.5-2.5c-1.6-1.5-3.7-2.4-6.2-2.4-5.2 0-9.4 4.2-9.4 9.4s4.2 9.4 9.4 9.4c5.5 0 9.1-3.9 9.1-9.2 0-.6 0-1.1-.1-1.6z"/></svg>, status: 'Connected', description: 'Sync interviews with your Google Calendar.' },
  { id: 'outlook', name: 'Microsoft Outlook Calendar', logo: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24"><path fill="#0072C6" d="M12.4 2.2C6.2 2.2 2.2 6.2 2.2 12.4c0 6.2 4 10.2 10.2 10.2s10.2-4 10.2-10.2c0-6.2-4-10.2-10.2-10.2zM12 4.1c4.5 0 8.2 3.7 8.2 8.2s-3.7 8.2-8.2 8.2-8.2-3.7-8.2-8.2 3.7-8.2 8.2-8.2zm-2.8 1.9v10.5c.3 0 .7.1 1 .1h.8c1.3 0 2.4-.4 3.3-1.3 1-1 1.5-2.3 1.5-3.9s-.5-2.9-1.5-3.9c-.9-.8-2-1.3-3.3-1.3h-1.8zm2.8 2.2h.5c.7 0 1.2.2 1.6.6.4.4.6 1 .6 1.7s-.2 1.3-.6 1.7c-.4.4-.9.6-1.6.6h-.5V8.2z"/></svg>, status: 'Not Connected', description: 'Connect your Outlook 365 calendar.' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 15, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const IntegrationCard = ({ integration, onConfigure }: { integration: CalendarIntegration; onConfigure: (integration: CalendarIntegration) => void; }) => {
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

const IntegrationDrawer = ({ integration, onClose }: { integration: CalendarIntegration | null; onClose: () => void }) => {
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
                    <SheetDescription>Manage how Zekkers syncs with your {integration.name}.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Calendar Sync</CardTitle>
                            <CardDescription>Select which calendars to check for availability and which one to add events to.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="font-semibold">Check these calendars for conflicts:</Label>
                                <div className="flex items-center space-x-2"><Checkbox id="cal-1" defaultChecked/><Label htmlFor="cal-1">My Main Calendar</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="cal-2"/><Label htmlFor="cal-2">Team Holidays</Label></div>
                            </div>
                             <div className="space-y-2">
                                <Label className="font-semibold">Add new interview events to:</Label>
                                <Select defaultValue="main">
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="main">My Main Calendar</SelectItem>
                                        <SelectItem value="hiring">Hiring Calendar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Settings</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default function CalendarSyncPage() {
  const [selected, setSelected] = useState<CalendarIntegration | null>(null);

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-3"><Calendar className="text-primary"/> Calendar Sync</CardTitle>
            <CardDescription>Connect your Google or Outlook calendar to automate interview scheduling.</CardDescription>
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
