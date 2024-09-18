<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib'
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-background">
	<h1 class="text-4xl font-bold mb-8 text-primary">Colorillo</h1>
	<p class="text-lg text-center mb-8 text-muted-foreground">Your colorful contact list manager</p>
	{#if $ndkStore.activeUser}
		<Button on:click={() => goto(`/p/${$ndkStore.activeUser?.pubkey}`)}>View Contacts</Button>
	{:else}
		<p class="text-muted-foreground">Please log in to view your contacts</p>
	{/if}
</div>
