
'use client';
import React, { useState, useEffect, useMemo } from 'react';
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
import { useFirestore } from '@/firebase';
import { useAuth } from '@/context/auth-context';
import {
  getUserKycDetails,
  saveKycStep,
  submitKycForReview,
  type StepStatus,
  type KycStatus,
  type KycStepDetails
} from '@/services/kyc';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const stepConfig = [
  {
    id: 'documents',
    icon: <FileText />,
    title: 'Company Registration & Tax ID',
    description: 'Upload legal entity documents (e.g., Certificate of Incorporation, VAT/GST number).',
  },
  {
    id: 'duns',
    icon: <Globe />,
    title: 'International Business Number (DUNS)',
    description: 'Provide your Dun & Bradstreet number for global identity verification.',
  },
  {
    id: 'signatory',
    icon: <UserCheck />,
    title: 'Authorized Signatory Verification',
    description: "Verify the identity of the company's legal representative.",
  },
  {
    id: 'bank',
    icon: <Landmark />,
    title: 'Bank Account Verification',
    description: 'Verify a business bank account for payment processing and identity.',
  },
  {
    id: 'compliance',
    icon: <Shield />,
    title: 'Compliance & Policy Agreement',
    description: 'Agree to global anti-fraud, data privacy, and fair hiring policies.',
  },
];

const statusColors: Record<StepStatus, string> = {
  pending: 'bg-slate-100 text-slate-600',
  completed: 'bg-green-100 text-green-700',
  needs_changes: 'bg-amber-100 text-amber-700',
  in_review: 'bg-blue-100 text-blue-700',
};

const kycStatusDetails: Record<KycStatus, { text: string; color: string; icon: React.ReactNode }> = {
  'not_started': { text: 'Not Verified', color: 'text-slate-500', icon: <XCircle/> },
  'pending_review': { text: 'Pending Approval', color: 'text-amber-600', icon: <Clock/> },
  'verified': { text: 'Verified', color: 'text-green-600', icon: <ShieldCheck/> },
  'rejected': { text: 'Rejected & Blocked', color: 'text-red-600', icon: <XCircle/> },
};

const TrustScoreItem = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 text-muted-foreground">{icon}<span>{label}</span></div>
    <div className="font-bold">{value}</div>
  </div>
);

