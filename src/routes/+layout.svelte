<script lang="ts">
	import Header from '$lib/components/header.svelte'
	import '../app.css'
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/components/stores/ndk'

	import { queryClient } from '$lib/queries/client'
	import { get } from 'svelte/store'
	import { resolveQuery } from '$lib/utils/queries.utils'
	import { createProfileQuery, createUserFollowsByIdQuery, getProfileName } from '$lib/queries/follows.query'

	$: if ($ndkStore.activeUser && window.location.pathname === '/login') {
		goto(`/p/${$ndkStore.activeUser.pubkey}`)
	}

	$: userFollows = $ndkStore.activeUser?.pubkey ? createUserFollowsByIdQuery($ndkStore.activeUser!.pubkey) : undefined
	// TODO: improve follow list discoverability
	$: if (userFollows) console.log($userFollows?.data)
	// $: if ($ndkStore.activeUser?.pubkey) initializeUserData()

	// async function initializeUserData() {
	// 	console.log('Initializing user data')
	// 	const follows = await resolveQuery(() =>
	// 		createUserFollowsByIdQuery($ndkStore.activeUser!.pubkey)
	// 	)

	// 	if (follows) {
	// 		for (const user of follows) {
	// 			get(createProfileQuery(user.pubkey))
	// 		}
	// 	}
	// }
	async function initializeUserData() {
		for (const follow of $userFollows?.data!) {
			console.log("Initializing q for", follow.pubkey)
			const followProfile = await resolveQuery(() => createProfileQuery(follow.pubkey))
			console.log("Profile for", getProfileName(followProfile))
		}
	}
	$: if ($userFollows?.data) {
		initializeUserData()
	}
</script>

<QueryClientProvider client={queryClient}>
	<div class="min-h-screen bg-background">
		<Header />
		<main class="container mx-auto px-4 py-8">
			<slot />
		</main>
	</div>
</QueryClientProvider>
