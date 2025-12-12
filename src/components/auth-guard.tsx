'use client';
import { useAuth, UserRole } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (allowedRoles && userData && !allowedRoles.includes(userData.role)) {
        // Redirect to their appropriate dashboard if they try to access a wrong one
        switch (userData.role) {
            case 'student': router.push('/dashboard'); break;
            case 'employer': router.push('/employer-dashboard'); break;
            case 'admin': router.push('/admin-dashboard'); break;
            case 'ngo': router.push('/ngo-dashboard'); break;
            case 'college': router.push('/college-dashboard'); break;
            case 'global_employer': router.push('/global-employers-dashboard'); break;
            default: router.push('/dashboard');
        }
      }
    }
  }, [user, userData, loading, router, allowedRoles, pathname]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (allowedRoles && userData && !allowedRoles.includes(userData.role)) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
