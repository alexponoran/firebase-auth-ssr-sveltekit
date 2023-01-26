import { initializeApp, getApps, getApp } from 'firebase/app';
import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import {
	getAuth,
	setPersistence,
	inMemoryPersistence,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail
} from 'firebase/auth';
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN
} from '$env/static/public';
const firebaseConfig: FirebaseOptions = {
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	apiKey: PUBLIC_FIREBASE_API_KEY
};

export const getClientApp: () => Promise<FirebaseApp> = async () => {
	if (getApps().length) return getApp();

	const clientApp = initializeApp(firebaseConfig);
	const auth = getAuth(clientApp);
	await setPersistence(auth, inMemoryPersistence);
	return clientApp;
};
export const auth = async () => {
	const auth = getAuth(await getClientApp());
	return auth;
};

export const signIn = async (email: string, password: string) => {
	const session = await auth();
	return signInWithEmailAndPassword(session, email, password);
};
export const signUp = async (email: string, password: string) => {
	const session = await auth();
	return createUserWithEmailAndPassword(session, email, password);
};
export const logout = async () => {
	const session = await auth();
	return signOut(session);
};
export const forgetPassword = async (email: string) => {
	const session = await auth();
	return sendPasswordResetEmail(session, email);
};
