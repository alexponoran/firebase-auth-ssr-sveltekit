import type { Auth, User } from 'firebase/auth';
declare global {
	declare namespace App {
		interface Locals {
			user: User | null;
			client: Auth | null;
		}
		// interface Session {
		// 	uid: string | undefined;
		// 	email: string | null | undefined;
		// 	emailVerified: boolean | undefined;
		// }
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
