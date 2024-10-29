// src/lib/ndkLogin.ts
import { NDKNip07Signer, NDKSubscriptionCacheUsage, NDKUser } from '@nostr-dev-kit/ndk'
import ndkStore, { ndk } from './components/stores/ndk'

export async function loginWithExtension(): Promise<boolean> {
	try {
		const signer = new NDKNip07Signer()
		console.log('Waiting for NIP-07 signer')
		await signer.blockUntilReady()
		ndk.signer = signer
		ndkStore.set(ndk)
		await fetchActiveUserData()
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

export function isLoggedIn(): boolean {
	return !!ndk.signer
}
