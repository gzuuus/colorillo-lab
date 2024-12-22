<script lang="ts">
	import ndkStore from '$lib/stores/ndk'
	import Relays from '$lib/components/user/relays.svelte'
	import LoginButton from '$lib/components/loginButton.svelte'
	import Profile from '$lib/components/user/profile.svelte'
</script>

<div class="flex flex-col items-center justify-center w-full">
	{#if $ndkStore.activeUser}
		<Profile />
		<Relays />
	{:else}
		<h1 class="text-4xl font-bold mb-8 text-primary">Colorillo</h1>
		<p class="text-lg text-center mb-8 text-muted-foreground">Your colorful contact list manager</p>
		<LoginButton />
	{/if}
</div>
