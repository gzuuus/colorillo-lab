import type { CreateQueryResult } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export async function resolveQuery<T>(
	queryFn: () => CreateQueryResult<T, Error>,
	maxRetries?: number,
	retryDelay?: number
): Promise<T> {
	const queryPromise = queryFn()
	let retryCount = 0

	return new Promise((resolve, reject) => {
		const check = async () => {
			const currentQuery = get(queryPromise)
			if (currentQuery.isFetched && currentQuery.data !== undefined) {
				resolve(currentQuery.data)
			} else if (retryCount < (maxRetries ?? 10)) {
				retryCount++
				setTimeout(check, retryDelay ?? 250)
			} else {
				reject(new Error('Max retries exceeded'))
			}
		}
		check()
	})
}
