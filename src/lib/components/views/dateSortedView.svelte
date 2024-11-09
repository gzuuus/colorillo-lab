<script lang="ts">
	import ContactCard from '../contactCard.svelte'
	import {
		createActiveUserFollowsQuery,
		createUserFollowsByIdQuery,
		getTypedProfileQueryData
	} from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import { writable } from 'svelte/store'
	import { Button } from '$lib/components/ui/button'
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type SortingState,
		type Updater
	} from '@tanstack/svelte-table'
	import type { NDKUser } from '@nostr-dev-kit/ndk'
	import { queryClient } from '$lib/queries/client'

	// TODO: if you aready have the profiles of your contacts cached, this view will display outdated data, we have to manually or automatically refresh the profiles

	let contactListElement: HTMLElement

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

	const columns: ColumnDef<NDKUser>[] = [
		{
			accessorKey: 'pubkey',
			header: 'Public Key'
		},
		{
			accessorFn: (row) => {
				const profile = getTypedProfileQueryData(queryClient, row.pubkey)
				return profile?.created_at || 0
			},
			id: 'created_at',
			header: 'Created At'
		}
	]

	$: tableOptions = writable({
		data: Array.from($createActiveUserFollowsQuery.data || []),
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

	$: virtualizer = createVirtualizer({
		count: rows.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 100,
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
</script>

<div class="mb-4 flex space-x-2">
	<Button on:click={toggleSortBy} variant="outline">
		Sort by: {sortBy === 'created_at' ? 'Creation Date' : 'Public Key'}
	</Button>
	<Button on:click={toggleSortOrder} variant="outline">
		Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
	</Button>
</div>

<div class="border rounded-md overflow-hidden h-[calc(100vh-250px)]">
	<div class="overflow-y-auto h-full" bind:this={contactListElement}>
		<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
			{#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
				{#if rows[virtualRow.index]}
					<div
						class="absolute top-0 left-0 w-full"
						style="height: {virtualRow.size}px; transform: translateY({virtualRow.start}px);"
					>
						<ContactCard
							color={`#${rows[virtualRow.index].original.pubkey.slice(0, 6)}`}
							pubkey={rows[virtualRow.index].original.pubkey}
						/>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
