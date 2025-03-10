<script lang="ts">
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import tinycolor from 'tinycolor2'
	import { derived, writable } from 'svelte/store'
	import ColorIndex from '$lib/components/colorIndex.svelte'
	import ContactCard from '$lib/components/contactCard.svelte'
	import { createActiveUserFollowsQuery } from '$lib/queries/activeUser.queries'

	let contactListElement: HTMLElement
	let currentColorIndex = writable(0)

	$: userColors = derived(createActiveUserFollowsQuery, ($query) => {
		if (!$query.data) return []

		return sortColorsByHue(
			[...$query.data].map((user) => ({
				color: `#${user.pubkey.slice(0, 6)}`,
				pubkey: user.pubkey,
				created_at: user.profile?.created_at!
			}))
		)
	})

	$: virtualizer = createVirtualizer({
		count: $userColors.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 90,
		overscan: 5
	})

	function sortColorsByHue(
		colors: { color: string; pubkey: string; created_at: number }[]
	): typeof colors {
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

{#if $createActiveUserFollowsQuery.data}
	Contacts length: {$createActiveUserFollowsQuery.data.size}
{/if}
<div class="grid grid-cols-[auto,1fr] gap-2 h-[calc(100vh-200px)]">
	<ColorIndex colors={$userColors} onColorClick={scrollToContact} />
	<div class="relative border rounded-md overflow-hidden">
		<div class="overflow-y-auto h-full" bind:this={contactListElement}>
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
