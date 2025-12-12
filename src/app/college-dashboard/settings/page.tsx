'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Upload,
  Link as LinkIcon,
  Key,
  Shield,
  Bell,
  CheckCircle,
  Building,
  Palette,
  Users,
  Lock,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

const Section: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </motion.div>
);

const IntegrationCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}> = ({ icon, title, desc, children }) => (
  <Card className="p-4">
    <CardHeader className="p-2">
      <CardTitle className="flex items-center gap-2 text-lg">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-2">
      <p className="text-sm text-muted-foreground mb-4">{desc}</p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </CardContent>
  </Card>
);

const Toggle: React.FC<{ label: string; defaultChecked?: boolean }> = ({
  label,
  defaultChecked,
}) => (
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <Label htmlFor={label.replace(/\s+/g, '-')} className="pr-4">
      {label}
    </Label>
    <Switch id={label.replace(/\s+/g, '-')} defaultChecked={defaultChecked} />
  </div>
);

export default function CollegeSettingsIntegrations() {
  const [brandingPreview, setBrandingPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setBrandingPreview(url);
    }
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings /> Settings & Integrations
        </h1>
        <p className="text-muted-foreground text-base mt-1 max-w-2xl">
          Manage institution details, branding, API keys, LMS integrations, SSO,
          webhooks, security and notification preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Institution Details */}
        <Section title="Institution Details" icon={<Building />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="college-name">College Name</Label>
              <Input
                id="college-name"
                placeholder="Ex: National Institute of Technology"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college-code">Institution Code</Label>
              <Input id="college-code" placeholder="Ex: NIT103" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college-email">Email</Label>
              <Input
                id="college-email"
                type="email"
                placeholder="admin@college.edu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college-phone">Phone</Label>
              <Input id="college-phone" placeholder="Ex: +91 9876543210" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="college-address">Address</Label>
              <Input
                id="college-address"
                placeholder="Enter institution's main campus address"
              />
            </div>
          </div>
          <Button className="mt-6">Save Changes</Button>
        </Section>

        {/* Branding Section */}
        <Section title="Branding & Appearance" icon={<Palette />}>
          <p className="text-sm text-muted-foreground mb-4">
            Customize your college dashboard branding (visible to students &
            faculty).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-slate-100 rounded-lg border flex items-center justify-center overflow-hidden">
                {brandingPreview ? (
                  <Image
                    src={brandingPreview}
                    alt="Brand Preview"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-slate-400 text-sm">Logo</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Upload Logo</Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input
                  id="primary-color"
                  type="color"
                  defaultValue="#3740FF"
                  className="p-1 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <Input
                  id="secondary-color"
                  type="color"
                  defaultValue="#06B6D4"
                  className="p-1 h-12"
                />
              </div>
            </div>
          </div>
          <Button className="mt-6">Save Branding</Button>
        </Section>

        {/* API & Integrations */}
        <Section title="Integrations (LMS, ERP, SSO, API)" icon={<LinkIcon />}>
          <p className="text-sm text-muted-foreground mb-4">
            Connect Zekkers with your existing systems.
          </p>

          <div className="space-y-6">
            <IntegrationCard
              icon={<Key />}
              title="API Keys"
              desc="Generate and manage institution-level API keys to integrate with ERP &amp; dashboards."
            >
              <Button>Generate API Key</Button>
            </IntegrationCard>

            <IntegrationCard
              icon={<LinkIcon />}
              title="LMS Integration"
              desc="Sync student progress, attendance, and course enrollments with your Learning Management System."
            >
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select LMS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moodle">Moodle</SelectItem>
                  <SelectItem value="canvas">Canvas</SelectItem>
                  <SelectItem value="google">Google Classroom</SelectItem>
                  <SelectItem value="custom">Custom LMS</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Connect</Button>
            </IntegrationCard>

            <IntegrationCard
              icon={<Shield />}
              title="Single Sign-On (SSO)"
              desc="Enable faculty &amp; students to login using institute credentials."
            >
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select SSO Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saml">SAML</SelectItem>
                  <SelectItem value="oauth">OAuth</SelectItem>
                  <SelectItem value="azure">Microsoft Azure AD</SelectItem>
                  <SelectItem value="google">Google Workspace</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Enable</Button>
            </IntegrationCard>
          </div>
        </Section>

        {/* Permissions */}
        <Section title="Admin Roles & Permissions" icon={<Users />}>
          <p className="text-sm text-muted-foreground mb-4">
            Assign role-based access to staff (Training Coordinator, HOD, TPO,
            Faculty Advisor).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staff-email">Add Staff Email</Label>
              <Input id="staff-email" placeholder="staff@college.edu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="staff-role">Role</Label>
              <Select>
                <SelectTrigger id="staff-role">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tpo">
                    Training &amp; Placement Officer
                  </SelectItem>
                  <SelectItem value="hod">Head of Department</SelectItem>
                  <SelectItem value="advisor">Faculty Advisor</SelectItem>
                  <SelectItem value="internship">
                    Internship Coordinator
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-6">Invite Staff Member</Button>
        </Section>

        {/* Security */}
        <Section title="Security & Compliance" icon={<Lock />}>
          <p className="text-sm text-muted-foreground mb-4">
            Manage 2FA, compliance logs, data access and GDPR/DSA settings.
          </p>
          <div className="flex flex-col gap-4">
            <Toggle
              label="Enable Two-Factor Authentication (2FA) for staff"
              defaultChecked
            />
            <Toggle label="Enable Session Alerts" />
            <Toggle label="Restrict login to institute network/VPN" />
          </div>
          <Button className="mt-6">Save Security Settings</Button>
        </Section>

        {/* Notifications */}
        <Section title="Notification Preferences" icon={<Bell />}>
          <p className="text-sm text-muted-foreground mb-4">
            Control alerts for placement drives, assessments, roadmaps, and
            employer partnerships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Toggle label="Drive Alerts" defaultChecked />
            <Toggle label="Assessment Notifications" defaultChecked />
            <Toggle label="Roadmap Progress Alerts" />
            <Toggle label="Employer &amp; Partnership Notifications" defaultChecked />
          </div>
          <Button className="mt-6">Save Notification Settings</Button>
        </Section>
      </div>
    </div>
  );
}
