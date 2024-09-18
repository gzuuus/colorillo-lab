<script lang="ts">
	import { createUserProfileByIdQuery } from '$lib/queries/follows.query'

	export let color: string
	export let pubkey: string

	const profile = createUserProfileByIdQuery(pubkey)

	$: name = $profile.data?.name || $profile.data?.displayName || $profile.data?.nip05 || 'Unnamed'
</script>

{#if $profile.data}
	<div
		class="grid grid-cols-[48px,1fr,auto] items-center hover:bg-muted transition-colors border-t first:border-t-0"
	>
		<div class="h-16 w-full" style:background-color={color}></div>
		<div class="px-4 py-3">
			<h3 class="font-semibold">{name}</h3>
			<p class="text-sm text-muted-foreground">{pubkey.slice(0, 8)}...</p>
		</div>
		<div class="hidden md:block text-xs font-mono text-muted-foreground pr-4">{color}</div>
	</div>
{/if}
