
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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Building,
  UserCheck,
  Globe,
  Phone,
  FileText,
  UploadCloud,
  ShieldCheck,
  Clock,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  XCircle,
  Loader,
  Paperclip,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type StepStatus = 'pending' | 'completed' | 'needs_changes' | 'in_review';
type KycStatus = 'not_started' | 'pending_review' | 'verified' | 'rejected';

const stepData: {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  status: StepStatus;
}[] = [
  {
    id: 'documents',
    icon: <FileText />,
    title: 'Company Registration Documents',
    description: 'Upload GST Certificate, CIN, or PAN.',
    status: 'completed',
  },
  {
    id: 'signatory',
    icon: <UserCheck />,
    title: 'Authorized Signatory Verification',
    description: 'Verify the identity of the person acting on behalf of the company.',
    status: 'completed',
  },
  {
    id: 'domain',
    icon: <Globe />,
    title: 'Domain Verification',
    description: 'Prove ownership of your company website domain.',
    status: 'pending',
  },
  {
    id: 'phone',
    icon: <Phone />,
    title: 'Official Phone Verification',
    description: 'Verify a contact number for your company.',
    status: 'pending',
  },
  {
    id: 'compliance',
    icon: <ShieldCheck />,
    title: 'Business Intent & Compliance',
    description: 'Agree to our anti-fraud and hiring policies.',
    status: 'pending',
  },
];

const statusColors: Record<StepStatus, string> = {
  pending: 'text-slate-500 bg-slate-100',
  completed: 'text-green-700 bg-green-100',
  needs_changes: 'text-amber-700 bg-amber-100',
  in_review: 'text-blue-700 bg-blue-100',
};

const kycStatusDetails: Record<KycStatus, { text: string; color: string; icon: React.ReactNode }> = {
    'not_started': { text: 'Not Verified', color: 'text-slate-500', icon: <XCircle/> },
    'pending_review': { text: 'Pending Review', color: 'text-amber-600', icon: <Clock/> },
    'verified': { text: 'Verified', color: 'text-green-600', icon: <ShieldCheck/> },
    'rejected': { text: 'Rejected', color: 'text-red-600', icon: <XCircle/> },
};

const TrustScoreItem = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
    <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">{icon}<span>{label}</span></div>
        <div className="font-bold">{value}</div>
    </div>
);

const StepCard = ({
  icon,
  title,
  description,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: StepStatus;
}) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg">{icon}</div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </div>
       <Badge className={`capitalize ${statusColors[status]}`}>{status.replace('_', ' ')}</Badge>
    </CardHeader>
    <CardContent>
      <div className="flex justify-end gap-2">
         {status !== 'completed' && <Button variant="outline">Start Step</Button>}
         {status === 'completed' && <Button variant="ghost" size="sm">View Details</Button>}
      </div>
    </CardContent>
  </Card>
);

export default function EmployerKycPage() {
  const [kycStatus, setKycStatus] = useState<KycStatus>('pending_review');
  const completedSteps = stepData.filter(s => s.status === 'completed').length;
  const progress = (completedSteps / stepData.length) * 100;
  const statusDetails = kycStatusDetails[kycStatus];

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-primary" /> KYC Verification
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete verification to build trust and unlock powerful features.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View Guidelines</Button>
          <Button disabled={progress < 100}>Submit for Review</Button>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
            <CardTitle>Verification Progress</CardTitle>
            <p className="text-sm text-muted-foreground">{completedSteps} of {stepData.length} steps completed</p>
        </CardHeader>
        <CardContent>
            <Progress value={progress} />
        </CardContent>
      </Card>
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Panel: Checklist */}
        <div className="lg:col-span-2 space-y-6">
            {stepData.map((step) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StepCard {...step} />
                </motion.div>
            ))}
        </div>

        {/* Right Panel: Status Box */}
        <aside className="space-y-6 lg:sticky lg:top-6">
             <Card className="bg-slate-50 border-slate-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={`p-4 rounded-lg flex items-center gap-3 font-bold text-lg ${statusDetails.color} bg-white border-l-4`} style={{borderColor: statusDetails.color}}>
                        {statusDetails.icon} {statusDetails.text}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Trust Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <TrustScoreItem label="Domain Verified" value="+40" icon={<CheckCircle size={16} className="text-green-500"/>} />
                    <TrustScoreItem label="Documents Verified" value="+30" icon={<CheckCircle size={16} className="text-green-500"/>} />
                    <TrustScoreItem label="Phone Verified" value="+10" icon={<Clock size={16} className="text-amber-500"/>} />
                    <TrustScoreItem label="Signatory Verified" value="+20" icon={<Clock size={16} className="text-amber-500"/>} />
                    <Separator />
                    <div className="flex justify-between items-center pt-2">
                        <span className="font-bold">Current Score</span>
                        <span className="text-2xl font-bold text-primary">70%</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full gap-2">
                        <HelpCircle size={16}/> Read Verification FAQs
                    </Button>
                </CardContent>
            </Card>
        </aside>
      </div>

    </div>
  );
}
