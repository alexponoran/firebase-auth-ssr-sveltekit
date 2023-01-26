<script lang="ts">
	import { forgetPassword } from '$lib/firebase';
	import { fly } from 'svelte/transition';
	export let authType: string;
	export let action: string;
	let forgotPasswordEmail: string;
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from '../routes/$types';
	let forgotPassword: boolean = false;
	function triggerToast(message: string, preset: ToastSettings['preset']): void {
		const t: ToastSettings = {
			message: message,
			preset: preset,
			autohide: true,
			timeout: 5000
		};
		toastStore.trigger(t);
	}
</script>

<div class="flex min-h-screen w-full items-center justify-center">
	<section
		class="my-4 grid h-fit w-[320px] place-items-center bg-surface-900-50-token rounded-lg pt-4 m:w-[390px] sm:w-[600px] sm:pt-10 2xl:w-[800px]"
	>
		{#if !forgotPassword}
			<form
				in:fly={{ x: 50, duration: 200 }}
				{action}
				method="POST"
				class="flex h-fit w-full flex-col items-center justify-center gap-y-2 sm:gap-y-4"
			>
				<h1 class="text-surface-50-900-token">{authType}</h1>
				{#if authType === 'Register'}
					<p class="mb-8 !text-surface-50-900-token">
						Already have an account?
						<a
							class="!text-surface-50-900-token !decoration-surface-50-900-token !decoration-solid !underline-offset-2 hover:!text-tertiary-300 hover:!decoration-tertiary-300"
							aria-label="login"
							href="/login"
							>Login
						</a>
						instead!
					</p>
				{:else}
					<p class="mb-8 !text-surface-50-900-token">
						Don't have an account?
						<a
							class="!text-surface-50-900-token !decoration-surface-50-900-token !decoration-solid !underline-offset-2 hover:!text-tertiary-300 hover:!decoration-tertiary-300"
							aria-label="register"
							href="/register"
							>Register
						</a> first!
					</p>
				{/if}
				<label for="email" class="w-3/4">
					<span class="!text-surface-50-900-token ml-2 text-base sm:text-lg">Email</span>
					<input
						class="placeholder:!text-surface-900-50-token w-full !p-3 !text-sm bg-surface-50-900-token sm:!text-base"
						type="email"
						name="email"
						placeholder="Enter your email address..."
					/>
				</label>
				<label for="password" class="w-3/4">
					<span class="!text-surface-50-900-token ml-2 text-base sm:text-lg">Password</span>
					<input
						class="placeholder:!text-surface-900-50-token w-full !p-3 !text-sm bg-surface-50-900-token sm:!text-base"
						type="password"
						name="password"
						placeholder="Enter your password (min. 6 characters)..."
					/>
				</label>
				{#if authType === 'Login' && !forgotPassword}
					<div class="flex w-3/4 items-center justify-start">
						<button
							type="button"
							aria-label="Forgot password?"
							on:click={() => (forgotPassword = true)}
							class="btn btn-sm btn-filled-primary"
						>
							Forgot password?
						</button>
					</div>
				{/if}
				<button type="submit" aria-label={authType} class="btn btn-lg btn-filled-primary mt-6"
					>{authType}</button
				>
				<p class="p-4 !text-surface-50-900-token">
					Read our
					<a
						class="!text-surface-50-900-token !decoration-surface-50-900-token !decoration-solid !underline-offset-2 hover:!text-tertiary-300 hover:!decoration-tertiary-300"
						aria-label="privacy policy"
						href="/legal/privacy-policy"
						>privacy policy
					</a>
					to learn more about how we handle your data.
				</p>
			</form>
		{:else}
			<form
				on:submit={async () => {
					if (!forgotPasswordEmail || !forgotPasswordEmail.includes('@')) return;
					await forgetPassword(forgotPasswordEmail);
					forgotPasswordEmail = '';
				}}
				in:fly={{ x: 50, duration: 200 }}
				class="flex h-fit w-[320px] flex-col items-center justify-center gap-y-4 m:w-[390px] sm:w-[600px] 2xl:w-[800px]"
			>
				<h1 class="text-surface-50-900-token">Enter your email</h1>
				<label for="email" class="w-3/4">
					<span class="ml-2 text-base !text-white dark:!text-white sm:text-lg">Email</span>
					<input
						bind:value={forgotPasswordEmail}
						class="placeholder:!text-surface-900-50-token w-full !p-3 !text-sm bg-surface-50-900-token sm:!text-base"
						type="email"
						name="email"
						placeholder="Enter your email address..."
					/>
				</label>
				<div class="flex flex-col items-center justify-center gap-x-4 p-4 sm:flex-row">
					<button
						type="button"
						on:click={() => (forgotPassword = false)}
						aria-label="Go back to login"
						class="btn btn-filled-primary mt-6"
					>
						Go back to login</button
					>
					<button
						type="submit"
						aria-label="Send reset password link"
						class="btn btn-filled-primary mt-6"
					>
						Send password reset link
					</button>
				</div>
			</form>
		{/if}
	</section>
</div>
