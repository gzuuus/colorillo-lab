<script lang="ts">
	import type { NDKUserProfile } from '@nostr-dev-kit/ndk'
	import { onMount } from 'svelte'
	import { createUserProfileByIdQuery } from '$lib/queries/follows.query'
	import { resolveQuery } from '$lib/utils/queries.utils'

	export let colors: { color: string; pubkey: string }[]
	export let onColorClick: (index: number) => void

	let hoveredIndex = -1
	let containerHeight: number
	let showMagnifiedView = false
	let colorPickerElement: HTMLElement

	const visibleRange = 15

	$: itemHeight = containerHeight / colors.length
	$: magnifiedItemHeight = containerHeight / (visibleRange * 2 + 1)

	$: magnifiedItems = colors
		.slice(
			Math.max(0, hoveredIndex - visibleRange),
			Math.min(colors.length, hoveredIndex + visibleRange + 1)
		)
		.map(({ color, pubkey }) => ({
			color,
			pubkey,
			profileQuery: createUserProfileByIdQuery(pubkey)
		}))

	function handleMouseMove(event: MouseEvent) {
		const { clientY } = event
		const { top } = (event.currentTarget as HTMLElement).getBoundingClientRect()
		hoveredIndex = Math.floor((clientY - top) / itemHeight)
		showMagnifiedView = true
	}

	function handleMagnifiedViewClick(index: number) {
		onColorClick(hoveredIndex - visibleRange + index)
		showMagnifiedView = false
	}

	function getName(profile: NDKUserProfile | null): string {
		return profile?.name || profile?.displayName || profile?.nip05 || 'Unnamed user'
	}

	onMount(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (colorPickerElement && !colorPickerElement.contains(event.target as Node)) {
				showMagnifiedView = false
			}
		}
		document.addEventListener('click', handleOutsideClick)
		return () => document.removeEventListener('click', handleOutsideClick)
	})
</script>

<div class="flex color-picker" bind:this={colorPickerElement}>
	<ul
		bind:clientHeight={containerHeight}
		class="w-8 flex flex-col relative cursor-pointer list-none p-0 m-0"
		on:mousemove={handleMouseMove}
		role="listbox"
		aria-label="Color index"
	>
		{#each colors as { color }, index}
			<li
				role="option"
				aria-selected={hoveredIndex === index}
				tabindex="0"
				class="w-full"
				style:background-color={color}
				style:height="{itemHeight}px"
				on:click={() => onColorClick(index)}
				on:keydown={(e) => e.key === 'Enter' && onColorClick(index)}
			/>
		{/each}
	</ul>

	{#if showMagnifiedView}
		<ul
			class="w-48 flex flex-col list-none p-0 m-0"
			on:mousemove={() => (showMagnifiedView = true)}
			on:mouseleave={() => (showMagnifiedView = false)}
			role="listbox"
			aria-label="Magnified color index"
		>
			{#each magnifiedItems as { color, profileQuery }, index}
				<li
					role="option"
					aria-selected={hoveredIndex === index}
					tabindex="0"
					class="w-full flex items-center"
					style:height="{magnifiedItemHeight}px"
					on:click={() => handleMagnifiedViewClick(index)}
					on:keydown={(e) => e.key === 'Enter' && handleMagnifiedViewClick(index)}
				>
					<div class="w-12 h-full" style:background-color={color}></div>
					<div class="ml-2 text-sm truncate">
						{#await resolveQuery(() => profileQuery, 3, 500)}
							Loading...
						{:then profile}
							{getName(profile)}
						{:catch error}
							Error: {error.message}
						{/await}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
