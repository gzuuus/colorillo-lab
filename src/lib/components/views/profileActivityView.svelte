<script lang="ts">
	import { createActiveUserFollowsQuery } from '$lib/queries/follows.query'
	import ndkStore from '$lib/stores/ndk'
	import ContactCard from '$lib/components/contactCard.svelte'
	import { Button } from '$lib/components/ui/button'
	import { Badge } from '$lib/components/ui/badge'
	import { NDKKind } from '@nostr-dev-kit/ndk'
	import * as Popover from '$lib/components/ui/popover'
	import * as Command from '$lib/components/ui/command'
	import EventVisualizer from '$lib/components/eventVisualizer.svelte'
	import { onDestroy } from 'svelte'
	import { eventLoader } from '$lib/services/event-loader'
	import EventLoaderProgress from '../eventLoaderProgress.svelte'

	$: progress = eventLoader.getProgress()
	$: targetKinds = eventLoader.getTargetKinds()
	$: pendingPubkeys = eventLoader.getPendingPubkeys()
	$: eventsQuery = $ndkStore && eventLoader.createEventsQuery()
	$: autoFetchEnabled = $progress.isAutoFetching

	$: if ($createActiveUserFollowsQuery.data) {
		const pubkeys = [...$createActiveUserFollowsQuery.data].map((follow) => follow.pubkey)
		const initialKinds = [0, 1, 3, 7]
		eventLoader.initialize(pubkeys, initialKinds)
	}

	const kindOptions = Object.entries(NDKKind)
		.filter(([_, value]) => typeof value === 'number')
		.sort((a, b) => Number(a[1]) - Number(b[1]))
		.map(([key, value]) => ({
			label: key,
			value: value as number
		}))

	async function fetchNextBatch() {
		if ($ndkStore && !$progress.isFetching && $pendingPubkeys.length > 0) {
			await eventLoader.fetchNextBatch($ndkStore)
		}
	}

	function toggleAutoFetch() {
		if ($ndkStore) {
			if ($progress.isAutoFetching) {
				eventLoader.stopAutoFetch()
			} else {
				eventLoader.startAutoFetch($ndkStore)
			}
		}
	}

	function addKind(kind: number) {
		if (!$progress.isFetching && !$targetKinds.includes(kind)) {
			const newKinds = [...$targetKinds, kind].sort((a, b) => a - b)
			eventLoader.updateTargetKinds(newKinds)
		}
	}

	function removeKind(kind: number) {
		if (!$progress.isFetching && $targetKinds.length > 1) {
			const newKinds = $targetKinds.filter((k) => k !== kind)
			eventLoader.updateTargetKinds(newKinds)
		}
	}

	onDestroy(() => {
		eventLoader.reset()
	})
</script>

<div class="space-y-6">
	<!-- Event Type Selection -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<h3 class="text-lg font-semibold">Event Types</h3>
			<Popover.Root let:ids>
				<Popover.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						size="sm"
						class="w-[150px]"
						disabled={$progress.isFetching}
					>
						Add Event Type
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-[250px] p-0">
					<Command.Root>
						<Command.Input placeholder="Search event types..." />
						<Command.Empty>No event type found.</Command.Empty>
						<Command.Group>
							{#each kindOptions as option}
								<Command.Item
									value={`${option.value} ${option.label}`}
									onSelect={() => addKind(option.value)}
									disabled={$progress.isFetching || $targetKinds.includes(option.value)}
								>
									<div class="flex items-center justify-between w-full">
										<span class="font-semibold">{option.value}</span>
										<span class="text-sm text-muted-foreground">{option.label}</span>
									</div>
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>

		<!-- Active Event Types with Stats -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each $targetKinds as kind}
				<div class="p-4 rounded-lg border bg-card">
					<div class="flex items-center justify-between mb-4">
						<Badge variant="secondary" class="truncate max-w-[80%]">
							{NDKKind[kind] || `Kind ${kind}`}
						</Badge>
						<button
							class="text-muted-foreground hover:text-foreground transition-colors"
							on:click={() => removeKind(kind)}
							disabled={$targetKinds.length <= 1}
							aria-label={`Remove ${NDKKind[kind] || `Kind ${kind}`}`}
						>
							×
						</button>
					</div>

					<EventLoaderProgress stats={$progress.stats} {kind} total={$progress.total} />
				</div>
			{/each}
		</div>
	</div>

	<!-- Loading Controls -->
	<div class="flex items-center gap-4">
		<Button
			on:click={fetchNextBatch}
			disabled={$progress.isFetching || $pendingPubkeys.length === 0 || $progress.isAutoFetching}
			variant={$progress.isFetching ? 'outline' : 'default'}
		>
			{#if $progress.isFetching}
				<span class="inline-block animate-spin mr-2">⟳</span>
			{/if}
			{$progress.isFetching ? 'Fetching...' : 'Fetch Next Batch'}
		</Button>

		<Button
			variant={autoFetchEnabled ? 'destructive' : 'secondary'}
			on:click={toggleAutoFetch}
			disabled={$pendingPubkeys.length === 0}
		>
			{#if autoFetchEnabled}
				<span class="inline-block animate-spin mr-2">⟳</span>
			{/if}
			{autoFetchEnabled ? 'Stop Auto Fetch' : 'Start Auto Fetch'}
		</Button>
	</div>

	<!-- Progress Stats -->
	{#if $progress.total > 0}
		<div class="p-4 bg-muted rounded-md">
			<div class="grid gap-2">
				<div class="flex justify-between text-sm text-muted-foreground">
					<div>
						<p>Pending: {$pendingPubkeys.length} contacts</p>
					</div>
				</div>
				{#if $progress.isFetching}
					<p class="text-sm text-muted-foreground animate-pulse">Loading events...</p>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Events Grid -->
	{#if $eventsQuery?.data && $createActiveUserFollowsQuery.data}
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each $createActiveUserFollowsQuery.data as { pubkey } (pubkey)}
				{#if $eventsQuery.data.get(pubkey)}
					<div class="space-y-2">
						<ContactCard color={`#${pubkey.slice(0, 6)}`} {pubkey} />
						<EventVisualizer event={$eventsQuery.data.get(pubkey)} />
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>
