import { getIdTokenFromSessionCookie, createSessionCookie } from '$lib/server/firebase';
import { redirect, type Handle, type Cookies } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/auth';
import type { User } from 'firebase/auth';
import { auth } from '$lib/firebase';
export const handle: Handle = async ({ event, resolve }) => {
	if (event.cookies.get('session')) {
		const session = await auth();
		const token = await getIdTokenFromSessionCookie(event.cookies.get('session') || null);
		event.locals.user = token ? session.currentUser : null;
		event.locals.client = token ? session : null;
		if (token && shouldRefreshToken(token)) {
			await updateSessionCookie(event.locals.user, 3600, event.cookies);
		}
	}

	// ---------------------------------------------------------------------------------------------
	if (
		(event.url.pathname.startsWith('/account') || event.url.pathname === '/') &&
		!event.locals.user
	) {
		throw redirect(301, '/login');
	}
	if (
		(event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) &&
		event.locals.user
	) {
		throw redirect(301, '/');
	}

	return resolve(event);
};
const shouldRefreshToken = (token: DecodedIdToken | null) => {
	return token && token.exp - Date.now() / 1000 < 300;
};

async function updateSessionCookie(session: User | null, maxAge: number, cookies: Cookies) {
	const token = await session?.getIdToken();
	const freshSessionCookie = await createSessionCookie(token as string, 3600);

	cookies.set('session', freshSessionCookie, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: 3600
	});
}
