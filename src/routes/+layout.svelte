<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/components/stores/ndk'
	import { queryClient } from '$lib/queries/client'
	import { createUserFollowsByIdQuery } from '$lib/queries/follows.query'
	import '../app.css'
	import { contactLoader } from '$lib/components/services/contact-loader'
	import Header from '$lib/components/header.svelte'

	let loadingProgress = contactLoader.getProgress()

	$: userFollows = $ndkStore.activeUser?.pubkey
		? createUserFollowsByIdQuery($ndkStore.activeUser!.pubkey)
		: undefined

	async function initializeUserData() {
		if ($userFollows?.data) {
			const contacts = Array.from($userFollows.data)
			await contactLoader.loadContacts(contacts)
		}
	}

	$: if ($userFollows?.data && $loadingProgress.loaded === 0) {
		initializeUserData()
	}

	$: if ($ndkStore.activeUser && window.location.pathname === '/login') {
		goto(`/p/${$ndkStore.activeUser.pubkey}`)
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
