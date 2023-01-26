import type { Actions } from './$types';
import { signIn } from '$lib/firebase';
import { AuthErrorCodes } from 'firebase/auth';
import type { AuthError } from 'firebase/auth';
import { fail, redirect } from '@sveltejs/kit';
import { createSessionCookie } from '$lib/server/firebase';
export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			const { user } = await signIn(body.email as string, body.password as string);
			if (user) {
				const token = await user.getIdToken();
				cookies.set('session', await createSessionCookie(token, 3600), {
					path: '/',
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					maxAge: 3600
				});
			}
		} catch (error: unknown) {
			const err = error as AuthError;
			switch (err.code) {
				case AuthErrorCodes.INVALID_PASSWORD:
					return (
						fail(401),
						{
							error: 'Invalid password.'
						}
					);
				case 'auth/user-not-found' || AuthErrorCodes.INVALID_EMAIL:
					return (
						fail(401),
						{
							error: 'Invalid email.'
						}
					);
				case AuthErrorCodes.UNVERIFIED_EMAIL:
					return (
						fail(401),
						{
							error: 'Please verify your email address before trying to login.'
						}
					);
				case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
					return (
						fail(429),
						{
							error: 'Too many requests. Please try again later.'
						}
					);
				case 'auth/user-disabled':
					return (
						fail(403),
						{
							error: 'Your account has been disabled temporarily. Please contact support.'
						}
					);
				case AuthErrorCodes.INTERNAL_ERROR:
					return (
						fail(500),
						{
							error: 'Server error. Please try again later.'
						}
					);
				default:
					return fail(500, {
						error: 'Something went wrong. Please try again later.'
					});
			}
		}
		throw redirect(303, '/');
	}
};
