<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js'
	import { onMount } from 'svelte'
	import { Button } from './ui/button'
	import { ScrollArea } from './ui/scroll-area'
	import { closeDrawer, drawerUI } from '$lib/stores/drawer'
	import { pushState, replaceState } from '$app/navigation'
	import RenderEvent from './nostr-events/renderEvent.svelte'
	import { SidebarClose } from 'lucide-svelte'
	import EventTools from './nostr-events/tools/EventTools.svelte'

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
		return () => window.removeEventListener('popstate', handlePopState)
	})
</script>

<Sheet.Root bind:open={isOpen} onOutsideClick={closeDrawer}>
	<Sheet.Content
		side="right"
		class="w-[100vw] sm:min-w-[85vw] md:min-w-[55vw] xl:min-w-[35vw] flex flex-col border-l-black border p-2"
	>
		<div class="flex flex-col h-full">
			<Sheet.Title class="flex justify-between items-center p-2 border-b">
				<div>
					{#if $drawerUI.drawerType === 'event'}
						Your event
					{:else if $drawerUI.drawerType === 'event-tools'}
						Event Tools
					{/if}
				</div>
				<Sheet.Close>
					<Button variant="ghost" size="icon" on:click={closeDrawer}>
						<SidebarClose class="h-4 w-4" />
					</Button>
				</Sheet.Close>
			</Sheet.Title>
			<ScrollArea class="flex-1 p-2">
				{#if $drawerUI.drawerType === 'event' && $drawerUI.event}
					<RenderEvent event={$drawerUI.event} />
				{:else if $drawerUI.drawerType === 'event-tools' && $drawerUI.eventTools}
					<EventTools kind={$drawerUI.eventTools.kind} action={$drawerUI.eventTools.action} />
				{/if}
			</ScrollArea>
		</div>
	</Sheet.Content>
</Sheet.Root>
