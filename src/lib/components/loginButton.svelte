<script lang="ts">
	import ndkStore from '$lib'
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'

	async function handleLogin() {
		console.log('hello')
		const loginResult = await loginWithExtension()
		if (!loginResult) {
			console.error('Login error!')
		}
	}
</script>

<Button on:click={handleLogin}>
	su
	{$ndkStore.activeUser ? 'Logout' : 'Login'}
</Button>
