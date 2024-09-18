<script lang="ts">
	import ndkStore from '$lib'
	import Header from '$lib/components/header.svelte'
	import '../app.css'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
	<div class="min-h-screen bg-background">
		<Header />
		<main class="container mx-auto px-4 py-8">
			<slot />
		</main>
	</div>
</QueryClientProvider>
