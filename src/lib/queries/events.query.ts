import ndkStore from '$lib/stores/ndk'
import {
	NDKKind,
	NDKSubscriptionCacheUsage,
	type NDKEvent,
	type NDKFilter
} from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { queryClient } from './client'
import { queryKeys } from './queryKeyFactory'

export const createEventQuery = (pubkey: string, kind: NDKKind) =>
	createQuery<Set<NDKEvent> | null>(
		{
			queryKey: queryKeys.users.kind(pubkey, kind),
			queryFn: async () => {
				const $ndkStore = get(ndkStore)

				const filter: NDKFilter = { kinds: [kind], authors: [pubkey], limit: 50 }

				const cachedEvent = await $ndkStore.fetchEvents(filter, {
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
				})

				if (cachedEvent) {
					return cachedEvent
				}

				const eventFromRelay = await $ndkStore.fetchEvents(filter, {
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
					groupable: true
				})

				if (!eventFromRelay) {
					console.log('Event not found', pubkey)
					throw Error('Event not found')
				}

				return eventFromRelay
			},
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
		},
		queryClient
	)
