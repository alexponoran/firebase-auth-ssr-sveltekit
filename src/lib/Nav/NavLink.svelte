<script lang="ts">
	import type { NavLink } from './navLinks';
	export let link: NavLink;
</script>

<li>
	<a
		href={link.path}
		class="btn btn-xl sm:btn-sm btn-filled-primary w-32 sm:w-24 lg:btn-base lg:w-32"
	>
		{link.name}
	</a>
</li>
