
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Plug,
  KeyRound,
  Webhook,
  Fingerprint,
  BookUser,
  Building,
  Briefcase,
  BookOpen,
  Code2,
  Activity,
  PlusCircle,
  Copy,
  Trash2,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Section = ({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) => (
  <motion.div variants={itemVariants} className="mt-6">
    <div className="flex items-center justify-between mb-4">
        <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {action}
    </div>
    {children}
  </motion.div>
);

const IntegrationCard = ({ logo, name, category, status }: { logo: string, name: string, category: string, status: 'Connected' | 'Not Connected' }) => (
    <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl font-bold">{logo}</div>
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">{category}</p>
                </div>
            </div>
            <Button variant={status === 'Connected' ? 'outline' : 'default'} size="sm">
                {status === 'Connected' ? 'Manage' : 'Connect'}
            </Button>
        </CardContent>
    </Card>
);

const WebhookEventCheckbox = ({ id, label, description }: { id: string, label: string, description: string }) => (
    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50">
        <Checkbox id={id} className="mt-1"/>
        <div>
            <Label htmlFor={id} className="font-medium cursor-pointer">{label}</Label>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
    </div>
)


export default function EmployerIntegrationsPage() {
  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Plug /> Integrations & API
              </CardTitle>
              <CardDescription className="mt-1">
                Connect Zekkers with your favorite tools and build custom workflows.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="sso">SSO</TabsTrigger>
              <TabsTrigger value="ats">ATS/HRMS</TabsTrigger>
              <TabsTrigger value="docs">Developer Docs</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Section title="Connected Apps" description="Manage your active integrations.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <IntegrationCard logo="G" name="Greenhouse" category="ATS" status="Connected"/>
                        <IntegrationCard logo="S" name="SAP SuccessFactors" category="HRMS" status="Not Connected"/>
                    </div>
                </Section>
                 <Section title="Health Monitoring" description="Real-time status of your integrations.">
                    <Card>
                        <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center"><p className="font-bold text-green-600">99.98%</p><p className="text-xs text-muted-foreground">API Uptime</p></div>
                             <div className="text-center"><p className="font-bold text-green-600">99.2%</p><p className="text-xs text-muted-foreground">Webhook Success</p></div>
                             <div className="text-center"><p className="font-bold">24ms</p><p className="text-xs text-muted-foreground">Avg. API Latency</p></div>
                             <div className="text-center"><p className="font-bold text-red-500">2</p><p className="text-xs text-muted-foreground">Active Incidents</p></div>
                        </CardContent>
                    </Card>
                </Section>
              </motion.div>
            </TabsContent>

            {/* API Keys Tab */}
            <TabsContent value="api-keys">
                 <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <Section title="API Keys" description="Manage API keys for your applications." action={<Button><PlusCircle size={16} className="mr-2"/>Create New Key</Button>}>
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Label</TableHead>
                                        <TableHead>Key</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Production Key</TableCell>
                                        <TableCell><Badge variant="secondary">prod_sk_..._abcd</Badge></TableCell>
                                        <TableCell>Jul 20, 2024</TableCell>
                                        <TableCell className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="w-8 h-8"><Copy size={14}/></Button>
                                            <Button variant="ghost" size="icon" className="w-8 h-8"><Trash2 size={14}/></Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                    </Section>
                </motion.div>
            </TabsContent>

            {/* Webhooks Tab */}
            <TabsContent value="webhooks">
                 <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <Section title="Webhooks" description="Receive real-time notifications for events." action={<Button><PlusCircle size={16} className="mr-2"/>Add Endpoint</Button>}>
                        <Card>
                            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="webhook-url">Endpoint URL</Label>
                                    <Input id="webhook-url" placeholder="https://yourapp.com/webhooks/zekkers" />
                                </div>
                                <div>
                                    <Label htmlFor="webhook-secret">Signing Secret</Label>
                                    <Input id="webhook-secret" value="whsec_..." readOnly/>
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Events to Subscribe</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                        <WebhookEventCheckbox id="evt-applied" label="candidate.applied" description="A candidate applies to a job."/>
                                        <WebhookEventCheckbox id="evt-shortlisted" label="candidate.shortlisted" description="A candidate is shortlisted."/>
                                        <WebhookEventCheckbox id="evt-assessment" label="assessment.submitted" description="An assessment is completed."/>
                                        <WebhookEventCheckbox id="evt-offer" label="offer.generated" description="An offer is made."/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Section>
                </motion.div>
            </TabsContent>
            
             {/* SSO Tab */}
            <TabsContent value="sso">
                 <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <Section title="Single Sign-On (SSO)" description="Allow your team to log in with your identity provider.">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <IntegrationCard logo="G" name="Google Workspace" category="SSO" status="Connected"/>
                            <IntegrationCard logo="M" name="Microsoft Azure AD" category="SSO" status="Not Connected"/>
                            <IntegrationCard logo="O" name="Okta" category="SSO" status="Not Connected"/>
                             <IntegrationCard logo="S" name="Custom SAML 2.0" category="SSO" status="Not Connected"/>
                        </div>
                    </Section>
                </motion.div>
            </TabsContent>
            
            {/* ATS/HRMS Tab */}
            <TabsContent value="ats">
                 <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <Section title="ATS & HRMS Integrations" description="Sync candidates and jobs with your existing systems.">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <IntegrationCard logo="G" name="Greenhouse" category="ATS" status="Connected"/>
                            <IntegrationCard logo="L" name="Lever" category="ATS" status="Not Connected"/>
                            <IntegrationCard logo="B" name="BambooHR" category="HRMS" status="Not Connected"/>
                            <IntegrationCard logo="Z" name="Zoho Recruit" category="ATS" status="Not Connected"/>
                        </div>
                    </Section>
                </motion.div>
            </TabsContent>
            
             {/* Developer Docs Tab */}
            <TabsContent value="docs">
                 <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <Section title="Developer Resources" description="Access SDKs, documentation, and tools.">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button variant="outline" className="justify-start h-auto p-4 gap-3"><Code2/><div><p className="font-semibold">Full API Reference</p><p className="text-xs text-muted-foreground text-left">Explore all endpoints.</p></div></Button>
                             <Button variant="outline" className="justify-start h-auto p-4 gap-3"><BookOpen/><div><p className="font-semibold">Integration Guides</p><p className="text-xs text-muted-foreground text-left">Step-by-step tutorials.</p></div></Button>
                        </div>
                    </Section>
                </motion.div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

    