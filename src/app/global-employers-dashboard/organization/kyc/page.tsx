
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
  ShieldCheck,
  FileText,
  UserCheck,
  Globe,
  Landmark,
  Shield,
  Clock,
  HelpCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
    title: 'Company Registration & Tax ID',
    description: 'Upload legal entity documents (e.g., Certificate of Incorporation, VAT/GST number).',
    status: 'completed',
  },
  {
    id: 'duns',
    icon: <Globe />,
    title: 'International Business Number (DUNS)',
    description: 'Provide your Dun & Bradstreet number for global identity verification.',
    status: 'completed',
  },
  {
    id: 'signatory',
    icon: <UserCheck />,
    title: 'Authorized Signatory Verification',
    description: "Verify the identity of the company's legal representative.",
    status: 'in_review',
  },
  {
    id: 'bank',
    icon: <Landmark />,
    title: 'Bank Account Verification',
    description: 'Verify a business bank account for payment processing and identity.',
    status: 'pending',
  },
  {
    id: 'compliance',
    icon: <Shield />,
    title: 'Compliance & Policy Agreement',
    description: 'Agree to global anti-fraud, data privacy, and fair hiring policies.',
    status: 'pending',
  },
];

const statusColors: Record<StepStatus, string> = {
  pending: 'bg-slate-100 text-slate-600',
  completed: 'bg-green-100 text-green-700',
  needs_changes: 'text-amber-100 text-amber-700',
  in_review: 'bg-blue-100 text-blue-700',
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
  onStart
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: StepStatus;
  onStart: () => void;
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
         {status !== 'completed' && <Button variant="outline" onClick={onStart}>Start Step</Button>}
         {status === 'completed' && <Button variant="ghost" size="sm">View Uploads</Button>}
      </div>
    </CardContent>
  </Card>
);

export default function KYCAndCompliance() {
    const { toast } = useToast();
    const [kycStatus, setKycStatus] = useState<KycStatus>('pending_review');
    const completedSteps = stepData.filter(s => s.status === 'completed').length;
    const progress = (completedSteps / stepData.length) * 100;
    const statusDetails = kycStatusDetails[kycStatus];

    const handleSubmitForReview = () => {
        toast({
            title: "Submitted for Review",
            description: "Your verification documents are being reviewed. This may take up to 72 hours for global checks.",
        });
    };
    
    const handleStartStep = (title: string) => {
        toast({ title: `Starting: ${title}`, description: "This feature is not yet implemented." });
    };

    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ShieldCheck className="text-primary" /> KYC & Global Compliance
                </h1>
                <p className="text-muted-foreground mt-1 max-w-2xl">
                    Complete verification to build trust, access advanced features like payment processing, and comply with international regulations.
                </p>
                </div>
                <div className="flex gap-2">
                <Button variant="outline">View Guidelines</Button>
                <Button disabled={progress < 100} onClick={handleSubmitForReview}>Submit for Review</Button>
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
                {/* Checklist */}
                <div className="lg:col-span-2 space-y-6">
                    {stepData.map((step) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: stepData.indexOf(step) * 0.05 }}
                        >
                            <StepCard {...step} onStart={() => handleStartStep(step.title)} />
                        </motion.div>
                    ))}
                </div>

                {/* Status Box */}
                <aside className="space-y-6 lg:sticky lg:top-6">
                     <Card className="bg-slate-50 border-slate-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">Overall Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`p-4 rounded-lg flex items-center gap-3 font-bold text-lg ${statusDetails.color} bg-white border-l-4`} style={{borderColor: statusDetails.color}}>
                                {statusDetails.icon} {statusDetails.text}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Trust Score Impact</CardTitle>
                            <CardDescription>Completing KYC is the biggest factor in your Trust Score.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <TrustScoreItem label="Company Docs" value="+40" icon={<CheckCircle size={16} className="text-green-500"/>} />
                            <TrustScoreItem label="DUNS Number" value="+20" icon={<CheckCircle size={16} className="text-green-500"/>} />
                            <TrustScoreItem label="Signatory & Bank" value="+30" icon={<Clock size={16} className="text-amber-500"/>} />
                            <Separator />
                            <div className="flex justify-between items-center pt-2">
                                <span className="font-bold">Current Score</span>
                                <span className="text-2xl font-bold text-primary">60%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                            <CardTitle>Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full gap-2">
                                <HelpCircle size={16}/> Contact Compliance Team
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
