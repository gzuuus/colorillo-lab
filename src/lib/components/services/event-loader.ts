import type NDK from '@nostr-dev-kit/ndk'
import type { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk'
import { writable, derived, type Readable, get } from 'svelte/store'
import { createQuery } from '@tanstack/svelte-query'
import { queryClient } from '$lib/queries/client'

interface EventStats {
	kind: number
	count: number
	latestTime?: number
}

interface LoaderProgress {
	isFetching: boolean
	isAutoFetching: boolean
	stats: Map<number, EventStats>
	fetchedPubkeys: Set<string>
	total: number
	loaded: number
	lastBatchSize: number
	fetchStartTime?: number
	estimatedTimeRemaining?: number
}

interface LoaderState {
	targetKinds: number[]
	progress: LoaderProgress
	pubkeys: string[]
	events: Map<string, NDKEvent>
}

const EVENTS_QUERY_KEY = 'nostr-events'
const AUTO_FETCH_DELAY = 500 // ms between batches
const BATCH_SIZE = 500

export class EventLoaderService {
	private abortController?: AbortController
	private state = writable<LoaderState>({
		targetKinds: [],
		progress: {
			isFetching: false,
			isAutoFetching: false,
			stats: new Map(),
			fetchedPubkeys: new Set(),
			total: 0,
			loaded: 0,
			lastBatchSize: 0
		},
		pubkeys: [],
		events: new Map()
	})

	getProgress(): Readable<LoaderProgress> {
		return derived(this.state, ($state) => $state.progress)
	}

	getTargetKinds(): Readable<number[]> {
		return derived(this.state, ($state) => $state.targetKinds)
	}

	getPendingPubkeys(): Readable<string[]> {
		return derived(this.state, ($state) => {
			return $state.pubkeys.filter((pk) => !$state.progress.fetchedPubkeys.has(pk))
		})
	}

	createEventsQuery(ndk: NDK) {
		return createQuery({
			queryKey: [EVENTS_QUERY_KEY],
			queryFn: () => get(this.state).events,
			staleTime: Infinity
		})
	}

	async startAutoFetch(ndk: NDK): Promise<void> {
		const state = get(this.state)
		if (state.progress.isAutoFetching || state.progress.isFetching) return

		this.abortController = new AbortController()
		const startTime = Date.now()

		this.state.update((state) => ({
			...state,
			progress: {
				...state.progress,
				isAutoFetching: true,
				fetchStartTime: startTime
			}
		}))

		try {
			while (!this.abortController.signal.aborted) {
				const currentState = get(this.state)
				const pendingPubkeys = currentState.pubkeys.filter(
					(pk) => !currentState.progress.fetchedPubkeys.has(pk)
				)

				if (pendingPubkeys.length === 0) break

				const hasMore = await this.fetchNextBatch(ndk)
				if (!hasMore) break

				// Calculate estimated time remaining
				const elapsed = Date.now() - startTime
				const processedCount = currentState.progress.loaded
				const remainingCount = pendingPubkeys.length
				const avgTimePerBatch = elapsed / processedCount
				const estimatedTimeRemaining = avgTimePerBatch * remainingCount

				this.state.update((state) => ({
					...state,
					progress: {
						...state.progress,
						estimatedTimeRemaining
					}
				}))

				await new Promise((resolve) => setTimeout(resolve, AUTO_FETCH_DELAY))
			}
		} finally {
			this.stopAutoFetch()
		}
	}

	stopAutoFetch(): void {
		this.abortController?.abort()
		this.abortController = undefined

		this.state.update((state) => ({
			...state,
			progress: {
				...state.progress,
				isAutoFetching: false,
				fetchStartTime: undefined,
				estimatedTimeRemaining: undefined
			}
		}))
	}

	async fetchNextBatch(ndk: NDK): Promise<boolean> {
		const currentState = get(this.state)
		if (currentState.progress.isFetching) return false

		const pendingPubkeys = currentState.pubkeys.filter(
			(pk) => !currentState.progress.fetchedPubkeys.has(pk)
		)

		if (pendingPubkeys.length === 0) return false

		const batchPubkeys = pendingPubkeys.slice(0, BATCH_SIZE)

		this.setFetching(true)
		const batchStartTime = Date.now()

		try {
			const filter: NDKFilter = {
				kinds: currentState.targetKinds,
				authors: batchPubkeys,
				limit: 1
			}

			const events = await ndk.fetchEvents(filter)
			const newEvents = new Map<string, NDKEvent>()
			const newStats = new Map<number, EventStats>()

			for (const event of events) {
				const kind = event.kind!
				const pubkey = event.pubkey
				const existingEvent = newEvents.get(pubkey)

				if (!existingEvent || event.created_at! > existingEvent.created_at!) {
					newEvents.set(pubkey, event)
				}

				const kindStats = newStats.get(kind) || { kind, count: 0 }
				kindStats.count++
				kindStats.latestTime = Math.max(event.created_at!, kindStats.latestTime || 0)
				newStats.set(kind, kindStats)
			}

			const batchDuration = Date.now() - batchStartTime

			this.state.update((state) => {
				const updatedEvents = new Map(state.events)
				for (const [pubkey, event] of newEvents) {
					const existingEvent = updatedEvents.get(pubkey)
					if (!existingEvent || event.created_at! > existingEvent.created_at!) {
						updatedEvents.set(pubkey, event)
					}
				}

				return {
					...state,
					events: updatedEvents,
					progress: {
						...state.progress,
						fetchedPubkeys: new Set([...state.progress.fetchedPubkeys, ...batchPubkeys]),
						loaded: state.progress.loaded + batchPubkeys.length,
						lastBatchSize: events.size,
						stats: this.mergeStats(state.progress.stats, newStats)
					}
				}
			})

			const updatedState = get(this.state)
			queryClient.setQueryData([EVENTS_QUERY_KEY], updatedState.events)

			return pendingPubkeys.length > BATCH_SIZE
		} finally {
			this.setFetching(false)
		}
	}

	initialize(pubkeys: string[], initialKinds: number[]) {
		this.state.update((state) => {
			const filteredEvents = new Map(
				Array.from(state.events.entries()).filter(
					([_, event]) => initialKinds.includes(event.kind!) && pubkeys.includes(event.pubkey)
				)
			)

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
					fetchStartTime: undefined,
					estimatedTimeRemaining: undefined
				},
				pubkeys,
				events: filteredEvents
			}
		})

		const state = get(this.state)
		queryClient.setQueryData([EVENTS_QUERY_KEY], state.events)
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
					stats: new Map(),
					fetchedPubkeys: new Set(filteredEvents.keys()),
					loaded: filteredEvents.size,
					lastBatchSize: 0,
					fetchStartTime: undefined,
					estimatedTimeRemaining: undefined
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
		newStats.forEach((stat, kind) => {
			const existingStat = merged.get(kind)
			if (existingStat) {
				merged.set(kind, {
					kind,
					count: existingStat.count + stat.count,
					latestTime: Math.max(existingStat.latestTime ?? 0, stat.latestTime ?? 0)
				})
			} else {
				merged.set(kind, stat)
			}
		})
		return merged
	}

	private setFetching(isFetching: boolean) {
		this.state.update((state) => ({
			...state,
			progress: {
				...state.progress,
				isFetching,
				estimatedTimeRemaining: isFetching ? state.progress.estimatedTimeRemaining : undefined
			}
		}))
	}

	reset() {
		this.stopAutoFetch()

		this.state.set({
			targetKinds: [],
			progress: {
				isFetching: false,
				isAutoFetching: false,
				stats: new Map(),
				fetchedPubkeys: new Set(),
				total: 0,
				loaded: 0,
				lastBatchSize: 0,
				fetchStartTime: undefined,
				estimatedTimeRemaining: undefined
			},
			pubkeys: [],
			events: new Map()
		})
		queryClient.setQueryData([EVENTS_QUERY_KEY], new Map())
	}
}

export const eventLoader = new EventLoaderService()
