// import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signUp } from '$lib/firebase';
import { AuthErrorCodes, sendEmailVerification } from 'firebase/auth';
import type { AuthError } from 'firebase/auth';
import { fail } from '@sveltejs/kit';
export const actions: Actions = {
	register: async ({ request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			const { user } = await signUp(body.email as string, body.password as string);
			sendEmailVerification(user);
		} catch (error: unknown) {
			const err = error as AuthError;
			switch (err.code) {
				case AuthErrorCodes.EMAIL_EXISTS:
					return (
						fail(401),
						{
							error: 'The email address is already in use by another account.'
						}
					);
				case AuthErrorCodes.WEAK_PASSWORD:
					return (
						fail(401),
						{
							error:
								'The password is too weak. Please choose a password with at least 6 characters.'
						}
					);
				case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
					return (
						fail(429),
						{
							error: 'Too many requests. Please try again later.'
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
		return {
			headers: { location: '/' },
			status: 302,
			success: true
		};
	}
};
