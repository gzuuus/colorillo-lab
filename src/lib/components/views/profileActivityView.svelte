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
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import { derived, writable } from 'svelte/store'
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type SortingState,
		type Updater
	} from '@tanstack/svelte-table'
	import { Progress } from '../ui/progress'

	let containerElement: HTMLElement

	$: progress = eventLoader.getProgress()
	$: targetKinds = eventLoader.getTargetKinds()
	$: pendingPubkeys = eventLoader.getPendingPubkeys()
	$: eventsQuery = $ndkStore && eventLoader.createEventsQuery()
	$: autoFetchEnabled = $progress.isAutoFetching

	// Sorting state
	let sorting: SortingState = []

	function setSorting(updater: Updater<SortingState>) {
		if (updater instanceof Function) sorting = updater(sorting)
		else sorting = updater

		tableOptions.update((opts) => ({
			...opts,
			state: {
				...opts.state,
				sorting
			}
		}))
	}

	// Table configuration
	type ContactWithEvent = {
		contact: any
		event: any
		color: string
	}

	const columns: ColumnDef<ContactWithEvent>[] = [
		{
			accessorFn: (row) => row.event.created_at,
			id: 'created_at',
			header: 'Created At'
		},
		{
			accessorKey: 'contact.pubkey',
			id: 'pubkey',
			header: 'Public Key'
		}
	]

	// Derive sorted contacts with their events
	$: contactsWithEvents = derived(
		[createActiveUserFollowsQuery, eventsQuery],
		([$follows, $events]) => {
			if (!$follows?.data || !$events?.data) return []

			return [...$follows.data]
				.filter((follow) => $events.data.has(follow.pubkey))
				.map((follow) => ({
					contact: follow,
					event: $events.data.get(follow.pubkey)!,
					color: `#${follow.pubkey.slice(0, 6)}`
				}))
		}
	)

	$: tableOptions = writable({
		data: $contactsWithEvents,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	})

	$: table = createSvelteTable(tableOptions)
	$: rows = $table.getRowModel().rows

	// Create virtualizer with sorted rows
	$: virtualizer = createVirtualizer({
		count: rows.length,
		getScrollElement: () => containerElement,
		estimateSize: () => 250,
		overscan: 5
	})

	$: sortOrder = sorting[0]?.desc ? 'desc' : 'asc'
	$: sortBy = sorting[0]?.id || 'created_at'

	function toggleSortOrder() {
		setSorting((old) =>
			old[0]?.desc ? [{ id: sortBy, desc: false }] : [{ id: sortBy, desc: true }]
		)
	}

	function toggleSortBy() {
		const newSortBy = sortBy === 'created_at' ? 'pubkey' : 'created_at'
		setSorting([{ id: newSortBy, desc: sortOrder === 'desc' }])
	}

	// Rest of the existing functionality...
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

	$: coveragePercentage =
		($pendingPubkeys?.length || $pendingPubkeys.length == 0) && $createActiveUserFollowsQuery?.data
			? Math.floor(
					(($createActiveUserFollowsQuery.data.size - $pendingPubkeys.length) /
						$createActiveUserFollowsQuery.data.size) *
						100
				)
			: 0

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
			variant={autoFetchEnabled ? 'destructive' : 'secondary'}
			on:click={toggleAutoFetch}
			disabled={$pendingPubkeys.length === 0}
		>
			{#if autoFetchEnabled}
				<span class="inline-block animate-spin mr-2">⟳</span>
			{/if}
			{autoFetchEnabled ? 'Stop Auto Fetch' : 'Start Auto Fetch'}
		</Button>
		<Button variant="ghost" disabled={$progress.isFetching} on:click={() => eventLoader.reset()}>
			reset
		</Button>
	</div>

	<!-- Progress Stats -->
	{#if $progress.total > 0}
		<div class="pt-4 bg-muted rounded-md">
			<div class="grid gap-2 px-4 pb-3">
				<div class="flex justify-between text-sm text-muted-foreground">
					<div>
						{#if $pendingPubkeys.length}
							<p>Pending: {$pendingPubkeys.length} contacts</p>
						{:else}
							<p>Contacts: {$createActiveUserFollowsQuery.data?.size}</p>
						{/if}
					</div>
					{#if coveragePercentage}
						{coveragePercentage}%
					{/if}
				</div>
			</div>
			<div class=" flex gap-2 items-center">
				<Progress value={coveragePercentage} max={100} class="w-full h-1" />
			</div>
		</div>
	{/if}

	<!-- Sorting Controls -->
	<div class="flex space-x-2">
		<Button on:click={toggleSortBy} variant="outline">
			Sort by: {sortBy === 'created_at' ? 'Creation Date' : 'Public Key'}
		</Button>
		<Button on:click={toggleSortOrder} variant="outline">
			Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
		</Button>
	</div>

	<!-- Virtualized Events Grid -->
	{#if $contactsWithEvents.length > 0}
		<div class="relative border rounded-md" style="height: calc(100vh - 400px);">
			<div class="overflow-y-auto h-full" bind:this={containerElement}>
				<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
					{#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
						<div
							class="absolute top-0 left-0 w-full"
							style="height: {virtualRow.size}px; transform: translateY({virtualRow.start}px);"
						>
							<div class="p-2">
								<div class="space-y-2">
									<ContactCard
										color={rows[virtualRow.index].original.color}
										pubkey={rows[virtualRow.index].original.contact.pubkey}
									/>
									<EventVisualizer event={rows[virtualRow.index].original.event} />
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
