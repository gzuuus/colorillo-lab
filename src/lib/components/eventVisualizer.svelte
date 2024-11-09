<script lang="ts">
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'
	import { NDKKind } from '@nostr-dev-kit/ndk'
	import type { NDKEvent } from '@nostr-dev-kit/ndk'
	import { Badge } from '$lib/components/ui/badge'
	import { Card, CardContent, CardFooter } from '$lib/components/ui/card'

	export let event: NDKEvent | undefined
</script>

{#if event != undefined}
	<Card>
		<CardContent>
			<h3 class="text-lg font-semibold">
				{event ? NDKKind[Number(event.kind)] || `Kind ${event.kind}` : 'Unknown Event'}
			</h3>
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
