// src/lib/ndkLogin.ts
import { NDKNip07Signer, NDKSubscriptionCacheUsage, NDKUser } from '@nostr-dev-kit/ndk'
import type { QueryClient } from '@tanstack/svelte-query'
import { followsQueryKey, profileQueryKey } from './queries/follows.query'
import { get } from 'svelte/store'
import ndkStore, { ndk } from './components/stores/ndk'

export async function loginWithExtension(queryClient: QueryClient): Promise<boolean> {
	try {
		const signer = new NDKNip07Signer()
		console.log('Waiting for NIP-07 signer')
		await signer.blockUntilReady()
		ndk.signer = signer
		ndkStore.set(ndk)
		const user = await fetchActiveUserData()
		if (user) {
			await prefetchProfiles(user.pubkey, queryClient)
		}
		return true
	} catch (e) {
		console.error(e)
		return false
	}
}

export async function fetchActiveUserData(): Promise<NDKUser | null> {
	if (!ndk.signer) return null
	console.log('Fetching profile')
	const user = await ndk.signer.user()
	await user.fetchProfile({ cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY })
	ndkStore.set(ndk)
	return user
}

async function prefetchProfiles(userId: string, queryClient: QueryClient) {
	const $ndkStore = get(ndkStore)

	// Prefetch user's follows
	await queryClient.prefetchQuery({
		queryKey: followsQueryKey(userId),
		queryFn: async () => {
			if (!$ndkStore.activeUser) return null
			return await $ndkStore.activeUser.follows()
		}
	})

	// Get the follows data
	const followsData = queryClient.getQueryData<Set<NDKUser> | null>(followsQueryKey(userId))

	if (followsData) {
		// Prefetch profiles for each followed user
		followsData.forEach((user) => {
			queryClient.prefetchQuery({
				queryKey: profileQueryKey(user.pubkey),
				queryFn: async () => {
					if (!$ndkStore.activeUser) return null
					return await $ndkStore.getUser({ pubkey: user.pubkey }).fetchProfile()
				}
			})
		})
	}
}

export function isLoggedIn(): boolean {
	return !!ndk.signer
}
