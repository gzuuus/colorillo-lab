<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import Header from '$lib/components/header.svelte'
	import '../app.css'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { isLoggedIn, fetchActiveUserData } from '$lib/ndkLogin'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/components/stores/ndk'

	const queryClient = new QueryClient()

	onMount(async () => {
		if (isLoggedIn()) {
			await fetchActiveUserData()
		}
	})

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
