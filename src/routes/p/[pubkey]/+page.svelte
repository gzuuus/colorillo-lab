<script lang="ts">
	import { page } from '$app/stores'
	import ContactListVisualizer from '$lib/components/contactListVisualizer.svelte'
	import { createProfileQuery, getProfileName } from '$lib/queries/follows.query'

	const pubkey = $page.params.pubkey
	$: profileQuery = createProfileQuery(pubkey)
</script>

{#if $profileQuery.isLoading}
	<p>Loading profile...</p>
{:else if $profileQuery.isError}
	<p>Error loading profile</p>
{:else}
	<h1 class="text-3xl font-bold mb-6">{getProfileName($profileQuery.data)}'s Contacts</h1>
	<ContactListVisualizer {pubkey} />
{/if}