export default function KYCAndCompliance() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user, userData } = useAuth();

  const [kycStatus, setKycStatus] = useState<KycStatus>('not_started');
  const [kycSteps, setKycSteps] = useState<KycStepDetails>({});
  const [loading, setLoading] = useState(true);

  // Modal active states
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  // Field states for step modals
  const [registerCountry, setRegisterCountry] = useState('');
  const [taxId, setTaxId] = useState('');
  const [dunsNum, setDunsNum] = useState('');
  const [sigName, setSigName] = useState('');
  const [sigEmail, setSigEmail] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAcc, setBankAcc] = useState('');
  const [policyAgreed, setPolicyAgreed] = useState(false);

  useEffect(() => {
    if (user && firestore) {
      setLoading(true);
      getUserKycDetails(firestore, user.uid)
        .then((res) => {
          if (res) {
            setKycStatus(res.kycStatus);
            setKycSteps(res.kycSteps);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, firestore]);

  const stepData = useMemo(() => {
    return stepConfig.map(s => {
      // @ts-ignore
      const details = kycSteps[s.id];
      const status: StepStatus = details?.status || 'pending';
      return {
        ...s,
        status,
        details
      };
    });
  }, [kycSteps]);

  const completedSteps = stepData.filter(s => s.status === 'completed' || s.status === 'in_review').length;
  const progress = (completedSteps / stepConfig.length) * 100;
  const statusDetails = kycStatusDetails[kycStatus];

  const handleOpenStep = (stepId: string) => {
    setActiveStepId(stepId);
    // Populate fields if they exist in state
    if (stepId === 'documents') {
      setRegisterCountry(kycSteps.documents?.files?.[0] || '');
      setTaxId(kycSteps.documents?.files?.[1] || '');
    } else if (stepId === 'duns') {
      setDunsNum(kycSteps.duns?.value || '');
    } else if (stepId === 'signatory') {
      setSigName(kycSteps.signatory?.name || '');
      setSigEmail(kycSteps.signatory?.email || '');
    } else if (stepId === 'bank') {
      setBankName(kycSteps.bank?.bankName || '');
      setBankAcc(kycSteps.bank?.account || '');
    } else if (stepId === 'compliance') {
      setPolicyAgreed(kycSteps.compliance?.agreed || false);
    }
  };

  const handleSaveStepData = async () => {
    if (!user || !firestore || !activeStepId) return;

    let payload: any = { status: 'completed' };
    if (activeStepId === 'documents') {
      if (!taxId || !registerCountry) {
        toast({ variant: 'destructive', title: "Fields Required", description: "Please enter Registration Country and Tax ID." });
        return;
      }
      payload.files = [registerCountry, taxId];
    } else if (activeStepId === 'duns') {
      if (!dunsNum) {
        toast({ variant: 'destructive', title: "Fields Required", description: "Please enter your DUNS number." });
        return;
      }
      payload.value = dunsNum;
    } else if (activeStepId === 'signatory') {
      if (!sigName || !sigEmail) {
        toast({ variant: 'destructive', title: "Fields Required", description: "Please enter representative details." });
        return;
      }
      payload.name = sigName;
      payload.email = sigEmail;
    } else if (activeStepId === 'bank') {
      if (!bankName || !bankAcc) {
        toast({ variant: 'destructive', title: "Fields Required", description: "Please fill bank name and account." });
        return;
      }
      payload.bankName = bankName;
      payload.account = bankAcc;
    } else if (activeStepId === 'compliance') {
      if (!policyAgreed) {
        toast({ variant: 'destructive', title: "Consent Required", description: "You must check the compliance agreement box to continue." });
        return;
      }
      payload.agreed = true;
    }

    try {
      // @ts-ignore
      saveKycStep(firestore, user.uid, activeStepId, payload);
      setKycSteps(prev => ({
        ...prev,
        [activeStepId]: payload
      }));
      setActiveStepId(null);
      toast({
        title: "Step Completed",
        description: "Your information has been saved successfully.",
      });
    } catch (err: any) {
      toast({ variant: 'destructive', title: "Error Saving details", description: err.message });
    }
  };

  const handleSubmitForReview = () => {
    if (!user || !firestore) return;
    const name = userData?.displayName || user.displayName || 'Employer';
    const email = user.email || '';
    
    // Set all steps to in_review
    const updatedSteps = { ...kycSteps };
    const stepKeys: (keyof KycStepDetails)[] = ['documents', 'duns', 'signatory', 'bank', 'compliance'];
    stepKeys.forEach(k => {
      // @ts-ignore
      if (updatedSteps[k]) {
        // @ts-ignore
        updatedSteps[k].status = 'in_review';
        saveKycStep(firestore, user.uid, k, { ...updatedSteps[k], status: 'in_review' });
      }
    });

    submitKycForReview(firestore, user.uid, name, 'Global Employer', email, kycSteps);
    setKycStatus('pending_review');
    setKycSteps(updatedSteps);
    toast({
      title: "Submitted for Review",
      description: "Your verification request is being reviewed by Zekkers Compliance Team.",
    });
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
          <Button disabled={progress < 100 || kycStatus === 'pending_review' || kycStatus === 'verified'} onClick={handleSubmitForReview}>
            {kycStatus === 'pending_review' ? 'Pending Approval' : kycStatus === 'verified' ? 'Verified' : 'Submit for Review'}
          </Button>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Verification Progress</CardTitle>
          <p className="text-sm text-muted-foreground">{completedSteps} of {stepConfig.length} steps completed</p>
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
              transition={{ duration: 0.5, delay: stepConfig.findIndex(x => x.id === step.id) * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg">{step.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription className="mt-1">{step.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={`capitalize ${statusColors[step.status]}`}>{step.status.replace('_', ' ')}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end gap-2">
                    {step.status !== 'completed' && step.status !== 'in_review' && (
                      <Button variant="outline" onClick={() => handleOpenStep(step.id)}>
                        {step.status === 'needs_changes' ? 'Update Info' : 'Start Step'}
                      </Button>
                    )}
                    {(step.status === 'completed' || step.status === 'in_review') && (
                      <Button variant="ghost" size="sm" onClick={() => handleOpenStep(step.id)}>
                        View Input
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Status Box */}
        <aside className="space-y-6 lg:sticky lg:top-6">
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">Overall Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg flex items-center gap-3 font-bold text-lg ${statusDetails.color} bg-white border-l-4`} style={{borderColor: `currentColor`}}>
                {statusDetails.icon} {statusDetails.text}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trust Score Impact</CardTitle>
              <CardDescription>Completing KYC is the key factor in your Trust Score.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <TrustScoreItem label="Company Docs" value="+40" icon={<CheckCircle size={16} className="text-green-500"/>} />
              <TrustScoreItem label="DUNS Number" value="+20" icon={<CheckCircle size={16} className="text-green-500"/>} />
              <TrustScoreItem label="Signatory & Bank" value="+30" icon={<Clock size={16} className="text-amber-500"/>} />
              <Separator />
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold">Current Score</span>
                <span className="text-2xl font-bold text-primary">{kycStatus === 'verified' ? '100%' : kycStatus === 'pending_review' ? '90%' : `${30 + completedSteps * 12}%`}</span>
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

      {/* Step details Modal Dialog */}
      <Dialog open={activeStepId !== null} onOpenChange={(open) => !open && setActiveStepId(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {activeStepId && stepConfig.find(x => x.id === activeStepId)?.title}
            </DialogTitle>
            <DialogDescription>
              Please enter the details required for this compliance check.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {activeStepId === 'documents' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">Country</Label>
                  <Input id="country" className="col-span-3" value={registerCountry} onChange={e => setRegisterCountry(e.target.value)} placeholder="e.g., India" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="taxId" className="text-right">Tax ID / GST</Label>
                  <Input id="taxId" className="col-span-3" value={taxId} onChange={e => setTaxId(e.target.value)} placeholder="e.g., 29ABCDE1234F1Z5" />
                </div>
              </>
            )}

            {activeStepId === 'duns' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duns" className="text-right">DUNS #</Label>
                <Input id="duns" className="col-span-3" value={dunsNum} onChange={e => setDunsNum(e.target.value)} placeholder="e.g., 12-345-6789 (9 digits)" />
              </div>
            )}

            {activeStepId === 'signatory' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sigName" className="text-right">Full Name</Label>
                  <Input id="sigName" className="col-span-3" value={sigName} onChange={e => setSigName(e.target.value)} placeholder="Representative Name" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sigEmail" className="text-right">Biz Email</Label>
                  <Input id="sigEmail" className="col-span-3" type="email" value={sigEmail} onChange={e => setSigEmail(e.target.value)} placeholder="rep@company.com" />
                </div>
              </>
            )}

            {activeStepId === 'bank' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bankName" className="text-right">Bank Name</Label>
                  <Input id="bankName" className="col-span-3" value={bankName} onChange={e => setBankName(e.target.value)} placeholder="e.g., HDFC Bank" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bankAcc" className="text-right">Account No.</Label>
                  <Input id="bankAcc" className="col-span-3" value={bankAcc} onChange={e => setBankAcc(e.target.value)} placeholder="e.g., 50100123456789" />
                </div>
              </>
            )}

            {activeStepId === 'compliance' && (
              <div className="flex items-center gap-3 bg-slate-50 p-4 border rounded">
                <input
                  type="checkbox"
                  id="policyCheck"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  checked={policyAgreed}
                  onChange={e => setPolicyAgreed(e.target.checked)}
                />
                <Label htmlFor="policyCheck" className="text-sm cursor-pointer select-none">
                  We certify that the organization complies with Zekkers global policies against hiring fraud, complies with GDPR/national data privacy acts and does not discriminate.
                </Label>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveStepId(null)}>Close</Button>
            {activeStepId && kycSteps[activeStepId as keyof KycStepDetails]?.status !== 'completed' && kycSteps[activeStepId as keyof KycStepDetails]?.status !== 'in_review' && (
              <Button onClick={handleSaveStepData}>Save Details</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

