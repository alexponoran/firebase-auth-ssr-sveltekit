<script lang="ts">
	import NavLink from './NavLink.svelte';
	import { navLinks } from './navLinks';
	import Fa from 'svelte-fa';
	import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import Logo from '$lib/Logo.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Logout from './Logout.svelte';
	let showMenu = false;
</script>

<nav>
	<ul class="hidden sm:flex lg:flex-col sm:flex-row items-center justify-center sm:gap-2 md:gap-8">
		{#each navLinks as link}
			<NavLink {link} />
		{/each}
		<Logout />
	</ul>
	<button
		on:click={() => {
			showMenu = !showMenu;
		}}
		aria-label="Open Menu"
		class="btn text-3xl sm:hidden"
	>
		<Fa icon={faBars} />
	</button>
	{#if showMenu}
		<ul
			transition:slide={{ duration: 300 }}
			class="fixed top-0 left-0 w-full h-full bg-surface-100-800-token sm:hidden flex flex-col items-center justify-center gap-12"
		>
			<button
				on:click={() => (showMenu = !showMenu)}
				aria-label="Close Menu"
				class="btn text-4xl absolute top-2 left-2 sm:hidden"
			>
				<Fa icon={faXmark} />
			</button>
			{#each navLinks as link}
				<NavLink {link} />
			{/each}
			<li>
				<LightSwitch />
			</li>
			<li>
				<Logo />
			</li>
		</ul>
	{/if}
</nav>
