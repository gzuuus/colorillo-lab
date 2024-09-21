<!-- src/lib/components/LatestNote.svelte -->
<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import { createLatestEventQuery } from '$lib/queries/events.query'
	import type { NDKEvent } from '@nostr-dev-kit/ndk'
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'

	export let pubkey: string

	const dispatch = createEventDispatcher<{
		noteLoaded: { pubkey: string; event: NDKEvent | null; timestamp: number }
	}>()

	const latestEventQuery = createLatestEventQuery(pubkey)

	$: if ($latestEventQuery.data) {
		dispatch('noteLoaded', {
			pubkey,
			event: $latestEventQuery.data,
			timestamp: $latestEventQuery.data.created_at ?? 0
		})
	}
</script>

{#if $latestEventQuery.isLoading}
	<div class="text-sm text-muted-foreground">Loading latest note...</div>
{:else if $latestEventQuery.isError}
	<div class="text-sm text-destructive">Error loading note</div>
{:else if $latestEventQuery.data}
	<div class="text-sm truncate">{$latestEventQuery.data.content}</div>
	<div class="text-xs text-muted-foreground">
		<p>Created: {formatDate($latestEventQuery.data?.created_at)}</p>
		<p>{formatRelativeTime($latestEventQuery.data?.created_at)}</p>
	</div>
{:else}
	<div class="text-sm text-muted-foreground">No notes found</div>
{/if}
