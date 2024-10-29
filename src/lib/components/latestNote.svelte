<!-- src/lib/components/LatestNote.svelte -->
<script lang="ts">
	import { NDKKind } from '@nostr-dev-kit/ndk'
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'
	import type { PubkeyEventEntry } from './stores/appDb'

	export let event: PubkeyEventEntry
</script>

{#if event}
	<div class="text-sm truncate">{event.kind}: {NDKKind[event.kind]}</div>
	<div class="text-xs text-muted-foreground">
		<p>Created: {formatDate(event?.createdAt)}</p>
		<p>{formatRelativeTime(event?.createdAt)}</p>
	</div>
{:else}
	<div class="text-sm text-muted-foreground">No notes found</div>
{/if}
