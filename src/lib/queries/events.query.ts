import ndkStore from '$lib/stores/ndk'
import { NDKSubscriptionCacheUsage, type NDKEvent, type NDKFilter } from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { queryClient } from './client'

export const latestEventQueryKey = (pubkey: string) => ['latestEvent', pubkey]
export const createLatestEventQuery = (pubkey: string) =>
	createQuery<NDKEvent | null>(
		{
			queryKey: ['latestEvent', pubkey],
			queryFn: async () => {
				const $ndkStore = get(ndkStore)

				const filter: NDKFilter = { kinds: [1], authors: [pubkey] }

				const cachedEvent = await $ndkStore.fetchEvent(filter, {
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
				})

				if (cachedEvent) {
					return cachedEvent
				}

				const eventFromRelay = await $ndkStore.fetchEvent(filter, {
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
					groupable: true
				})

				if (!eventFromRelay) {
					console.log('Profile not found', pubkey)
					throw Error('Profile not found')
				}

				return eventFromRelay
			},
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
		},
		queryClient
	)
