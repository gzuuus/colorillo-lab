import type { CreateQueryResult } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export async function resolveQuery<T>(
	queryFn: () => CreateQueryResult<T, Error>,
	timeout: number = 1000 * 60
): Promise<T> {
	const startTime = Date.now()
	const query = queryFn()
	let currentQuery = get(query)

	while (!currentQuery.isSuccess && !currentQuery.isError) {
		if (Date.now() - startTime > timeout) {
			throw new Error('Query timed out')
		}
		await new Promise((resolve) => setTimeout(resolve, 5))
		currentQuery = get(query)
	}

	if (currentQuery.isFetched && !currentQuery.isError) {
		return currentQuery.data
	}

	throw currentQuery.error || new Error('Price query failed')
}
