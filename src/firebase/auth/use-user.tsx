'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, getAuth, Auth, User } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase/provider';
import ZLoader from '@/components/ui/loader';

interface AuthContextState {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ZLoader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};

export const useAuth = (): Auth => {
    const app = useFirebaseApp();
    return getAuth(app);
}
