'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, where, addDoc, serverTimestamp } from 'firebase/firestore';

export type Workspace = {
    id: string;
    ownerId: string;
    title: string;
    visibility: 'private' | 'shared' | 'public';
    sharedWith: string[];
    createdAt: any;
    updatedAt: any;
}

export function useWorkspaces(userId?: string) {
    const firestore = useFirestore();

    const workspacesCollection = useMemo(() => {
        // Check if firestore is initialized and has the 'app' property (real instance)
        // The dummy instance returned by initializeFirebase when config is missing is just {}
        if (!firestore || !firestore.app) return null;
        return collection(firestore, 'workspaces');
    }, [firestore]);

    // Query for workspaces owned by the user
    const userWorkspacesQuery = useMemo(() => {
        if (!workspacesCollection || !userId) return null;
        return query(workspacesCollection, where('ownerId', '==', userId));
    }, [workspacesCollection, userId]);

    const { data: workspaces, isLoading, error } = useCollection<Workspace>(userWorkspacesQuery);

    const createWorkspace = useCallback(async (title: string): Promise<string> => {
        if (!workspacesCollection || !userId) {
            throw new Error("Firestore not available or user not logged in.");
        }
        const docRef = await addDoc(workspacesCollection, {
            ownerId: userId,
            title: title,
            visibility: 'private',
            sharedWith: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    }, [workspacesCollection, userId]);

    return {
        workspaces: workspaces || [],
        loading: isLoading,
        error,
        createWorkspace
    };
}
