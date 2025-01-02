import { queryKeys } from '$lib/queries/queryKeyFactory'
import type { NDKUserProfile } from '@nostr-dev-kit/ndk'
import type { QueryClient } from '@tanstack/svelte-query'
import { toast } from 'svelte-sonner'

export const getProfileName = (profile: NDKUserProfile | null | undefined): string =>
	profile?.name ||
	profile?.displayName ||
	profile?.nip05 ||
	(profile?.pubkey as string) ||
	'Unnamed user'

export function getTypedProfileQueryData(
	queryClient: QueryClient,
	pubkey: string
): NDKUserProfile | null | undefined {
	return queryClient.getQueryData<NDKUserProfile | null>(queryKeys.users.profile(pubkey))
}

export async function copyToClipboard(data: BlobPart | undefined, mimeType = 'text/plain') {
	if (!data) return
	try {
		if (navigator.clipboard.write) {
			await navigator.clipboard.write([
				new ClipboardItem({
					[mimeType]: new Blob([data], {
						type: mimeType
					}),
					['text/plain']: new Blob([data], {
						type: 'text/plain'
					})
				})
			])
		} else {
			await new Promise((resolve) => {
				resolve(navigator.clipboard.writeText(String(data)))
			})
		}
		toast.success('Copied 👍')
	} catch (e) {
		toast.error(`Error: ${e}`)
		console.log(e)
	}
}
