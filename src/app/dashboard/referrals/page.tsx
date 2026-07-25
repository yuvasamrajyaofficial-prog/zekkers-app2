'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { useAuth } from '@/context/auth-context';
import { fetchUserReferrals, generateReferralCode, type Referral } from '@/services/referrals';
import { Gift, Copy, Check, Users, Sparkles, Send, Award } from 'lucide-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ZLoader from '@/components/ui/loader';

export default function ReferralsPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useAuth();
  
  const [code, setCode] = useState('');
  const [points, setPoints] = useState(0);
  const [count, setCount] = useState(0);
  const [referralsList, setReferralsList] = useState<Referral[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sendingInvite, setSendingInvite] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!user || !firestore) return;
      try {
        setLoading(true);
        // 1. Fetch user referral stats
        const userRef = doc(firestore, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        let referralCode = '';
        if (userSnap.exists()) {
          const udata = userSnap.data();
          referralCode = udata.referralCode || '';
          setPoints(udata.referralPoints || 0);
          setCount(udata.referralsCount || 0);
        }

        // If code is somehow missing, generate and save it
        if (!referralCode) {
          referralCode = generateReferralCode(user.uid);
          await updateDoc(userRef, { referralCode });
        }
        setCode(referralCode);

        // 2. Fetch referrals list
        const list = await fetchUserReferrals(firestore, user.uid);
        setReferralsList(list);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, firestore]);

  const handleCopyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: 'Code Copied!',
      description: 'Your referral code has been copied to your clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSendingInvite(true);
    
    // Simulate sending invite
    setTimeout(() => {
      setSendingInvite(false);
      setEmailInput('');
      toast({
        title: 'Invite Sent!',
        description: `Successfully emailed referral link to ${emailInput}`,
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 bg-slate-50 min-h-screen">
        <ZLoader />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Gift className="text-primary" /> Refer & Earn Rewards
        </h1>
        <p className="text-muted-foreground mt-1 max-w-xl">
          Invite your friends, mates, and colleagues to join Zekkers. Earn 100 reward points for every user who registers with your code.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-primary text-white border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground flex items-center justify-between">
              Your Referral Code
              <Sparkles size={16} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-extrabold tracking-wider">{code}</div>
            <Button 
              variant="secondary" 
              className="w-full gap-2 text-primary font-bold hover:bg-slate-100"
              onClick={handleCopyCode}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Code'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Award size={16} className="text-primary" /> Reward Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-800">{points}</div>
            <p className="text-xs text-muted-foreground mt-1">Unlock premium templates & certificates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Users size={16} className="text-primary" /> Total Invites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-800">{count}</div>
            <p className="text-xs text-muted-foreground mt-1">Directly onboarded to Zekkers network</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 items-start">
        {/* Sends email invitation */}
        <Card className="md:col-span-1 border-slate-200">
          <CardHeader>
            <CardTitle>Send Email Invite</CardTitle>
            <CardDescription>We'll email your customized registration link containing your referral code.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendInvite} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="friendEmail">Friend's Email Address</Label>
                <Input 
                  id="friendEmail"
                  type="email"
                  placeholder="friend@example.com"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={sendingInvite}>
                <Send size={14} /> Send Invitation
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* History table */}
        <Card className="md:col-span-2 border-slate-200">
          <CardHeader>
            <CardTitle>Referral Progress</CardTitle>
            <CardDescription>Track the registration status of your referred friends.</CardDescription>
          </CardHeader>
          <CardContent>
            {referralsList.length > 0 ? (
              <div className="border rounded-md">
                <table className="w-full border-collapse text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b text-slate-700 font-semibold">
                    <tr>
                      <th className="p-3">Friend Name</th>
                      <th className="p-3">Joined Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Points Earned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {referralsList.map((ref) => (
                      <tr key={ref.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-medium text-slate-900">{ref.referredName}</td>
                        <td className="p-3 text-muted-foreground">{ref.createdAt}</td>
                        <td className="p-3">
                          <Badge variant="outline" className={ref.status === 'joined' ? 'text-green-700 bg-green-50 border-green-200' : 'text-primary bg-primary/10 border-primary/20'}>
                            {ref.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right font-semibold text-slate-700">+{ref.rewardPoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg space-y-2">
                <Gift className="mx-auto h-8 w-8 text-slate-400 group-hover:text-primary" />
                <div className="font-semibold text-slate-700">No Invites Sent Yet</div>
                <p className="text-xs text-slate-400">Your referral history will appear here once friends sign up with your code.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
