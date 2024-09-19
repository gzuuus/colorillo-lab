// src/lib/queries/follows.query.ts
import ndkStore from '$lib/components/stores/ndk'
import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk'
import { NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk'
import { QueryClient, createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export const followsQueryKey = (userId: string) => ['follows', userId]
export const profileQueryKey = (pubkey: string) => ['profile', pubkey]

export const createUserFollowsByIdQuery = (userId: string) =>
	createQuery<Set<NDKUser> | null>({
		queryKey: followsQueryKey(userId),
		queryFn: async () => {
			const $ndkStore = get(ndkStore)
			if (!$ndkStore.activeUser) return null

			// First, try to get data from cache
			const cachedFollows = await $ndkStore.activeUser.follows({
				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
			})

			if (cachedFollows && cachedFollows.size > 0) {
				return cachedFollows
			}

			// If cache is empty or doesn't exist, fetch from relay
			return await $ndkStore.activeUser.follows()
		},
		staleTime: Infinity
	})

export const createProfileQuery = (pubkey: string) =>
	createQuery<NDKUserProfile | null>({
		queryKey: profileQueryKey(pubkey),
		queryFn: async () => {
			const $ndkStore = get(ndkStore)
			if (!$ndkStore.activeUser) return null

			const user = $ndkStore.getUser({ pubkey })

			// First, try to get profile from cache
			const cachedProfile = await user.fetchProfile({
				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
			})

			if (cachedProfile) {
				return cachedProfile
			}

			// If cache is empty or doesn't exist, fetch from relay
			return await user.fetchProfile()
		},
		staleTime: Infinity
	})

export const getProfileName = (profile: NDKUserProfile | null | undefined): string =>
	profile?.name || profile?.displayName || profile?.nip05 || 'Unnamed user'

// Add this to the end of src/lib/queries/follows.query.ts

export function getTypedProfileQueryData(
	queryClient: QueryClient,
	pubkey: string
): NDKUserProfile | null | undefined {
	return queryClient.getQueryData<NDKUserProfile | null>(profileQueryKey(pubkey))
}
