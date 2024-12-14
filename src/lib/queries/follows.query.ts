import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import ndkStore from '$lib/stores/ndk'
import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk'
import { NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk'
import { queryClient } from './client'
import { queryKeys } from './queryKeyFactory'

export const createUserFollowsByIdQuery = (pubkey: string | undefined) =>
	createQuery<Set<NDKUser> | null>(
		{
			queryKey: queryKeys.users.follows(pubkey),
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
					cacheUsage: NDKSubscriptionCacheUsage.PARALLEL
				})
				console.log(followsFromRelay)
				if (!followsFromRelay) {
					console.error('Follows not found', pubkey)
					throw Error('Follows not found')
				}
				return followsFromRelay
			},
			retry: 3,
			enabled: !!pubkey,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
		},
		queryClient
	)

export const createProfileQuery = (pubkey: string) =>
	createQuery<NDKUserProfile | null>(
		{
			queryKey: queryKeys.users.profile(pubkey),
			queryFn: async () => {
				const $ndkStore = get(ndkStore)
				const user = $ndkStore.getUser({ pubkey })

				const cachedProfile = await user.fetchProfile({
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE,
					groupable: true
				})

				if (cachedProfile) {
					return cachedProfile
				}

				const profileFromRelays = await user.fetchProfile({
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
					groupable: true
				})

				if (!profileFromRelays) {
					throw new Error(pubkey)
				}

				return profileFromRelays
			},
			retry: (failureCount, error) => {
				if (error instanceof Error) {
					return false
				}
				return failureCount < 3
			},
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			enabled: !!get(ndkStore).activeUser
		},
		queryClient
	)
