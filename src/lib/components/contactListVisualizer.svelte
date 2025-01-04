<script lang="ts">
	import { writable } from 'svelte/store'
	import { Button } from '$lib/components/ui/button'
	import DateSortedView from './views/dateSortedView.svelte'
	import ColorIndexView from './views/colorIndexView.svelte'
	import ProfileActivityView from './views/profileActivityView.svelte'
	import type { ObjectValues } from '$lib/utils'

	const VISUALIZATION_TYPES = {
		ColorIndex: 'Color Index',
		DateSorted: 'Date Sorted',
		ProfileActivity: 'Profile Activity'
	} as const

	type VisualizationType = ObjectValues<typeof VISUALIZATION_TYPES>

	const currentVisualization = writable<VisualizationType>(VISUALIZATION_TYPES.ColorIndex)

	const visualizations = [
		{ type: VISUALIZATION_TYPES.ColorIndex, component: ColorIndexView },
		{ type: VISUALIZATION_TYPES.DateSorted, component: DateSortedView },
		{ type: VISUALIZATION_TYPES.ProfileActivity, component: ProfileActivityView }
	]

	function switchVisualization(type: VisualizationType) {
		currentVisualization.set(type)
	}
</script>

<div class="mb-4">
	{#each visualizations as viz}
		<Button
			variant={$currentVisualization === viz.type ? 'default' : 'outline'}
			on:click={() => switchVisualization(viz.type)}
			class="mr-2"
		>
			{viz.type}
		</Button>
	{/each}
</div>

<div>
	{#each visualizations as viz}
		{#if $currentVisualization === viz.type}
			<svelte:component this={viz.component} />
		{/if}
	{/each}
</div>
