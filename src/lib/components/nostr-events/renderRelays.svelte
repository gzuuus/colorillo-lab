<script lang="ts">
	import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk'
	import { Eye, EyeOff, MoreVertical, Pencil, PencilOff } from 'lucide-svelte'
	import * as Popover from '$lib/components/ui/popover'
	import { openDrawer } from '$lib/stores/drawer'

	export let relayEvent: NDKEvent
	let isOpen: boolean = false
	interface RelayInfo {
		url: string
		read?: boolean
		write?: boolean
	}

	interface RelayAttributes {
		read?: boolean
		write?: boolean
	}

	const parseRelayList = (event: NDKEvent): RelayInfo[] => {
		switch (Number(event.kind)) {
			case NDKKind.Contacts:
				try {
					if (!event.content.trim()) return []
					const content = JSON.parse(event.content)
					return Object.entries(content).map(([url, attrs]) => {
						if (
							!attrs ||
							(typeof attrs === 'object' && Object.keys(attrs as object).length === 0)
						) {
							return { url, read: true, write: true }
						}
						return {
							url,
							read: (attrs as RelayAttributes)?.read ?? true,
							write: (attrs as RelayAttributes)?.write ?? true
						}
					})
				} catch (e) {
					console.error(`Failed to parse kind ${event.kind} relay list:`, e)
					return []
				}
			case NDKKind.RelayList:
				return event.tags
					.filter((tag) => tag[0] === 'r')
					.map((tag) => {
						if (!tag[2]) {
							return { url: tag[1], read: true, write: true }
						}
						return {
							url: tag[1],
							read: tag[2] === 'read' || tag[2] === undefined,
							write: tag[2] === 'write' || tag[2] === undefined
						}
					})
			default:
				return []
		}
	}

	const relays = parseRelayList(relayEvent)
</script>

{#if relays.length}
	<div class="p-4 border border-gray-200 rounded-lg">
		<div class="flex w-full justify-between items-center mb-2">
			<Popover.Root bind:open={isOpen}>
				<h3 class="text-lg font-semibold">
					Event Kind: {relayEvent.kind}
					<span class=" text-sm font-light">({NDKKind[Number(relayEvent.kind)]})</span>
				</h3>
				<Popover.Trigger class="hover:bg-gray-100 rounded-full p-1">
					<MoreVertical class="w-5 h-5 text-gray-600" />
				</Popover.Trigger>
				<Popover.Content class="w-48 p-2 bg-white shadow-lg rounded-md border border-gray-200">
					<div class="space-y-1">
						<button
							class="w-full text-left px-2 py-1 hover:bg-gray-100 bg-gray-50 rounded"
							on:click={() => {
								openDrawer({ drawerType: 'event', event: relayEvent })
								isOpen = false
							}}
						>
							View Details
						</button>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>

		<ul class="space-y-2">
			{#each relays as relay}
				<li
					class="p-2 bg-gray-50 rounded flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2"
				>
					<span class="font-medium text-center sm:text-left w-full sm:w-auto">{relay.url}</span>
					<div class="flex space-x-2 items-center">
						<div
							class="p-1 rounded {relay.read
								? 'bg-green-100 text-green-800'
								: 'bg-red-100 text-red-800'}"
							title={relay.read ? 'Read Enabled' : 'Read Disabled'}
						>
							{#if relay.read}
								<Eye class="w-4 h-4" />
							{:else}
								<EyeOff class="w-4 h-4" />
							{/if}
						</div>
						<div
							class="p-1 rounded {relay.write
								? 'bg-green-100 text-green-800'
								: 'bg-red-100 text-red-800'}"
							title={relay.write ? 'Write Enabled' : 'Write Disabled'}
						>
							{#if relay.write}
								<Pencil class="w-4 h-4" />
							{:else}
								<PencilOff class="w-4 h-4" />
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
{/if}
