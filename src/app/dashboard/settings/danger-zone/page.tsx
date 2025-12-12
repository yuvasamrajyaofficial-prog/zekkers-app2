'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, LogOut } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DangerZonePage() {
  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-red-600">Danger Zone</h1>
        <p className="text-muted-foreground">Irreversible actions for your account.</p>
      </div>

      <Card className="border-red-200">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600"><AlertTriangle className="h-5 w-5" /> Delete Account</CardTitle>
            <CardDescription>Permanently delete your account and all associated data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
                Once you delete your account, there is no going back. Please be certain.
                All your data including profile information, resume, and application history will be permanently removed.
            </p>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Account</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><LogOut className="h-5 w-5" /> Sign Out All Devices</CardTitle>
            <CardDescription>Log out of all active sessions across all devices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
                This will sign you out of Zekkers on all browsers and devices where you are currently logged in.
            </p>
            <Button variant="outline">Sign Out All Devices</Button>
        </CardContent>
      </Card>
    </div>
  );
}
