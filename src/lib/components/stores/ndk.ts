import type { NDKCacheAdapter } from '@nostr-dev-kit/ndk'
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie'
import NDKSvelte from '@nostr-dev-kit/ndk-svelte'
import { writable } from 'svelte/store'

let cacheAdapter: NDKCacheAdapter | undefined = undefined
export const defaulRelaysUrls: string[] = [
	'wss://relay.nostr.band',
	'wss://nos.lol',
	'wss://relay.nostr.net',
	'wss://nostr.wine',
	'wss://purplepag.es'
]

if (typeof window !== 'undefined') {
	cacheAdapter = new NDKCacheAdapterDexie({
		dbName: 'colorillo.ndk.v0'
	})
}

export const relayBlackList: string[] = []

export const ndk: NDKSvelte = new NDKSvelte({
	explicitRelayUrls: defaulRelaysUrls,
	blacklistRelayUrls: relayBlackList,
	enableOutboxModel: true,
	cacheAdapter
})

ndk.connect().then(() => console.log('ndk connected successfully'))

const ndkStore = writable(ndk)

export default ndkStore
