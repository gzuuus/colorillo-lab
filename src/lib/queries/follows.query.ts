import ndkStore from '$lib'
import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export const createUserFollowsByIdQuery = (userId: string) =>
	createQuery<Set<NDKUser> | null>({
		queryKey: ['follows', userId],
		queryFn: async () => {
			const $ndkStore = get(ndkStore)
			if (!$ndkStore.activeUser) return null
			return await $ndkStore.activeUser.follows()
		},
		staleTime: Infinity
	})

export const createProfileQuery = (pubkey: string) =>
	createQuery<NDKUserProfile | null>({
		queryKey: ['profile', pubkey],
		queryFn: async () => {
			const $ndkStore = get(ndkStore)
			if (!$ndkStore.activeUser) return null
			return await $ndkStore.getUser({ pubkey }).fetchProfile()
		},
		staleTime: Infinity
	})

export const getProfileName = (profile: NDKUserProfile | null | undefined): string =>
	profile?.name || profile?.displayName || profile?.nip05 || 'Unnamed user'
