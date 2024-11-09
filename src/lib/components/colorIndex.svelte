<script lang="ts">
	import { spring } from 'svelte/motion'
	import { onMount } from 'svelte'
	import RenderProfile from './renderProfile.svelte'

	export let colors: { color: string; pubkey: string }[]
	export let onColorClick: (index: number) => void

	let hoveredIndex = spring(0)
	let containerHeight: number
	let showMagnifiedView = false
	let colorPickerElement: HTMLElement
	let magnifiedViewElement: HTMLElement

	const visibleRange = 15

	$: itemHeight = containerHeight / colors.length
	$: magnifiedItemHeight = containerHeight / (visibleRange * 2 + 1)

	$: magnifiedItems = colors.slice(
		Math.max(0, Math.round($hoveredIndex) - visibleRange),
		Math.min(colors.length, Math.round($hoveredIndex) + visibleRange + 1)
	)

	function handleMouseMove(event: MouseEvent) {
		const { clientY } = event
		const { top } = (event.currentTarget as HTMLElement).getBoundingClientRect()
		const newHoveredIndex = (clientY - top) / itemHeight
		hoveredIndex.set(newHoveredIndex)
		showMagnifiedView = true
	}

	function handleColorClick(index: number) {
		onColorClick(index)
		colorPickerElement.scrollTop = index * itemHeight - containerHeight / 2 + itemHeight / 2
	}

	function handleMagnifiedViewClick(index: number) {
		const targetIndex = Math.round($hoveredIndex) - visibleRange + index
		handleColorClick(targetIndex)
	}

	function handleKeyDown(event: KeyboardEvent, index: number) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			handleColorClick(index)
		}
	}

	onMount(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				!colorPickerElement?.contains(event.target as Node) &&
				!magnifiedViewElement?.contains(event.target as Node)
			) {
				showMagnifiedView = false
			}
		}
		document.addEventListener('click', handleOutsideClick)
		return () => document.removeEventListener('click', handleOutsideClick)
	})
</script>

<div class="flex color-picker">
	<div
		bind:this={colorPickerElement}
		bind:clientHeight={containerHeight}
		class="w-8 flex flex-col relative cursor-pointer overflow-auto"
		on:mousemove={handleMouseMove}
		on:mouseleave={() => {
			if (!magnifiedViewElement?.matches(':hover') && !showMagnifiedView) showMagnifiedView = false
		}}
		role="listbox"
		aria-label="Color index"
		tabindex="0"
	>
		{#each colors as { color }, index (index)}
			<button
				role="option"
				aria-selected={Math.round($hoveredIndex) === index}
				class="w-full border-0 p-0 m-0"
				style:background-color={color}
				style:height="{itemHeight}px"
				on:click={() => handleColorClick(index)}
				on:keydown={(event) => handleKeyDown(event, index)}
			/>
		{/each}
	</div>

	{#if showMagnifiedView}
		<ul
			bind:this={magnifiedViewElement}
			class="w-48 flex flex-col list-none p-0 m-0"
			role="listbox"
			aria-label="Magnified color index"
			on:mouseleave={() => (showMagnifiedView = false)}
		>
			{#each magnifiedItems as { color, pubkey }, index (pubkey)}
				<li class="w-full flex items-center" style:height="{magnifiedItemHeight}px">
					<button
						role="option"
						aria-selected={Math.round($hoveredIndex) - Math.round($hoveredIndex - visibleRange) ===
							index}
						class="w-full h-full flex items-center border-0 p-0 m-0 bg-transparent"
						on:click={() => handleMagnifiedViewClick(index)}
						on:keydown={(event) => handleKeyDown(event, index)}
					>
						<div class="w-12 h-full" style:background-color={color}></div>
						<div class="ml-2 text-sm truncate">
							<RenderProfile {pubkey} />
						</div>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
