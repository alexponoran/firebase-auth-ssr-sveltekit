<script lang="ts">
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	import AuthForm from '$lib/AuthForm.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		if (form?.error) {
			//TODO handle errors
		} else {
		}
	});
</script>

<AuthForm authType="Login" action="?/login" />
