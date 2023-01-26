export const navLinks: NavLink[] = [
	{
		name: 'Dashboard',
		path: '/'
	},
	{
		name: 'Account',
		path: '/account'
	},
	{
		name: 'Support',
		path: '/support'
	}
];
export type NavLink = {
	name: string;
	path: string;
};
