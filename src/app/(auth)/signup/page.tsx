'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update profile with display name
      await updateProfile(user, {
        displayName: name,
      });

      // 3. Create user document in Firestore with role
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name,
        role: role,
        createdAt: new Date().toISOString(),
      });

      // 4. Redirect based on role
      switch (role) {
        case 'student':
          router.push('/dashboard');
          break;
        case 'employer':
          router.push('/employer-dashboard');
          break;
        case 'admin':
          router.push('/admin-dashboard');
          break;
        case 'ngo':
          router.push('/ngo-dashboard');
          break;
        case 'college':
          router.push('/college-dashboard');
          break;
        case 'global_employer':
          router.push('/global-employers-dashboard');
          break;
        default:
          router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-950 border-slate-800 text-white shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">Create an account</CardTitle>
        <CardDescription className="text-center text-slate-400">
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/50 border-red-900 text-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">Full Name</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-yellow-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-yellow-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              minLength={6}
              className="bg-slate-900 border-slate-800 text-white focus-visible:ring-yellow-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-slate-200">I am a...</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-slate-900 border-slate-800 text-white focus:ring-yellow-500">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-white">
                <SelectItem value="student" className="focus:bg-slate-800 focus:text-white">Student / Job Seeker</SelectItem>
                <SelectItem value="employer" className="focus:bg-slate-800 focus:text-white">Employer</SelectItem>
                <SelectItem value="college" className="focus:bg-slate-800 focus:text-white">College / University</SelectItem>
                <SelectItem value="ngo" className="focus:bg-slate-800 focus:text-white">NGO / Non-Profit</SelectItem>
                <SelectItem value="global_employer" className="focus:bg-slate-800 focus:text-white">Global Employer</SelectItem>
                {/* Admin role is usually hidden or invite-only, but keeping for demo */}
                <SelectItem value="admin" className="focus:bg-slate-800 focus:text-white">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center text-slate-400 w-full">
          Already have an account?{' '}
          <Link href="/login" className="text-yellow-400 hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
