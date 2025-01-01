/// file: src/lib/types/user.ts
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    firstName?: string;
    lastName?: string;
}