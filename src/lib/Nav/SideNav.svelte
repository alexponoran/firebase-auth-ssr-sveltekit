<script lang="ts">
	import Footer from '$lib/Footer/Footer.svelte';
</script>

<aside
	class="lg:flex absolute left-0 top-0 min-h-screen flex-col items-center justify-start overflow-x-hidden hidden overflow-y-auto bg-surface-500/5 w-56 p-4"
>
	<slot />
	<span class="hidden lg:block">
		<Footer />
	</span>
</aside>
