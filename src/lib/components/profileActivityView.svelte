<script lang="ts">
	import {
		createUserFollowsByIdQuery,
		createProfileQuery,
		getProfileName
	} from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import { writable } from 'svelte/store'
	import { Button } from '$lib/components/ui/button'
	import { useQueryClient } from '@tanstack/svelte-query'
	import ndkStore from '$lib/components/stores/ndk'
	import { get } from 'svelte/store'
	import type { NDKEvent, NDKFilter, NDKSubscriptionOptions } from '@nostr-dev-kit/ndk'
	import { formatDistanceToNow } from 'date-fns'
	import ContactCard from './contactCard.svelte'
	// TODO keep working on this
	export let pubkey: string
	let contactListElement: HTMLElement

	const queryClient = useQueryClient()
	const sortOrder = writable<'asc' | 'desc'>('desc')
	const sortBy = writable<'lastActivity' | 'name'>('lastActivity')

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)

	async function fetchLatestEvent(pubkey: string): Promise<NDKEvent | null> {
		const $ndkStore = get(ndkStore)
		if (!$ndkStore.activeUser) return null

		const filter: NDKFilter = { kinds: [1], authors: [pubkey], limit: 1 }
		const opts: NDKSubscriptionOptions = { closeOnEose: true }

		try {
			const event = await $ndkStore.fetchEvent(filter, opts)
			return event
		} catch (error) {
			console.error(`Error fetching event for ${pubkey}:`, error)
			return null
		}
	}

	$: sortedContacts = ($userFollowsQuery.data && [...$userFollowsQuery.data]) || []

	$: virtualizer = createVirtualizer({
		count: sortedContacts.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 150,
		overscan: 5
	})

	function toggleSortOrder() {
		sortOrder.update((order) => (order === 'asc' ? 'desc' : 'asc'))
	}

	function toggleSortBy() {
		sortBy.update((by) => (by === 'lastActivity' ? 'name' : 'lastActivity'))
	}
</script>

<div class="mb-4 flex space-x-2">
	<Button on:click={toggleSortBy} variant="outline">
		Sort by: {$sortBy === 'lastActivity' ? 'Last Activity' : 'Name'}
	</Button>
	<Button on:click={toggleSortOrder} variant="outline">
		Order: {$sortOrder === 'asc' ? 'Ascending' : 'Descending'}
	</Button>
</div>

<div class="border rounded-md overflow-hidden h-[calc(100vh-250px)]">
	<div class="overflow-y-auto h-full" bind:this={contactListElement}>
		<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
			{#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
				{#if sortedContacts[virtualRow.index]}
					<div
						class="absolute top-0 left-0 w-full"
						style="height: {virtualRow.size}px; transform: translateY({virtualRow.start}px);"
					>
						{#await Promise.all( [createProfileQuery(sortedContacts[virtualRow.index].pubkey), fetchLatestEvent(sortedContacts[virtualRow.index].pubkey)] ) then [profileQuery, latestEvent]}
							<div class="p-4 border-b">
								<ContactCard
									pubkey={sortedContacts[virtualRow.index].pubkey}
									color={`#${sortedContacts[virtualRow.index].pubkey.slice(0, 6)}`}
								/>
								<p class="text-sm text-muted-foreground">
									{sortedContacts[virtualRow.index].pubkey.slice(0, 8)}...
								</p>
								{#if latestEvent}
									<p class="text-sm mt-2">
										Last activity: {formatDistanceToNow(new Date(latestEvent.created_at * 1000))} ago
									</p>
									<p class="text-sm mt-1 truncate">{latestEvent.content}</p>
									<p class="text-xs text-muted-foreground">Event ID: {latestEvent.id}</p>
								{:else}
									<p class="text-sm mt-2">No recent activity</p>
								{/if}
							</div>
						{/await}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
