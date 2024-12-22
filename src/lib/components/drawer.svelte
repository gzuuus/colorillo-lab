<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js'
	import { onMount } from 'svelte'
	import { Button } from './ui/button'
	import { ScrollArea } from './ui/scroll-area'
	import { closeDrawer, drawerUI } from '$lib/stores/drawer'
	import { pushState, replaceState } from '$app/navigation'

	$: isOpen = !!$drawerUI.drawerType
	let historyState: string | null = null
	$: if (isOpen !== !!historyState) {
		historyState = isOpen ? 'drawer' : null
		const method = isOpen ? pushState : replaceState
		method('', { historyState })
	}
	onMount(() => {
		const handlePopState = (event: PopStateEvent) => {
			if (isOpen) {
				event.preventDefault()
				closeDrawer()
			}
		}

		window.addEventListener('popstate', handlePopState)

		return () => {
			window.removeEventListener('popstate', handlePopState)
		}
	})
</script>

<Sheet.Root bind:open={isOpen} onOutsideClick={closeDrawer}>
	<Sheet.Content
		side="right"
		class="w-[100vw] sm:min-w-[85vw] md:min-w-[55vw] xl:min-w-[35vw] flex flex-col border-l-black border-2 p-2"
	>
		<ScrollArea class="h-auto">
			<Sheet.Title class="flex flex-row-reverse justify-end items-center content-center ">
				<Button size="icon" variant="outline" class="border-none" on:click={closeDrawer}>
					<span class="cursor-pointer i-tdesign-close w-6 h-6" />
				</Button>
				<div class=" w-full">
					{#if $drawerUI.drawerType === 'event'}
						Your event
					{/if}
				</div>
			</Sheet.Title>
			{#if $drawerUI.drawerType === 'event'}
				{$drawerUI.event?.id}
				{$drawerUI.event?.pubkey}
				{$drawerUI.event?.created_at}
			{/if}
		</ScrollArea>
	</Sheet.Content>
</Sheet.Root>
