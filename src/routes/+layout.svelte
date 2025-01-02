<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/stores/ndk'
	import { queryClient } from '$lib/queries/client'
	import '../app.css'
	import { contactLoader } from '$lib/services/contact-loader'
	import Header from '$lib/components/header.svelte'
	import ProfileLoaderProgress from '$lib/components/profileLoaderProgress.svelte'
	import { relayPoolManager } from '$lib/utils/relay.utils'
	import { createActiveUserFollowsQuery } from '$lib/queries/activeUser.queries'
	import Drawer from '$lib/components/drawer.svelte'
	import { Toaster } from 'svelte-sonner'

	$: $relayPoolManager

	$: if ($createActiveUserFollowsQuery.data) {
		contactLoader.loadContacts(Array.from($createActiveUserFollowsQuery.data))
	}

	$: if ($ndkStore.activeUser && window.location.pathname === '/login') {
		goto(`/p/${$ndkStore.activeUser.pubkey}`)
	}
</script>

<Toaster richColors />
<QueryClientProvider client={queryClient}>
	<div class="min-h-screen bg-background">
		<Header />
		<main class="container mx-auto px-4 py-8">
			<ProfileLoaderProgress />
			<slot />
			<Drawer />
		</main>
	</div>
</QueryClientProvider>
