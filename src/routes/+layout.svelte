<script lang="ts">
	import { getAuth, onAuthStateChanged, type Auth } from 'firebase/auth';
	import { getClientApp } from '$lib/firebase';
	import type { LayoutData } from './$types';
	import { auth } from '$lib/firebase';
	export let data: LayoutData;
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import Nav from '$lib/Nav/Nav.svelte';
	import SideNav from '$lib/Nav/SideNav.svelte';
	import Logo from '$lib/Logo.svelte';
	import Footer from '$lib/Footer/Footer.svelte';

	onMount(async () => {
		const session = await auth();
		console.log(session.currentUser);
	});
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		{#if data.uid}
			<AppBar class="lg:hidden">
				<svelte:fragment slot="lead">
					<Logo />
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<Nav />
					<span class="hidden sm:block">
						<LightSwitch />
					</span>
				</svelte:fragment>
			</AppBar>
		{/if}
	</svelte:fragment>
	{#if data.uid}
		<SideNav>
			<Logo />
			<span class="mb-8" />
			<Nav />
			<span class="mb-8" />
			<LightSwitch />
		</SideNav>
	{/if}
	<slot />
	<span class="lg:hidden">
		<Footer />
	</span>
</AppShell>
