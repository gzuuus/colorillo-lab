<!-- src/lib/components/profileActivityView.svelte -->
<script lang="ts">
	import ContactCard from './contactCard.svelte'
	import { createUserFollowsByIdQuery } from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import { derived, writable } from 'svelte/store'
	import type { NDKUser, NDKEvent } from '@nostr-dev-kit/ndk'
	import LatestNote from './latestNote.svelte'

	export let pubkey: string
	let contactListElement: HTMLElement

	type UserActivity = {
		user: NDKUser
		latestNote: NDKEvent | null
		timestamp: number
	}

	const userActivities = writable<UserActivity[]>([])

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)

	// $: sortedUserActivities = derived([userFollowsQuery, userActivities], ([$query, $activities]) => {
	//     if (!$query.data) return [];

	//     const activityMap = new Map($activities.map(a => [a.user.pubkey, a]));

	//     return [...$query.data]
	//         .map(user => ({
	//             user,
	//             ...(activityMap.get(user.pubkey) || { latestNote: null, timestamp: 0 })
	//         }))
	//         .sort((a, b) => b.timestamp - a.timestamp);
	// });

	$: virtualizer = createVirtualizer({
		count: $userFollowsQuery.data?.size || 0,
		getScrollElement: () => contactListElement,
		estimateSize: () => 120,
		overscan: 5
	})

	function handleNoteLoaded(
		event: CustomEvent<{ pubkey: string; event: NDKEvent | null; timestamp: number }>
	) {
		console.log(event.detail)
		// userActivities.update(activities => {
		//     const index = activities.findIndex(a => a.user.pubkey === event.detail.pubkey);
		//     const newActivity = {
		//         user: activities[index]?.user || { pubkey: event.detail.pubkey },
		//         latestNote: event.detail.event,
		//         timestamp: event.detail.timestamp
		//     };

		//     if (index !== -1) {
		//         activities[index] = newActivity;
		//     } else {
		//         activities.push(newActivity);
		//     }
		//     return activities;
		// });
	}

	function getContactColor(pubkey: string): string {
		return `#${pubkey.slice(0, 6)}`
	}
</script>

<div class="border rounded-md overflow-hidden h-[calc(100vh-250px)]">
	<div class="overflow-y-auto h-full" bind:this={contactListElement}>
		<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
			{#if $userFollowsQuery.data}
				<!-- {#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
                {#if $userFollowsQuery.data[virtualRow.index]}
                    {@const activity = $sortedUserActivities[virtualRow.index]} -->
				{#each $userFollowsQuery.data as user, index (user.pubkey)}
					<div class="w-full">
						<div class="p-2 border-b">
							<ContactCard color={getContactColor(user.pubkey)} pubkey={user.pubkey} />
							<LatestNote pubkey={user.pubkey} on:noteLoaded={handleNoteLoaded} />
						</div>
					</div>
				{/each}

				<!-- {/if}
            {/each} -->
			{/if}
		</div>
	</div>
</div>
