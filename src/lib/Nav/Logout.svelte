<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { auth } from '$lib/firebase';
	const submitLogout = async () => {
		await fetch('/logout', {
			method: 'GET'
		});
		const session = await auth();
		session.signOut();
		invalidateAll();
	};
</script>

<form on:submit|preventDefault={submitLogout}>
	<button
		class="btn btn-xl sm:btn-sm btn-filled-primary w-32 sm:w-24 lg:btn-base lg:w-32"
		type="submit"
	>
		<span class="flex-auto"> Sign Out </span>
	</button>
</form>
