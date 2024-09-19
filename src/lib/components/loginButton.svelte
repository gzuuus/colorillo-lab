<!-- src/lib/components/loginButton.svelte -->
<script lang="ts">
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import { useQueryClient } from '@tanstack/svelte-query'
	import ndkStore from './stores/ndk'

	const queryClient = useQueryClient()

	async function handleAuth() {
		if ($ndkStore.activeUser) {
			// Implement logout functionality
			goto('/')
		} else {
			const loginResult = await loginWithExtension(queryClient)
			if (!loginResult) {
				console.error('Login error!')
			}
		}
	}
</script>

<Button on:click={handleAuth}>
	{$ndkStore.activeUser ? 'Logout' : 'Login'}
</Button>
