import type NDK from '@nostr-dev-kit/ndk'
import type { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk'
import { writable, derived, type Readable, get } from 'svelte/store'
import { createQuery } from '@tanstack/svelte-query'
import { queryClient } from '$lib/queries/client'

interface EventStats {
	kind: number
	foundCount: number
	contactsWithEvents: number
	totalContacts: number
}

interface LoaderProgress {
	isFetching: boolean
	isAutoFetching: boolean
	stats: Map<number, EventStats>
	fetchedPubkeys: Set<string>
	total: number
	loaded: number
	lastBatchSize: number
	completionPercentage: number
}

interface LoaderState {
	targetKinds: number[]
	progress: LoaderProgress
	pubkeys: string[]
	events: Map<string, NDKEvent>
	missingEvents: Map<string, Set<number>>
}

const EVENTS_QUERY_KEY = 'nostr-events'
const AUTO_FETCH_DELAY = 50
const BATCH_SIZE = 1000
const MIN_LIMIT = 1
const MAX_LIMIT = 60
const LIMIT_INCREMENT = 20
const MIN_SUCCESS_RATE = 0.04

export class EventLoaderService {
	private abortController?: AbortController
	private retryCount: Map<string, number> = new Map()

	private state = writable<LoaderState>({
		targetKinds: [],
		progress: {
			isFetching: false,
			isAutoFetching: false,
			stats: new Map(),
			fetchedPubkeys: new Set(),
			total: 0,
			loaded: 0,
			lastBatchSize: 0,
			completionPercentage: 0
		},
		pubkeys: [],
		events: new Map(),
		missingEvents: new Map()
	})

	getProgress(): Readable<LoaderProgress> {
		return derived(this.state, ($state) => $state.progress)
	}

	getTargetKinds(): Readable<number[]> {
		return derived(this.state, ($state) => $state.targetKinds)
	}

	getPendingPubkeys(): Readable<string[]> {
		return derived(this.state, ($state) => {
			return $state.pubkeys.filter((pk) => {
				return !$state.events.has(pk)
			})
		})
	}

	async startAutoFetch(ndk: NDK): Promise<void> {
		const state = get(this.state)
		if (state.progress.isAutoFetching || state.progress.isFetching) return

		this.abortController = new AbortController()

		this.state.update((state) => ({
			...state,
			progress: {
				...state.progress,
				isAutoFetching: true
			}
		}))

		try {
			while (!this.abortController.signal.aborted) {
				const hasMoreEvents = await this.fetchNextBatch(ndk)
				if (!hasMoreEvents) {
					console.log('No more events to fetch, stopping')
					break
				}

				await new Promise((resolve) => setTimeout(resolve, AUTO_FETCH_DELAY))
			}
		} finally {
			this.stopAutoFetch()
		}
	}

	async fetchNextBatch(ndk: NDK): Promise<boolean> {
		const currentState = get(this.state)
		if (currentState.progress.isFetching) return false

		const pendingPubkeys = get(this.getPendingPubkeys())
		if (pendingPubkeys.length === 0) return false

		const batchPubkeys = pendingPubkeys.slice(0, BATCH_SIZE)
		this.setFetching(true)

		const previousSuccessRate = currentState.progress.lastBatchSize / BATCH_SIZE
		const currentLimit = this.calculateNextLimit(
			currentState.progress.lastBatchSize,
			previousSuccessRate
		)

		try {
			const filter: NDKFilter = {
				kinds: currentState.targetKinds,
				authors: batchPubkeys,
				limit: currentLimit
			}

			const events = await ndk.fetchEvents(filter)
			console.log('Fetched events', events.size)
			if (events.size === 0) {
				console.log('No events found in batch, stopping fetch')
				return false
			}

			// Group events by pubkey and track stats
			const eventsByPubkey = new Map<string, NDKEvent[]>()
			const newStats = new Map<number, EventStats>()
			const pubkeysWithEvents = new Set<string>()
			const contactsWithKinds = new Map<number, Set<string>>()

			// Initialize stats and tracking structures
			currentState.targetKinds.forEach((kind) => {
				newStats.set(kind, {
					kind,
					foundCount: 0,
					contactsWithEvents: 0,
					totalContacts: batchPubkeys.length
				})
				contactsWithKinds.set(kind, new Set())
			})

			// Group events by pubkey
			for (const event of events) {
				const pubkey = event.pubkey
				if (!eventsByPubkey.has(pubkey)) {
					eventsByPubkey.set(pubkey, [])
				}
				eventsByPubkey.get(pubkey)!.push(event)

				// Track stats
				const kind = event.kind!
				pubkeysWithEvents.add(pubkey)

				const contactsForKind = contactsWithKinds.get(kind)
				if (contactsForKind) {
					contactsForKind.add(pubkey)
				}

				const kindStats = newStats.get(kind)!
				kindStats.foundCount++
			}

			// Process events and find latest for each pubkey/kind
			const newEvents = new Map<string, NDKEvent>()
			for (const [pubkey, pubkeyEvents] of eventsByPubkey) {
				// Get existing event if any
				const existingEvent = currentState.events.get(pubkey)

				// Find the most recent event
				let latestEvent = pubkeyEvents[0]
				for (const event of pubkeyEvents) {
					if (event.created_at! > latestEvent.created_at!) {
						latestEvent = event
					}
				}

				// Only update if we found a newer event
				if (!existingEvent || latestEvent.created_at! > existingEvent.created_at!) {
					newEvents.set(pubkey, latestEvent)
				} else {
					newEvents.set(pubkey, existingEvent)
				}
			}

			// Update contact stats
			for (const [kind, contacts] of contactsWithKinds) {
				const stats = newStats.get(kind)
				if (stats) {
					stats.contactsWithEvents = contacts.size
				}
			}

			// Update state with new events
			this.state.update((state) => {
				const updatedEvents = new Map(state.events)

				// Merge in new/updated events
				for (const [pubkey, event] of newEvents) {
					updatedEvents.set(pubkey, event)
				}

				const completionPercentage = Math.round((updatedEvents.size / state.pubkeys.length) * 100)

				return {
					...state,
					events: updatedEvents,
					progress: {
						...state.progress,
						fetchedPubkeys: new Set([...state.progress.fetchedPubkeys, ...batchPubkeys]),
						loaded: updatedEvents.size,
						lastBatchSize: pubkeysWithEvents.size,
						stats: this.mergeStats(state.progress.stats, newStats),
						completionPercentage
					}
				}
			})

			queryClient.setQueryData([EVENTS_QUERY_KEY], get(this.state).events)
			return true
		} finally {
			this.setFetching(false)
		}
	}

	createEventsQuery() {
		return createQuery(
			{
				queryKey: [EVENTS_QUERY_KEY],
				queryFn: () => get(this.state).events,
				staleTime: Infinity
			},
			queryClient
		)
	}

	private calculateNextLimit(lastBatchSize: number, previousSuccessRate: number): number {
		if (lastBatchSize === 0) return MIN_LIMIT

		if (previousSuccessRate < MIN_SUCCESS_RATE) {
			const nextLimit = Math.min(MAX_LIMIT, lastBatchSize + LIMIT_INCREMENT)
			console.log('nextLimit', nextLimit, previousSuccessRate)
			return nextLimit
		}

		return MIN_LIMIT
	}

	initialize(pubkeys: string[], initialKinds: number[]) {
		this.retryCount.clear()

		this.state.update((state) => {
			const filteredEvents = new Map(
				Array.from(state.events.entries()).filter(
					([_, event]) => initialKinds.includes(event.kind!) && pubkeys.includes(event.pubkey)
				)
			)

			const missingEvents = new Map<string, Set<number>>()
			pubkeys.forEach((pubkey) => {
				missingEvents.set(pubkey, new Set(initialKinds))
			})

			filteredEvents.forEach((event, pubkey) => {
				const missingKinds = missingEvents.get(pubkey)
				if (missingKinds) {
					missingKinds.delete(event.kind!)
				}
			})

			return {
				targetKinds: initialKinds,
				progress: {
					isFetching: false,
					isAutoFetching: false,
					stats: new Map(),
					fetchedPubkeys: new Set(filteredEvents.keys()),
					total: pubkeys.length,
					loaded: filteredEvents.size,
					lastBatchSize: 0,
					completionPercentage: 0
				},
				pubkeys,
				events: filteredEvents,
				missingEvents
			}
		})

		queryClient.setQueryData([EVENTS_QUERY_KEY], get(this.state).events)
	}

	stopAutoFetch(): void {
		this.abortController?.abort()
		this.abortController = undefined

		this.state.update((state) => ({
			...state,
			progress: {
				...state.progress,
				isAutoFetching: false
			}
		}))
	}

	async updateTargetKinds(kinds: number[]) {
		this.stopAutoFetch()

		this.state.update((state) => {
			const filteredEvents = new Map(
				Array.from(state.events.entries()).filter(([_, event]) => kinds.includes(event.kind!))
			)

			return {
				...state,
				targetKinds: kinds,
				progress: {
					...state.progress,
					isFetching: false,
					isAutoFetching: false,
					// stats: new Map(),
					fetchedPubkeys: new Set(filteredEvents.keys()),
					loaded: filteredEvents.size,
					lastBatchSize: 0
				},
				events: filteredEvents
			}
		})

		const state = get(this.state)
		queryClient.setQueryData([EVENTS_QUERY_KEY], state.events)
	}

	private mergeStats(
		existing: Map<number, EventStats>,
		newStats: Map<number, EventStats>
	): Map<number, EventStats> {
		const merged = new Map(existing)

		newStats.forEach((newStat, kind) => {
			const existingStat = merged.get(kind)
			if (existingStat) {
				merged.set(kind, {
					kind,
					foundCount: existingStat.foundCount + newStat.foundCount,
					contactsWithEvents: existingStat.contactsWithEvents + newStat.contactsWithEvents,
					totalContacts: existingStat.totalContacts + newStat.totalContacts
				})
			} else {
				merged.set(kind, newStat)
			}
		})

		return merged
	}

	private setFetching(isFetching: boolean) {
		this.state.update((state) => ({
			...state,
			progress: {
				...state.progress,
				isFetching
			}
		}))
	}
	// TODO improve reset
	reset() {
		this.stopAutoFetch()
		this.retryCount.clear()
		this.state.update((state) => ({
			...state,
			progress: {
				...state.progress,
				stats: new Map(),
				fetchedPubkeys: new Set<string>()
			},
			pubkeys: state.pubkeys,
			events: new Map(),
			missingEvents: new Map()
		}))
	}
}

export const eventLoader = new EventLoaderService()
