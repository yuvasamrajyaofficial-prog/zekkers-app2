'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, Auth } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
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
  const { auth } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if auth is initialized (it might be an empty object if config failed)
    // We check for onAuthStateChanged because dummy object won't have it
    // @ts-ignore - checking for property existence on potentially empty object
    if (!auth || !auth.onAuthStateChanged) {
        console.warn("Firebase Auth not initialized in AuthProvider. Skipping listener.");
        setIsLoading(false);
        return;
    }

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
    const { auth } = useFirebase();
    return auth;
}
