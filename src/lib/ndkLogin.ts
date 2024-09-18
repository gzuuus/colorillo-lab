import ndkStore, { ndk } from '$lib'
import { NDKNip07Signer, NDKSubscriptionCacheUsage, NDKUser } from '@nostr-dev-kit/ndk'

export async function loginWithExtension(): Promise<boolean> {
	try {
		const signer = new NDKNip07Signer()
		console.log('Waiting for NIP-07 signer')
		await signer.blockUntilReady()
		ndk.signer = signer
		ndkStore.set(ndk)
		fetchActiveUserData()
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

	// if (keyToLocalDb) {
	// 	await loginLocalDb(user.pubkey, 'NSEC', keyToLocalDb)
	// } else {
	// 	await loginLocalDb(user.pubkey, 'NIP07')
	// }
	// invalidateAll()
	return user
}
