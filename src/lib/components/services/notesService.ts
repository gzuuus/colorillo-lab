// stores/latestEvents.ts
import { writable, derived, get } from 'svelte/store'
import { liveQuery } from 'dexie'
import type NDK from '@nostr-dev-kit/ndk'
import {
	getLatestEventPerPubkeyAndKind,
	pubkeyEventDB,
	type PubkeyEventEntry
} from '../stores/appDb'
import { NDKKind } from '@nostr-dev-kit/ndk'
const enumValues = Object.values(NDKKind).filter((value) => typeof value === 'number') as number[]

function createLatestEventsStore() {
	const events = writable<Map<string, PubkeyEventEntry>>(new Map())
	const pendingPubkeys = writable<Set<string>>(new Set())
	const targetKinds = writable<number[]>(enumValues.slice(0, 15))
	const remainingCount = derived(pendingPubkeys, ($pendingPubkeys) => $pendingPubkeys.size)
	const fetchingStatus = writable<'idle' | 'fetching' | 'complete'>('idle')

	function fetchLatestEvents(pubkeys: string[]) {
		const query = liveQuery(() => getLatestEventPerPubkeyAndKind(pubkeys, get(targetKinds)))
		query.subscribe((latestEvents) => {
			events.set(latestEvents)
			const missingPubkeys = new Set(pubkeys.filter((pk) => !latestEvents.has(pk)))
			pendingPubkeys.set(missingPubkeys)
		})
	}

	function updateTargetKinds(newKinds: number[]) {
		targetKinds.set(newKinds)
		const currentPubkeys = Array.from(get(events).keys())
		fetchLatestEvents(currentPubkeys)
	}

	async function fetchRemainingEvents(ndk: NDK): Promise<boolean> {
		const currentPendingPubkeys = get(pendingPubkeys)
		const currentTargetKinds = get(targetKinds)

		if (currentPendingPubkeys.size === 0) {
			fetchingStatus.set('complete')
			return false
		}

		fetchingStatus.set('fetching')

		const fetchedEvents = await ndk.fetchEvents({
			kinds: currentTargetKinds,
			authors: Array.from(currentPendingPubkeys),
			limit: 100
		})

		console.log(fetchedEvents.size, 'fetched events')

		if (fetchedEvents.size === 0) {
			fetchingStatus.set('complete')
			return false
		}

		const newEntries: PubkeyEventEntry[] = Array.from(fetchedEvents).map((event) => ({
			pubkey: event.pubkey,
			eventId: event.id,
			kind: event.kind!,
			createdAt: event.created_at!,
			content: event.content
		}))

		await pubkeyEventDB.pubkeyEvents.bulkPut(newEntries)

		events.update((map) => {
			newEntries.forEach((entry) => {
				const existingEntry = map.get(entry.pubkey)
				if (!existingEntry || entry.createdAt > existingEntry.createdAt) {
					map.set(entry.pubkey, entry)
				}
			})
			return map
		})

		pendingPubkeys.update((set) => {
			newEntries.forEach((entry) => set.delete(entry.pubkey))
			return set
		})

		fetchingStatus.set('idle')
		return true
	}

	const store = {
		subscribe: derived(
			[events, remainingCount, targetKinds, fetchingStatus],
			([$events, $remainingCount, $targetKinds, $fetchingStatus]) => ({
				events: $events,
				remainingCount: $remainingCount,
				targetKinds: $targetKinds,
				fetchingStatus: $fetchingStatus
			})
		).subscribe,
		fetchLatestEvents,
		fetchRemainingEvents,
		updateTargetKinds
	}

	return store
}

export const latestEventsStore = createLatestEventsStore()
