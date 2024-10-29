// appDb.ts
import { db as ndkDb } from '@nostr-dev-kit/ndk-cache-dexie'
import Dexie from 'dexie'

export interface PubkeyEventEntry {
	pubkey: string
	eventId: string
	kind: number
	createdAt: number
	content: string
}

export class PubkeyEventDB extends Dexie {
	pubkeyEvents!: Dexie.Table<PubkeyEventEntry, string>

	constructor() {
		super('PubkeyEventDatabase')
		this.version(1).stores({
			pubkeyEvents: 'eventId, pubkey, kind, createdAt, [pubkey+kind]'
		})
	}
}

export const pubkeyEventDB = new PubkeyEventDB()

export async function syncWithNDKDb(): Promise<void> {
	const allEvents = await ndkDb.events.toArray()
	await pubkeyEventDB.pubkeyEvents.bulkPut(
		allEvents.map((event) => ({
			pubkey: event.pubkey,
			eventId: event.id,
			kind: event.kind,
			createdAt: event.createdAt,
			content: event.event
		}))
	)
}

export async function getLatestEventPerPubkey(pubkeys: string[]) {
	return pubkeyEventDB.pubkeyEvents
		.where('pubkey')
		.anyOf(pubkeys)
		.toArray()
		.then((events) => {
			const latestEvents = new Map<string, PubkeyEventEntry>()
			events.forEach((event) => {
				const existingEvent = latestEvents.get(event.pubkey)
				if (!existingEvent || event.createdAt > existingEvent.createdAt) {
					latestEvents.set(event.pubkey, event)
				}
			})
			return latestEvents
		})
}

export async function getLatestEventPerPubkeyAndKind(pubkeys: string[], kinds: number[] = [0, 3]) {
	return pubkeyEventDB.pubkeyEvents
		.where('pubkey')
		.anyOf(pubkeys)
		.and((event) => kinds.includes(event.kind))
		.toArray()
		.then((events) => {
			const latestEvents = new Map<string, PubkeyEventEntry>()
			events.forEach((event) => {
				const existingEvent = latestEvents.get(event.pubkey)
				if (!existingEvent || event.createdAt > existingEvent.createdAt) {
					latestEvents.set(event.pubkey, event)
				}
			})
			return latestEvents
		})
}
