<script lang="ts">
	import ndkStore from '$lib'
	import ColorIndex from '$lib/components/colorIndex.svelte'
	import ContactCard from '$lib/components/contactCard.svelte'
	import { createUserFollowsByIdQuery } from '$lib/queries/follows.query'
	import { NDKUser } from '@nostr-dev-kit/ndk'
	import tinycolor from 'tinycolor2'
	import { derived, writable } from 'svelte/store'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import { spring } from 'svelte/motion'

	let contactListElement: HTMLElement
	let currentColorIndex = writable(0)

	$: userFollowsQuery = createUserFollowsByIdQuery($ndkStore.activeUser?.pubkey ?? '')

	$: userColors = derived(userFollowsQuery, ($query) => {
		if (!$query.data) return []

		return sortColorsByHue(
			[...$query.data].map((user: NDKUser) => ({
				color: `#${user.pubkey.slice(0, 6)}`,
				pubkey: user.pubkey
			}))
		)
	})

	$: virtualizer = createVirtualizer({
		count: $userColors.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 80, // Adjust this value based on your ContactCard height
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
	}

	function updateCurrentColorIndex() {
		if (!contactListElement) return

		const scrollTop = contactListElement.scrollTop
		const virtualItems = $virtualizer.getVirtualItems()
		const newIndex = virtualItems.findIndex((item) => item.start > scrollTop)
	}
	const query = createUserFollowsByIdQuery(``)
	$: console.log(
		$query.isFetched,
		$query.isError,
		$query.fetchStatus,
		$query.isSuccess,
		$query.status,
		$query.failureCount
	)
</script>

<h1 class="text-3xl font-bold mb-6">Your Contacts</h1>

{#if $userColors.length > 0}
	<div class="grid grid-cols-[auto,1fr] gap-2 h-[calc(100vh-100px)]">
		<ColorIndex colors={$userColors} onColorClick={scrollToContact} />
		<div class="relative border rounded-md overflow-hidden">
			<div
				class="sticky top-0 z-10 h-8 w-full transition-colors duration-300"
				style:background-color={$userColors[$currentColorIndex]?.color}
			>
				<div class="absolute inset-0 bg-background opacity-80"></div>
				<div class="relative z-20 h-full flex items-center px-4 font-semibold text-foreground">
					{$userColors[$currentColorIndex]?.color}
				</div>
			</div>
			<div
				class="overflow-y-auto h-[calc(100%-2rem)]"
				bind:this={contactListElement}
				on:scroll={updateCurrentColorIndex}
			>
				<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
					{#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
						<div
							class="contact-card absolute top-0 left-0 w-full"
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
