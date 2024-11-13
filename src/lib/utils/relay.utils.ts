import { derived } from 'svelte/store'
import NDK, {
	NDKEvent,
	NDKRelay,
	NDKRelayAuthPolicies,
	normalizeRelayUrl
} from '@nostr-dev-kit/ndk'
import ndkStore from '$lib/stores/ndk'
import { createActiveUserRelaysQuery } from '$lib/queries/relay.queries'

type RelayAction = 'add' | 'remove'

function extractRelayUrls(events: Set<NDKEvent>): Set<string> {
	const urls = new Set<string>()

	for (const event of events) {
		try {
			switch (event.kind) {
				case 3: {
					if (!event.content.trim()) continue
					const parsedContent = JSON.parse(event.content)
					Object.entries(parsedContent)
						.filter(
							([_, permissions]) =>
								(permissions as { read: boolean; write: boolean }).read &&
								(permissions as { read: boolean; write: boolean }).write
						)
						.forEach(([url]) => urls.add(normalizeRelayUrl(url)))
					break
				}
				case 10002: {
					event.tags
						.filter((tag) => tag[0] === 'r')
						.forEach((tag) => urls.add(normalizeRelayUrl(tag[1])))
					break
				}
			}
		} catch (error) {
			console.error(`Error processing event of kind ${event.kind}:`, error)
		}
	}
	return urls
}

async function updateRelayPool(
	ndk: NDK,
	relayUrls: Set<string>,
	action: RelayAction,
	isOutbox = false
) {
	const pool = isOutbox ? ndk.outboxPool || ndk.pool : ndk.pool
	const MAX_RELAYS = 20
	for (const url of relayUrls) {
		const normalizedUrl = normalizeRelayUrl(url)

		if (action === 'add' && pool.relays.size < MAX_RELAYS) {
			const relay = new NDKRelay(
				normalizedUrl,
				NDKRelayAuthPolicies.signIn({
					ndk,
					signer: ndk.signer
				}),
				ndk
			)
			pool.addRelay(relay, true)
		} else if (action === 'remove') {
			pool.removeRelay(normalizedUrl)
		}
	}
}

export const relayPoolManager = derived(
	[ndkStore, createActiveUserRelaysQuery],
	([$ndkStore, $relaysQuery]) => {
		if (!$ndkStore?.activeUser || !$relaysQuery.data) return
		const events = $relaysQuery.data
		const relayUrls = extractRelayUrls(events)

		events.forEach(async (event) => {
			console.log('foearch', event)
			const isOutboxEvent = event.kind === 10002
			await updateRelayPool($ndkStore, relayUrls, 'add', isOutboxEvent)
		})
	}
)
