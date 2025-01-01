/// file: src/lib/stores/authStore.ts
import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';
import { auth, db } from '$lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export const user = writable<User | null>(null);

export const authStore = {
    signInWithGoogle: async () => {
        try {
            const provider = new GoogleAuthProvider();
            // Add scopes if needed
            provider.addScope('profile');
            provider.addScope('email');

            // Configure custom parameters
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);
            const userData: User = {
                uid: result.user.uid,
                email: result.user.email || '',
                displayName: result.user.displayName || '',
                photoURL: result.user.photoURL || '',
                firstName: result.user.displayName?.split(' ')[0] || '',
                lastName: result.user.displayName?.split(' ')[1] || ''
            };

            await setDoc(doc(db, 'users', userData.uid), userData, { merge: true });
            user.set(userData);
            return userData;
        } catch (error: any) {
            console.error('Error signing in with Google', error.message);
            throw error;
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            user.set(null);
        } catch (error) {
            console.error('Error signing out', error);
            throw error;
        }
    },

    loadUser: async (uid: string) => {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data() as User;
                user.set(userData);
                return userData;
            }
            return null;
        } catch (error) {
            console.error('Error loading user', error);
            throw error;
        }
    }
};