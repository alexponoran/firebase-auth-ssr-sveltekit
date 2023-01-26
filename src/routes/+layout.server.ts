import type { LayoutServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import type { AuthError } from 'firebase/auth';
import { AuthErrorCodes } from 'firebase/auth';
export const load: LayoutServerLoad = async ({ locals }) => {
	try {
		const payload = await locals.user?.getIdToken();
		if (payload) {
			return {
				uid: locals.user?.uid,
				email: locals.user?.email,
				emailVerified: locals.user?.emailVerified
			};
		}
	} catch (error: unknown) {
		const err = error as AuthError;
		switch (err.code) {
			case AuthErrorCodes.TOKEN_EXPIRED:
				return (
					fail(401),
					{
						error: 'Token expired. Please sign in again.'
					}
				);
			case AuthErrorCodes.USER_DISABLED:
				return (
					fail(401),
					{
						error: 'User disabled. Please contact support.'
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
				return (
					fail(500),
					{
						error: 'Something went wrong. Please try again later.'
					}
				);
		}
	}
};
