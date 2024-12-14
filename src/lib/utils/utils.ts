import { queryKeys } from '$lib/queries/queryKeyFactory'
import type { NDKUserProfile } from '@nostr-dev-kit/ndk'
import type { QueryClient } from '@tanstack/svelte-query'

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
