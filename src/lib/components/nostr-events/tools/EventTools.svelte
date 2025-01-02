<script lang="ts">
	import { NDKKind, type NostrEvent } from '@nostr-dev-kit/ndk'
	import * as Tabs from '$lib/components/ui/tabs'
	import { Button } from '$lib/components/ui/button'
	import { Card } from '$lib/components/ui/card'
	import { eventLoader } from '$lib/services/event-loader'
	import { derived } from 'svelte/store'
	import { toast } from 'svelte-sonner'
	import { ScrollArea } from '$lib/components/ui/scroll-area'
	import RenderEvent from '../renderEvent.svelte'
	import { createEventQuery } from '$lib/queries/events.query'
	import ndkStore from '$lib/stores/ndk'
	import { onMount } from 'svelte'

	export let kind: NDKKind
	export let action: 'view' | 'backup' | 'export' = 'view'
	let backedEvents: Array<NostrEvent>
	$: filteredEvents = createEventQuery($ndkStore.activeUser?.pubkey!, kind)
	async function handleBackup() {
		try {
			if (!$filteredEvents.data) return
			const eventsArray = Array.from($filteredEvents.data)
			const serializedEvents = await Promise.all(
				eventsArray.map(async (e) => await e.toNostrEvent())
			)
			localStorage.setItem(`nostr:events:${kind}`, JSON.stringify(serializedEvents))
			toast.success('Events backed up successfully')
		} catch (error) {
			toast.error('Failed to backup events')
			console.error('Backup error:', error)
		}
	}

	async function getBackup() {
		try {
			backedEvents = JSON.parse(localStorage.getItem(`nostr:events:${kind}`) ?? '')
			toast.success('Events backed up successfully')
		} catch (error) {
			toast.error('Failed to backup events')
			console.error('Backup error:', error)
		}
	}

	async function handleExport() {
		try {
			if (!$filteredEvents.data) return
			const eventsArray = Array.from($filteredEvents.data)
			const serializedEvents = await Promise.all(
				eventsArray.map(async (e) => await e.toNostrEvent())
			)
			const blob = new Blob([JSON.stringify(serializedEvents, null, 2)], {
				type: 'application/json'
			})
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `nostr-events-${NDKKind[kind] || kind}.json`
			a.click()
			URL.revokeObjectURL(url)
			toast.success('Events exported successfully')
		} catch (error) {
			toast.error('Failed to export events')
			console.error('Export error:', error)
		}
	}

	onMount(getBackup)
</script>

{#if $filteredEvents.data}
	<Tabs.Root value={action} class="w-full">
		<Tabs.List class="grid w-full grid-cols-3">
			<Tabs.Trigger value="view">View ({$filteredEvents.data?.size})</Tabs.Trigger>
			<Tabs.Trigger value="backup">Backup</Tabs.Trigger>
			<Tabs.Trigger value="export">Export</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="view" class="space-y-4">
			<ScrollArea class="h-[600px] pr-4">
				{#if $filteredEvents.data?.size === 0}
					<div class="p-8 text-center text-muted-foreground">No events found</div>
				{:else}
					{#each [...$filteredEvents.data] as event}
						<div class="mb-4">
							<RenderEvent {event} />
						</div>
					{/each}
				{/if}
			</ScrollArea>
		</Tabs.Content>

		<Tabs.Content value="backup">
			<div class="p-4 space-y-4">
				<Card class="p-4">
					<h3 class="font-semibold mb-2">
						Backup {$filteredEvents.data?.size} events to local storage?
					</h3>
					<p class="text-sm text-muted-foreground mb-4">
						This will save your {NDKKind[kind] || `Kind ${kind}`} events to your browser's local storage.
					</p>
					<Button on:click={handleBackup} disabled={$filteredEvents.data?.size === 0}>
						Confirm Backup
					</Button>
				</Card>
				{#if backedEvents}
					{backedEvents.length}
				{/if}
			</div>
		</Tabs.Content>

		<Tabs.Content value="export">
			<div class="p-4 space-y-4">
				<Card class="p-4">
					<h3 class="font-semibold mb-2">Export {$filteredEvents.data?.size} events as JSON?</h3>
					<p class="text-sm text-muted-foreground mb-4">
						Download your {NDKKind[kind] || `Kind ${kind}`} events as a JSON file.
					</p>
					<Button on:click={handleExport} disabled={$filteredEvents.data?.size === 0}>
						Download JSON
					</Button>
				</Card>
			</div>
		</Tabs.Content>
	</Tabs.Root>
{/if}
