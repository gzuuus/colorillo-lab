<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation'
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import ndkStore from '$lib/components/stores/ndk'
	import { useQueryClient } from '@tanstack/svelte-query'
	const queryClient = useQueryClient()

	async function handleLogin() {
		const loginResult = await loginWithExtension(queryClient)
		if (loginResult && $ndkStore.activeUser) {
			goto(`/p/${$ndkStore.activeUser.pubkey}`)
		} else {
			// Handle login error
			console.error('Login failed')
		}
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-background">
	<h1 class="text-3xl font-bold mb-8">Login to Colorillo</h1>
	<Button on:click={handleLogin}>Login with Nostr Extension</Button>
</div>
