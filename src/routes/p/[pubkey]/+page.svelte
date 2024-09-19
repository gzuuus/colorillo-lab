<!-- src/routes/p/[pubkey]/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores'
	import ColorIndex from '$lib/components/colorIndex.svelte'
	import ContactCard from '$lib/components/contactCard.svelte'
	import {
		createUserFollowsByIdQuery,
		createProfileQuery,
		getProfileName
	} from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import tinycolor from 'tinycolor2'
	import { derived, writable } from 'svelte/store'

	const pubkey = $page.params.pubkey
	let contactListElement: HTMLElement
	let currentColorIndex = writable(0)

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)
	$: profileQuery = createProfileQuery(pubkey)

	$: userColors = derived(userFollowsQuery, ($query) => {
		if (!$query.data) return []

		return sortColorsByHue(
			[...$query.data].map((user) => ({
				color: `#${user.pubkey.slice(0, 6)}`,
				pubkey: user.pubkey
			}))
		)
	})

	$: virtualizer = createVirtualizer({
		count: $userColors.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 80,
		overscan: 5
	})

	function sortColorsByHue(colors: { color: string; pubkey: string }[]): typeof colors {
		return colors.sort((a, b) => {
			const [{ h: hueA, v: brightnessA }, { h: hueB, v: brightnessB }] = [a.color, b.color].map(
				(c) => tinycolor(c).toHsv()
			)
			return hueA !== hueB ? hueA - hueB : brightnessA - brightnessB
		})
	}

	function scrollToContact(index: number) {
		$virtualizer.scrollToIndex(index)
		$currentColorIndex = index
	}
</script>

{#if $profileQuery.isLoading}
	<p>Loading profile...</p>
{:else if $profileQuery.isError}
	<p>Error loading profile</p>
{:else}
	<h1 class="text-3xl font-bold mb-6">{getProfileName($profileQuery.data)}'s Contacts</h1>

	{#if $userColors.length > 0}
		<div class="grid grid-cols-[auto,1fr] gap-2 h-[calc(100vh-100px)]">
			<ColorIndex colors={$userColors} onColorClick={scrollToContact} />
			<div class="relative border rounded-md overflow-hidden">
				<div class="overflow-y-auto h-[calc(100%-2rem)]" bind:this={contactListElement}>
					<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
						{#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
							<div
								class="absolute top-0 left-0 w-full"
								style="height: {virtualRow.size}px; transform: translateY({virtualRow.start}px);"
							>
								<ContactCard
									color={$userColors[virtualRow.index].color}
									pubkey={$userColors[virtualRow.index].pubkey}
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p class="text-muted-foreground">
			No contacts available. Add some friends to see their colorful profiles!
		</p>
	{/if}
{/if}
