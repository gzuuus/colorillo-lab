import { browser } from '$app/environment'
import { QueryClient, type CreateQueryResult } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: browser,
			staleTime: 5 * 60 * 1000, // 5 minutes
			refetchOnWindowFocus: false,
			refetchOnReconnect: true
		}
	}
})
