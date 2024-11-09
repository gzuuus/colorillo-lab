import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: browser,
			staleTime: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true
		}
	}
})
