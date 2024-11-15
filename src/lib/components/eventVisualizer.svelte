<script lang="ts">
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'
	import { NDKKind } from '@nostr-dev-kit/ndk'
	import type { NDKEvent } from '@nostr-dev-kit/ndk'
	import { Badge } from '$lib/components/ui/badge'
	import { Card, CardContent, CardFooter } from '$lib/components/ui/card'
	import { Collapsible, CollapsibleTrigger } from './ui/collapsible'
	import CollapsibleContent from './ui/collapsible/collapsible-content.svelte'

	export let event: NDKEvent | undefined
	let open: boolean
</script>

{#if event != undefined}
	<Card>
		<CardContent>
			<h3 class="text-lg font-semibold">
				{event ? NDKKind[Number(event.kind)] || `Kind ${event.kind}` : 'Unknown Event'}
			</h3>
			<Collapsible bind:open>
				<CollapsibleTrigger>View</CollapsibleTrigger>
				<CollapsibleContent>
					<div class="whitespace-pre-wrap">
						<span>{event?.content}</span>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</CardContent>
		<CardFooter class="text-sm text-muted-foreground">
			{#if event}
				<Badge variant="outline" class="mr-2">{formatRelativeTime(event.created_at)}</Badge>
				<span>{formatDate(event.created_at)}</span>
			{/if}
		</CardFooter>
	</Card>
{:else}
	No event
{/if}
