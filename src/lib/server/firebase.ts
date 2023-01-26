import { cert, type App, type ServiceAccount, type AppOptions } from 'firebase-admin/app';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { getAuth } from 'firebase-admin/auth';
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } from '$env/static/private';
const adminConfig: AppOptions = {
	credential: cert({
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		clientEmail: FIREBASE_CLIENT_EMAIL,
		privateKey: FIREBASE_PRIVATE_KEY.replaceAll('\\n', '\n')
	} as ServiceAccount),
	projectId: PUBLIC_FIREBASE_PROJECT_ID
};
export const getAdminApp = (): App => (getApps().length ? getApp() : initializeApp(adminConfig));

export const createSessionCookie = async (token: string, maxAge: number) => {
	const expiresIn = maxAge * 1000;
	const auth = getAuth(getAdminApp());
	return await auth.createSessionCookie(token, {
		expiresIn
	});
};

export const verifyIdToken = (token: string): Promise<DecodedIdToken> => {
	const auth = getAuth(getAdminApp());
	return auth.verifyIdToken(token);
};

export const getIdTokenFromSessionCookie = async (
	sessionCookie: string | null
): Promise<DecodedIdToken | null> => {
	if (!sessionCookie) return null;

	const auth = getAuth(getAdminApp());

	return auth.verifySessionCookie(sessionCookie, true).catch(() => null);
};
