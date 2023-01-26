<script lang="ts">
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	// export let data: PageData; ??
	import AuthForm from '$lib/AuthForm.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		if (form?.error) {
			//TODO handle errors
		} else {
			//TODO handle success notify of email sent
		}
	});
</script>

<AuthForm authType="Register" action="?/register" />
