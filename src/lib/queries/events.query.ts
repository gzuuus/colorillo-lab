import ndkStore from '$lib/components/stores/ndk'
import type { NDKEvent, NDKFilter, NDKSubscriptionOptions } from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export const createLatestEventQuery = (pubkey: string) =>
	createQuery<NDKEvent | null>({
		queryKey: ['latestEvent', pubkey],
		queryFn: async () => {
			const $ndkStore = get(ndkStore)
			if (!$ndkStore.activeUser) return null

			const filter: NDKFilter = { kinds: [1], authors: [pubkey], limit: 1 }
			const opts: NDKSubscriptionOptions = { closeOnEose: true }

			try {
				const event = await $ndkStore.fetchEvent(filter, opts)
				return event
			} catch (error) {
				console.error(`Error fetching event for ${pubkey}:`, error)
				return null
			}
		},
		staleTime: 60000 // 1 minute, adjust as needed
	})
