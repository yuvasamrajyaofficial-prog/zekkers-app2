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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Shield,
  FileText,
  Clock,
  UserCheck,
  Globe,
  Download,
  UploadCloud,
  Trash2,
  ListOrdered,
  TriangleAlert,
  Save,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

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
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <AccordionItem value={title}>
    <AccordionTrigger>
      <div className="flex items-center gap-3 text-lg font-semibold">
        {icon}
        {title}
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="p-4 bg-slate-50 rounded-b-lg border-t">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {children}
      </div>
    </AccordionContent>
  </AccordionItem>
);

const ToggleSetting = ({ id, label, description, defaultChecked }: { id: string; label: string; description: string; defaultChecked?: boolean }) => (
  <div className="flex items-center justify-between p-3 rounded-lg border bg-white">
    <div>
      <Label htmlFor={id} className="font-medium cursor-pointer">{label}</Label>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <Switch id={id} defaultChecked={defaultChecked} />
  </div>
);

const mockRetentionPolicies = [
    { type: 'Participants', default: '3 years', editable: true, autoDelete: true },
    { type: 'Assessments', default: '5 years', editable: true, autoDelete: false },
    { type: 'Certificates', default: 'Lifetime', editable: false, autoDelete: false },
    { type: 'Donor Information', default: '7 years', editable: true, autoDelete: true },
    { type: 'Login Logs', default: '12 months', editable: true, autoDelete: false },
];

const mockComplianceDocs = [
    { name: '80G Certificate.pdf', expiry: '2026-03-31', status: 'Active' },
    { name: '12A Certificate.pdf', expiry: '2026-03-31', status: 'Active' },
    { name: 'FCRA License.pdf', expiry: '2025-09-30', status: 'Expires Soon' },
    { name: 'Annual Report 2023.pdf', expiry: 'N/A', status: 'Active' },
];

export default function PrivacyPage() {
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({ title: "Action Triggered (Mock)", description: `${action}` });
    };

  return (
    <div className="p-4 md:p-6">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <Shield className="text-primary" /> Privacy & Compliance
            </CardTitle>
            <CardDescription className="max-w-2xl">
              Manage data protection, legal policies, regulatory obligations, and user privacy rights for your organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="Data Protection Settings">
              
              <Section title="Data Protection Settings" description="Critical configurations for privacy and governance." icon={<Shield/>}>
                 <div className="space-y-3">
                    <ToggleSetting id="dp-mode" label="Enable Data Protection Mode" description="Enforces stricter privacy rules across the platform." defaultChecked />
                    <ToggleSetting id="dp-mask-phone" label="Mask Participant Phone Numbers" description="Only admins can view full phone numbers." defaultChecked />
                    <ToggleSetting id="dp-disable-download" label="Disable Sensitive Document Downloads" description="Users can only view documents in a secure viewer." />
                 </div>
                 <Button className="mt-4" onClick={() => handleAction('Data Protection Settings Saved')}>Save Settings</Button>
              </Section>
              
              <Section title="Data Retention & Auto-Deletion" description="Configure how long different types of data are stored." icon={<Clock/>}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data Type</TableHead>
                            <TableHead>Default Retention</TableHead>
                            <TableHead>Auto-Deletes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockRetentionPolicies.map(p => (
                            <TableRow key={p.type}>
                                <TableCell className="font-medium">{p.type}</TableCell>
                                <TableCell>{p.default}</TableCell>
                                <TableCell><Switch checked={p.autoDelete} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button className="mt-4" onClick={() => handleAction('Retention Policies Saved')}>Save Policies</Button>
              </Section>

              <Section title="User Consent & Policies" description="Manage policies that users must accept." icon={<UserCheck/>}>
                 <div className="space-y-2">
                    <div className="p-3 border rounded-lg flex justify-between items-center bg-white">
                        <p className="font-medium">Privacy Policy v2.1</p>
                        <Button variant="outline" size="sm">View & Track Acceptance</Button>
                    </div>
                     <div className="p-3 border rounded-lg flex justify-between items-center bg-white">
                        <p className="font-medium">Child Safety Policy v1.5</p>
                        <Button variant="outline" size="sm">View & Track Acceptance</Button>
                    </div>
                 </div>
                 <Button className="mt-4" onClick={() => handleAction('Upload Policy Modal Opened')}><UploadCloud size={16} className="mr-2"/>Upload New Policy</Button>
              </Section>

               <Section title="Compliance Certificates" description="Upload and maintain your organization's legal documents." icon={<FileText/>}>
                <div className="space-y-2">
                    {mockComplianceDocs.map(doc => (
                         <div key={doc.name} className="p-3 border rounded-lg flex justify-between items-center bg-white">
                            <p className="font-medium">{doc.name}</p>
                            <Badge variant={doc.status === 'Expires Soon' ? 'destructive' : 'secondary'}>{doc.status}</Badge>
                         </div>
                    ))}
                </div>
                 <Button className="mt-4" onClick={() => handleAction('Upload Certificate Modal Opened')}><UploadCloud size={16} className="mr-2"/>Upload Certificate</Button>
              </Section>

              <Section title="FCRA Compliance" description="Manage Foreign Contribution (Regulation) Act details." icon={<Globe/>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>FCRA Registration Number</Label><Input defaultValue="010230405"/></div>
                    <div className="space-y-2"><Label>Validity Period</Label><Input type="date" defaultValue="2025-09-30"/></div>
                </div>
                 <Button className="mt-4" onClick={() => handleAction('FCRA Details Saved')}>Save FCRA Details</Button>
              </Section>

               <Section title="Data Export & Portability" description="Export your organization's data in various formats." icon={<Download/>}>
                  <Button className="gap-2" onClick={() => handleAction('Export All Data')}><Download size={16}/>Export All Data as CSV</Button>
              </Section>

               <Section title="Data Deletion Requests" description="Manage 'Right to be Forgotten' requests from users." icon={<Trash2/>}>
                    <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed">
                        <p className="text-muted-foreground">No pending deletion requests.</p>
                    </div>
              </Section>
              
               <Section title="Audit Trails" description="View logs of all significant actions taken." icon={<ListOrdered/>}>
                    <Button className="gap-2" onClick={() => handleAction('Navigate to Audit Logs Page')}><ListOrdered size={16}/>View Full Audit Log</Button>
              </Section>
              
              <Section title="Incident Reporting" description="Report and manage data breaches or security incidents." icon={<TriangleAlert/>}>
                  <Button variant="destructive" onClick={() => handleAction('Report Incident Modal Opened')}><TriangleAlert size={16} className="mr-2"/>Report New Incident</Button>
              </Section>

            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
