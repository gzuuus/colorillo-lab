<!-- ContactCard.svelte -->
<script lang="ts">
	import { createProfileQuery, getProfileName } from '$lib/queries/follows.query'

	export let color: string
	export let pubkey: string

	const profileQuery = createProfileQuery(pubkey)
</script>

<div
	class="grid grid-cols-[48px,1fr,auto] items-center hover:bg-muted transition-colors border-t first:border-t-0"
>
	<div class="h-16 w-full" style:background-color={color}></div>
	<div class="px-4 py-3">
		{#if $profileQuery.isLoading}
			<h3 class="font-semibold">Loading...</h3>
		{:else if $profileQuery.isError}
			<h3 class="font-semibold">Error loading profile</h3>
		{:else}
			<h3 class="font-semibold">{getProfileName($profileQuery.data)}</h3>
		{/if}
		<p class="text-sm text-muted-foreground">{pubkey.slice(0, 8)}...</p>
	</div>
	<div class="hidden md:block text-xs font-mono text-muted-foreground pr-4">{color}</div>
</div>
