'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role to redirect correctly
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

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
      } else {
        // Fallback if role is missing (shouldn't happen)
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-950 border-slate-800 text-white shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">Sign in</CardTitle>
        <CardDescription className="text-center text-slate-400">
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/50 border-red-900 text-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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
              className="bg-slate-900 border-slate-800 text-white focus-visible:ring-yellow-500"
            />
          </div>
          <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-sm text-center text-slate-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-yellow-400 hover:underline font-medium">
            Sign up
          </Link>
        </div>
        <div className="text-sm text-center">
            <Link href="/forgot-password" className="text-slate-500 hover:text-slate-300 transition-colors">
                Forgot password?
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
