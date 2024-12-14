<script lang="ts">
	import { createProfileQuery } from '$lib/queries/follows.query'
	import { getProfileName } from '$lib/utils/utils'
	export let pubkey: string
	const profileQuery = createProfileQuery(pubkey)
</script>

<div class="ml-2 text-sm truncate">
	{#if $profileQuery.isLoading}
		Loading...
	{:else if $profileQuery.isError}
		Error loading profile
	{:else}
		{getProfileName($profileQuery.data)}
	{/if}
</div>
