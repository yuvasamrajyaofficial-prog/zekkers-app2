'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFirestore } from '@/firebase';
import { fetchPendingKycRequests, approveOrRejectKyc, type KycRequest } from '@/services/kyc';
import { useToast } from '@/hooks/use-toast';
import ZLoader from '@/components/ui/loader';

export default function AdminVerificationPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [requests, setRequests] = useState<KycRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadRequests = async () => {
    if (!firestore) return;
    try {
      setLoading(true);
      const res = await fetchPendingKycRequests(firestore);
      setRequests(res);
    } catch (err: any) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error loading requests', description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [firestore]);

  const handleAction = async (userId: string, isApprove: boolean) => {
    if (!firestore) return;
    setProcessingId(userId);
    try {
      const status = isApprove ? 'Approved' : 'Rejected';
      await approveOrRejectKyc(firestore, userId, status);
      toast({
        title: `KYC Request ${status}`,
        description: `The request has been updated. User documents are registered as ${isApprove ? 'verified' : 'rejected'}.`,
      });
      // Refresh list
      await loadRequests();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Action Failed', description: err.message });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Verification Requests</h1>
            <p className="text-muted-foreground">Review and approve entity verification documents.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{requests.length}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">8</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rejected Today</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
            <CardDescription>Entities waiting for approval.</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
              <div className="flex justify-center py-10">
                <ZLoader />
              </div>
            ) : requests.length > 0 ? (
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Entity Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Submitted By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>DUNS / Tax details</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {requests.map((req) => (
                          <TableRow key={req.id}>
                              <TableCell className="font-medium">{req.entityName}</TableCell>
                              <TableCell>
                                  <Badge variant="outline">{req.type}</Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground">{req.submittedBy}</TableCell>
                              <TableCell>{req.date}</TableCell>
                              <TableCell>
                                  <div className="space-y-1">
                                    {req.dunsNumber && (
                                      <Badge variant="secondary" className="flex w-max items-center gap-1">
                                        DUNS: {req.dunsNumber}
                                      </Badge>
                                    )}
                                    {req.documents?.map((doc, i) => (
                                        <Badge key={i} variant="secondary" className="flex w-max items-center gap-1">
                                            <FileText className="h-3 w-3" /> {doc}
                                        </Badge>
                                    ))}
                                  </div>
                              </TableCell>
                              <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-2">
                                      <Button 
                                        size="sm" 
                                        className="bg-green-600 hover:bg-green-700"
                                        disabled={processingId === req.id}
                                        onClick={() => handleAction(req.id, true)}
                                      >
                                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="destructive"
                                        disabled={processingId === req.id}
                                        onClick={() => handleAction(req.id, false)}
                                      >
                                          <XCircle className="h-4 w-4 mr-1" /> Reject
                                      </Button>
                                  </div>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No pending verifications. All caught up!
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
