import ndkStore from '$lib/stores/ndk'
import { NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { derived } from 'svelte/store'
import { queryClient } from './client'

export const relaysQueryKey = (pubkey: string | undefined) => ['relays', pubkey]

export const createActiveUserRelaysQuery = createQuery(
	derived(ndkStore, ($ndkStore) => ({
		queryKey: relaysQueryKey($ndkStore.activeUser?.pubkey),
		queryFn: async () => {
			if (!$ndkStore.activeUser) return null

			const cachedRelays = await $ndkStore.fetchEvents(
				{ kinds: [3, 10002], authors: [$ndkStore.activeUser.pubkey] },
				{
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
				}
			)

			if (cachedRelays && cachedRelays.size > 0) {
				return cachedRelays
			}

			const relaysFromNostr = await $ndkStore.fetchEvents(
				{ kinds: [3, 10002], authors: [$ndkStore.activeUser.pubkey] },
				{
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY
				}
			)

			if (!relaysFromNostr) {
				console.log('Relays not found', $ndkStore.activeUser?.pubkey)
				throw Error('Relays not found')
			}
			return relaysFromNostr
		},
		enabled: !!$ndkStore.activeUser?.pubkey,
		retry: 3,
		retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
	})),
	queryClient
)
