import type { NDKEvent, NostrEvent } from '@nostr-dev-kit/ndk'
import type { ExtendedBaseType, NDKEventStore } from '@nostr-dev-kit/ndk-svelte'
import { ndk } from './components/stores/ndk'
import { derived, writable, type Readable } from 'svelte/store'
import { db } from '@nostr-dev-kit/ndk-cache-dexie'

export const followsStore = writable<string[]>([])

export const notesSub: NDKEventStore<ExtendedBaseType<NDKEvent>> = ndk.storeSubscribe(
	{},
	{ closeOnEose: false, autoStart: false }
)

export const combinedActivityStore: Readable<{
	follows: string[]
	notes: Map<string, NDKEvent>
	filledPercentage: number
	pendingPubkeys: string[]
}> = derived([followsStore, notesSub], ([$followsStore, $notesSub]) => {
	const follows = $followsStore
	const notes = new Map<string, NDKEvent>()

	for (const event of $notesSub) {
		if (!notes.has(event.pubkey) || event.created_at! > notes.get(event.pubkey)!.created_at!) {
			notes.set(event.pubkey, event)
		}
	}

	const pendingPubkeys = follows.filter((pubkey) => !notes.has(pubkey))
	const filledPercentage =
		follows.length > 0 ? ((follows.length - pendingPubkeys.length) / follows.length) * 100 : 0

	return {
		follows,
		notes,
		filledPercentage,
		pendingPubkeys
	}
})

export async function populateEventsFromDexie(pubkeys: string[]): Promise<Map<string, NDKEvent>> {
	const events = await db.events
		.where('kind')
		.equals(1)
		.and((event) => pubkeys.includes(event.pubkey))
		.toArray()

	const notesMap = new Map<string, NDKEvent>()
	events.forEach((event) => {
		if (
			!notesMap.has(event.pubkey) ||
			event.created_at! > notesMap.get(event.pubkey)!.created_at!
		) {
			notesMap.set(event.pubkey, event as unknown as NDKEvent)
		}
	})

	return notesMap
}
