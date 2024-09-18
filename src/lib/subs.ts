// import type { NDKEvent } from "@nostr-dev-kit/ndk"

import { derived } from 'svelte/store'

// type RelayAction = 'add' | 'remove'

// export async function manageUserRelays(userRelays: Set<NDKEvent>, action: RelayAction) {
// 	const handlers = Array.from(userRelays).map((event) => {
// 		const handler = eventKindActions.get(event.kind as number)
// 		return handler ? () => handler(event, action) : () => console.log('Unknown event kind:', event)
// 	})

// 	await Promise.all(handlers.map((handler) => handler()))
// }
