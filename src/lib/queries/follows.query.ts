import { QueryClient, createQuery } from '@tanstack/svelte-query'
import { derived, get } from 'svelte/store'
import ndkStore from '$lib/stores/ndk'
import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk'
import { NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk'
import { queryClient } from './client'

export const followsQueryKey = (pubkey: string | undefined) => ['follows', pubkey]
export const profileQueryKey = (pubkey: string | undefined) => ['profile', pubkey]

export const createUserFollowsByIdQuery = (pubkey: string | undefined) =>
	createQuery<Set<NDKUser> | null>(
		{
			queryKey: followsQueryKey(pubkey),
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

export const createActiveUserFollowsQuery = createQuery(
	derived(ndkStore, ($ndkStore) => ({
		queryKey: followsQueryKey($ndkStore.activeUser?.pubkey),
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

export class ProfileNotFoundError extends Error {
	constructor(pubkey: string) {
		super(`Profile not found for ${pubkey}`)
		this.name = 'ProfileNotFoundError'
	}
}

export const createProfileQuery = (pubkey: string) =>
	createQuery<NDKUserProfile | null>(
		{
			queryKey: profileQueryKey(pubkey),
			queryFn: async () => {
				const $ndkStore = get(ndkStore)
				const user = $ndkStore.getUser({ pubkey })

				const cachedProfile = await user.fetchProfile({
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
				})

				if (cachedProfile) {
					return cachedProfile
				}

				const profileFromRelays = await user.fetchProfile({
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
					groupable: true
				})

				if (!profileFromRelays) {
					throw new ProfileNotFoundError(pubkey)
				}

				return profileFromRelays
			},
			retry: (failureCount, error) => {
				if (error instanceof ProfileNotFoundError) {
					return false
				}
				return failureCount < 3
			},
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			enabled: !!get(ndkStore).activeUser
		},
		queryClient
	)

export const createActiveUserProfileQuery = createQuery(
	derived(ndkStore, ($ndkStore) => ({
		queryKey: profileQueryKey($ndkStore.activeUser?.pubkey),
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
				throw new ProfileNotFoundError($ndkStore.activeUser?.pubkey ?? '')
			}

			return profileFromRelays
		},
		retry: (failureCount: number, error: unknown) => {
			if (error instanceof ProfileNotFoundError) {
				return false
			}
			return failureCount < 3
		},
		retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
		enabled: !!$ndkStore.activeUser?.pubkey
	})),
	queryClient
)

export const getProfileName = (profile: NDKUserProfile | null | undefined): string =>
	profile?.name ||
	profile?.displayName ||
	profile?.nip05 ||
	(profile?.pubkey as string) ||
	'Unnamed user'

export function getTypedProfileQueryData(
	queryClient: QueryClient,
	pubkey: string
): NDKUserProfile | null | undefined {
	return queryClient.getQueryData<NDKUserProfile | null>(profileQueryKey(pubkey))
}
