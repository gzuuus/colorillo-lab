<script lang="ts">
	import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk'
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card'
	import JSONTree from 'svelte-json-tree'
	import { Badge } from '$lib/components/ui/badge'
	import { ScrollArea } from '$lib/components/ui/scroll-area'
	import { Label } from '$lib/components/ui/label'
	import { Button } from '$lib/components/ui/button'
	import { Copy } from 'lucide-svelte'
	import { copyToClipboard } from '$lib/utils/utils'
	import { formatDate } from '$lib/utils/date.utils'
	import * as Tabs from '$lib/components/ui/tabs'
	import { npubEncode } from 'nostr-tools/nip19'
	export let event: NDKEvent
</script>

<Card class="border-0">
	<CardHeader class="p-0 py-2">
		<CardTitle>Event Details</CardTitle>
	</CardHeader>
	<CardContent class="space-y-6 p-0">
		<div class="space-y-2">
			<Label class="text-sm font-medium text-muted-foreground">Event ID</Label>
			<div class="flex items-center gap-2">
				<code class="bg-muted px-2 py-1 rounded text-sm font-mono break-all">
					{event?.id}
				</code>
				<Button
					variant="ghost"
					size="icon"
					class="h-6 w-6 flex-shrink-0"
					on:click={() => copyToClipboard(event?.id)}
				>
					<Copy class="h-3 w-3" />
				</Button>
			</div>
		</div>

		<!-- Public Key Section -->
		<div class="space-y-2">
			<Tabs.Root value="npub" class="w-full">
				<Label class="text-sm font-medium text-muted-foreground">Public Key</Label>
				<Tabs.List class="h-8">
					<Tabs.Trigger value="npub" class="h-6">Npub</Tabs.Trigger>
					<Tabs.Trigger value="hex" class="h-6">Hex</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="hex" class="w-full">
					<div class="flex items-center gap-2 w-full">
						<code class="bg-muted px-2 py-1 rounded text-sm font-mono break-all flex-1">
							{event?.pubkey}
						</code>
						<Button
							variant="ghost"
							size="icon"
							class="h-6 w-6 flex-shrink-0"
							on:click={() => copyToClipboard(event?.pubkey)}
						>
							<Copy class="h-3 w-3" />
						</Button>
					</div>
				</Tabs.Content>
				<Tabs.Content value="npub" class="w-full">
					<div class="flex items-center gap-2 w-full">
						<code class="bg-muted px-2 py-1 rounded text-sm font-mono break-all flex-1">
							{npubEncode(event?.pubkey)}
						</code>
						<Button
							variant="ghost"
							size="icon"
							class="h-6 w-6 flex-shrink-0"
							on:click={() => copyToClipboard(npubEncode(event?.pubkey))}
						>
							<Copy class="h-3 w-3" />
						</Button>
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</div>

		<!-- Relay Section -->
		{#if event?.relay?.url}
			<div class="space-y-2">
				<Label class="text-sm font-medium text-muted-foreground">Relay Source</Label>
				<div class="flex items-center gap-2">
					<code class="bg-muted px-2 py-1 rounded text-sm font-mono break-all flex-1">
						{event?.relay?.url}
					</code>
					<Button
						variant="ghost"
						size="icon"
						class="h-6 w-6 flex-shrink-0"
						on:click={() => copyToClipboard(event?.relay?.url)}
					>
						<Copy class="h-3 w-3" />
					</Button>
				</div>
			</div>
		{/if}

		<div class="space-y-2">
			<Label class="text-sm font-medium text-muted-foreground">Created At</Label>
			<div class="flex items-center gap-2">
				<span class="text-sm">
					{event?.created_at ? formatDate(event.created_at) : 'N/A'}
				</span>
				<Badge variant="outline">
					{event?.created_at ?? 'N/A'}
				</Badge>
			</div>
		</div>

		<div class="space-y-2">
			<Label class="text-sm font-medium text-muted-foreground">Event Kind</Label>
			<div class="flex items-center gap-2">
				<Badge variant="secondary">
					{event?.kind}
				</Badge>
				{#if event?.kind !== undefined}
					<span class="text-sm text-muted-foreground">
						({NDKKind[Number(event.kind)]})
					</span>
				{/if}
			</div>
		</div>

		<div class="space-y-2">
			<Label class="text-sm font-medium text-muted-foreground">Raw Event Data</Label>
			<ScrollArea class="h-auto w-full rounded-md border">
				<div class="p-4">
					{#await event?.toNostrEvent()}
						<div class="flex items-center justify-center h-full">
							<span class="text-sm text-muted-foreground">Loading...</span>
						</div>
					{:then value}
						<JSONTree {value} />
					{:catch error}
						<div class="text-destructive text-sm">
							Failed to load event data: {error.message}
						</div>
					{/await}
				</div>
			</ScrollArea>
		</div>
	</CardContent>
</Card>
