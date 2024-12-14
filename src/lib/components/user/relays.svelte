<script lang="ts">
	import { createActiveUserRelaysQuery } from '$lib/queries/activeUser.queries'
	import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk'
	import { Eye, EyeOff, Pencil, PencilOff } from 'lucide-svelte'

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
					const content = JSON.parse(event.content)
					return Object.entries(content).map(([url, attrs]) => ({
						url,
						read: (attrs as RelayAttributes)?.read ?? false,
						write: (attrs as RelayAttributes)?.write ?? false
					}))
				} catch (e) {
					console.error(`Failed to parse kind ${event.kind} relay list:`, e)
					return []
				}
			case NDKKind.RelayList:
				return event.tags
					.filter((tag) => tag[0] === 'r')
					.map((tag) => ({
						url: tag[1],
						read: tag[2] === 'read',
						write: tag[2] === 'write'
					}))
			default:
				return []
		}
	}
</script>

<div class="flex flex-row gap-4 p-2">
	{#if $createActiveUserRelaysQuery.data}
		{#each $createActiveUserRelaysQuery.data as event}
			{@const relays = parseRelayList(event)}

			<div class="p-4 border border-gray-200 rounded-lg">
				<h3 class="text-lg font-semibold mb-2">Event Kind: {event.kind}</h3>

				{#if relays.length}
					<ul class="space-y-2">
						{#each relays as relay}
							<li class="p-2 bg-gray-50 rounded flex justify-between items-center">
								<span class="font-medium">{relay.url}</span>
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
				{:else}
					<p class="text-gray-500">No relays found</p>
				{/if}
			</div>
		{/each}
	{/if}
</div>
