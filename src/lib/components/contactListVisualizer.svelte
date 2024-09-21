<!-- src/lib/components/contactListVisualizer.svelte -->
<script lang="ts">
	import { writable } from 'svelte/store'
	import { Button } from '$lib/components/ui/button'
	import ColorIndexView from './colorIndexView.svelte'
	import DateSortedView from './dateSortedView.svelte'
	import ProfileActivity from './profileActivity.svelte'

	export let pubkey: string

	enum VisualizationType {
		ColorIndex = 'Color Index',
		DateSorted = 'Date Sorted',
		ProfileActivity = 'Profile Activity'
	}

	const currentVisualization = writable<VisualizationType>(VisualizationType.ColorIndex)

	const visualizations = [
		{ type: VisualizationType.ColorIndex, component: ColorIndexView },
		{ type: VisualizationType.DateSorted, component: DateSortedView },
		{ type: VisualizationType.ProfileActivity, component: ProfileActivity }
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
			<svelte:component this={viz.component} {pubkey} />
		{/if}
	{/each}
</div>
