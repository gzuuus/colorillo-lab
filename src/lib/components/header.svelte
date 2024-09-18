<script lang="ts">
	import ndkStore from '$lib'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import LoginButton from './loginButton.svelte'

	function goToProfile() {
		if ($ndkStore.activeUser) {
			goto(`/p/${$ndkStore.activeUser.pubkey}`)
		}
	}
</script>

<header
	class="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 items-center justify-between">
		<div class="flex items-center space-x-4">
			<a class="flex items-center space-x-2" href="/">
				<span class="font-bold">Colorillo</span>
			</a>
			{#if $ndkStore.activeUser}
				<Button variant="ghost" on:click={goToProfile}>Contacts</Button>
			{/if}
		</div>
		<LoginButton />
	</div>
</header>
