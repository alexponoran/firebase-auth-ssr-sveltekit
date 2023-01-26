import { redirect } from '@sveltejs/kit';
import { logout } from '$lib/firebase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	await logout();
	cookies.delete('session');
	throw redirect(303, '/');
};
