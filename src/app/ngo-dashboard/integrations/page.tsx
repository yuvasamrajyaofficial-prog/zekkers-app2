
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Plug,
  PlusCircle,
  RefreshCw,
  BookOpen,
  Code2,
  Mail,
  MessageSquare,
  File,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Bot,
  Cog,
  KeyRound,
  Webhook,
  Shield,
  Trash2,
  TestTube2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';

// --- Types ---
type IntegrationStatus = 'Connected' | 'Not Connected' | 'Error';
type IntegrationCategory = 'Communication' | 'Storage' | 'Calendar' | 'Assessment' | 'LMS' | 'Donor & Finance' | 'Government' | 'Automation';

interface Integration {
  id: string;
  name: string;
  logo: React.ReactNode;
  category: IntegrationCategory;
  status: IntegrationStatus;
  description: string;
}

// --- Mock Data ---
const mockIntegrations: Integration[] = [
  { id: 'sendgrid', name: 'SendGrid', logo: <Mail/>, category: 'Communication', status: 'Connected', description: 'Email API for bulk and transactional emails.' },
  { id: 'twilio', name: 'Twilio', logo: <MessageSquare/>, category: 'Communication', status: 'Not Connected', description: 'SMS and WhatsApp messaging API.' },
  { id: 'gdrive', name: 'Google Drive', logo: <File/>, category: 'Storage', status: 'Connected', description: 'File storage and document collaboration.' },
  { id: 'gcal', name: 'Google Calendar', logo: <Calendar/>, category: 'Calendar', status: 'Not Connected', description: 'Sync training and interview schedules.' },
  { id: 'hackerrank', name: 'HackerRank', logo: <Code2/>, category: 'Assessment', status: 'Not Connected', description: 'Technical assessments for developers.' },
  { id: 'moodle', name: 'Moodle', logo: <GraduationCap/>, category: 'LMS', status: 'Not Connected', description: 'Open-source learning management system.' },
  { id: 'razorpay', name: 'Razorpay', logo: <HeartHandshake/>, category: 'Donor & Finance', status: 'Connected', description: 'Accept donations and payments in India.' },
  { id: 'skillindia', name: 'Skill India', logo: <Landmark/>, category: 'Government', status: 'Not Connected', description: 'Sync data with the national skills portal.' },
  { id: 'zapier', name: 'Zapier', logo: <Bot/>, category: 'Automation', status: 'Not Connected', description: 'Connect Zekkers to 5,000+ apps.' },
];


// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };

// --- Sub-Components ---

const IntegrationCard = ({ integration, onConfigure }: { integration: Integration; onConfigure: (integration: Integration) => void; }) => {
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
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl font-bold text-primary">{integration.logo}</div>
                        <div>
                            <p className="font-semibold">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">{integration.category}</p>
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

const IntegrationDrawer = ({ integration, onClose }: { integration: Integration | null; onClose: () => void }) => {
    const { toast } = useToast();
    if (!integration) return null;

    const handleAction = (action: string) => {
        toast({ title: `${action} (Mock)`, description: `This would trigger the ${action.toLowerCase()} process for ${integration.name}.` });
    };

    return (
        <Sheet open={!!integration} onOpenChange={open => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-3 text-2xl">
                        {integration.logo} {integration.name}
                    </SheetTitle>
                    <SheetDescription>{integration.description}</SheetDescription>
                </SheetHeader>
                <div className="py-6">
                    <Tabs defaultValue="settings">
                        <TabsList>
                            <TabsTrigger value="settings"><Cog size={14} className="mr-2"/>Settings</TabsTrigger>
                            <TabsTrigger value="keys"><KeyRound size={14} className="mr-2"/>API Keys</TabsTrigger>
                            <TabsTrigger value="webhooks"><Webhook size={14} className="mr-2"/>Webhooks</TabsTrigger>
                            <TabsTrigger value="permissions"><Shield size={14} className="mr-2"/>Permissions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="settings" className="mt-4 space-y-4">
                             <Card>
                                <CardHeader><CardTitle>Connection Status</CardTitle></CardHeader>
                                <CardContent className="flex items-center justify-between">
                                    <Badge className={integration.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}>
                                        {integration.status}
                                    </Badge>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleAction('Test Connection')}><TestTube2 size={14} className="mr-2"/>Test</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleAction('Disconnect')}><Trash2 size={14} className="mr-2"/>Disconnect</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="keys" className="mt-4">
                             <Card>
                                <CardHeader><CardTitle>API Credentials</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="api-key">API Key</Label>
                                        <Input id="api-key" placeholder="sk_live_..."/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="api-secret">API Secret</Label>
                                        <Input id="api-secret" type="password" placeholder="••••••••••••••••"/>
                                    </div>
                                    <Button onClick={() => handleAction('Save Credentials')}>Save Credentials</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="webhooks" className="mt-4">
                            <Card>
                                <CardHeader><CardTitle>Webhook Configuration</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground">Setup webhooks to receive real-time event notifications.</p>
                                    <div className="space-y-2">
                                        <Label htmlFor="webhook-url">Endpoint URL</Label>
                                        <Input id="webhook-url" placeholder="https://yourapp.com/webhooks/zekkers"/>
                                    </div>
                                    <Button onClick={() => handleAction('Save Webhook')}>Save Webhook</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="permissions" className="mt-4">
                             <Card>
                                <CardHeader><CardTitle>Access Control</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">Define which roles can manage this integration. (Mock UI)</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};


// --- Main Component ---
export default function NGOIntegrationsPage() {
  const [activeTab, setActiveTab] = useState('Communication');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const filteredIntegrations = useMemo(() => {
    return mockIntegrations.filter(i => i.category === activeTab);
  }, [activeTab]);

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
  };

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3"><Plug /> Integrations</CardTitle>
              <CardDescription>Connect communication, assessment, LMS, automation & reporting tools.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline"><RefreshCw size={16} className="mr-2"/>Refresh Health</Button>
              <Button variant="outline"><BookOpen size={16} className="mr-2"/>View Logs</Button>
              <Button><PlusCircle size={16} className="mr-2"/>Add Custom</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-auto">
              <TabsTrigger value="Communication"><Mail size={14} className="mr-2"/>Communication</TabsTrigger>
              <TabsTrigger value="Storage"><File size={14} className="mr-2"/>Storage</TabsTrigger>
              <TabsTrigger value="Calendar"><Calendar size={14} className="mr-2"/>Calendar</TabsTrigger>
              <TabsTrigger value="Assessment"><ClipboardCheck size={14} className="mr-2"/>Assessments</TabsTrigger>
              <TabsTrigger value="LMS"><GraduationCap size={14} className="mr-2"/>LMS</TabsTrigger>
            </TabsList>
            
            <motion.div key={activeTab} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="mt-6">
                {filteredIntegrations.length > 0 ? (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                        {filteredIntegrations.map(integration => (
                            <IntegrationCard key={integration.id} integration={integration} onConfigure={handleConfigure} />
                        ))}
                    </motion.div>
                ) : (
                     <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-dashed">
                        <h3 className="font-semibold text-lg">No Integrations</h3>
                        <p className="text-sm text-slate-500 mt-1">
                            There are no integrations available in this category yet.
                        </p>
                    </div>
                )}
            </motion.div>
          </Tabs>
        </CardContent>
      </Card>

      <IntegrationDrawer integration={selectedIntegration} onClose={() => setSelectedIntegration(null)} />
    </div>
  );
}
