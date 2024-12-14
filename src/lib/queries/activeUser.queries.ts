import ndkStore from '$lib/stores/ndk'
import { NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { derived, get } from 'svelte/store'
import { queryClient } from './client'
import { queryKeys } from './queryKeyFactory'

export const createActiveUserRelaysQuery = createQuery(
	derived(ndkStore, ($ndkStore) => ({
		queryKey: queryKeys.users.relays($ndkStore.activeUser?.pubkey),
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

export const createActiveUserProfileQuery = createQuery(
	derived(ndkStore, ($ndkStore) => ({
		queryKey: queryKeys.users.profile($ndkStore.activeUser?.pubkey),
		queryFn: async () => {
			const cachedProfile = await $ndkStore.activeUser?.fetchProfile({
				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
			})

			if (cachedProfile) {
				return cachedProfile
			}

			const profileFromRelays = await $ndkStore.activeUser?.fetchProfile({
				cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
				groupable: true
			})

			if (!profileFromRelays) {
				throw new Error($ndkStore.activeUser?.pubkey ?? '')
			}

			return profileFromRelays
		},
		retry: (failureCount: number, error: unknown) => {
			if (error instanceof Error) {
				return false
			}
			return failureCount < 3
		},
		retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
		enabled: !!$ndkStore.activeUser?.pubkey
	})),
	queryClient
)

export const createActiveUserFollowsQuery = createQuery(
	derived(ndkStore, ($ndkStore) => ({
		queryKey: queryKeys.users.follows($ndkStore.activeUser?.pubkey),
		queryFn: async () => {
			const $ndkStore = get(ndkStore)
			if (!$ndkStore.activeUser) return null

			const cachedFollows = await $ndkStore.activeUser.follows({
				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
			})

			if (cachedFollows && cachedFollows.size > 0) {
				return cachedFollows
			}

			const followsFromRelay = await $ndkStore.activeUser.follows({
				cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY
			})

			console.log(followsFromRelay)
			if (!followsFromRelay) {
				console.log('Follows not found', $ndkStore.activeUser?.pubkey)
				throw Error('Follows not found')
			}
			return followsFromRelay
		},
		enabled: !!$ndkStore.activeUser?.pubkey,
		retry: 3,
		retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
	})),
	queryClient
)
