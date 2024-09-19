<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/components/stores/ndk'

	function navigateToProfile() {
		if ($ndkStore.activeUser) {
			goto(`/p/${$ndkStore.activeUser.pubkey}`)
		} else {
			goto('/login')
		}
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-background">
	<h1 class="text-4xl font-bold mb-8 text-primary">Colorillo</h1>
	<p class="text-lg text-center mb-8 text-muted-foreground">Your colorful contact list manager</p>
	<Button on:click={navigateToProfile}>
		{$ndkStore.activeUser ? 'View Profile' : 'Get Started'}
	</Button>
</div>
