<script lang="ts">
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import ndkStore from '../stores/ndk'

	async function handleAuth() {
		if ($ndkStore.activeUser) {
			$ndkStore.signer = undefined
			$ndkStore.activeUser = undefined
			goto('/')
		} else {
			const loginResult = await loginWithExtension()
			if (!loginResult) {
				console.error('Login error!')
			}
		}
	}
</script>

<Button on:click={handleAuth}>
	{$ndkStore.activeUser ? 'Logout' : 'Login'}
</Button>
