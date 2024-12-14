<script lang="ts">
	import ContactListVisualizer from '$lib/components/contactListVisualizer.svelte'
	import { createActiveUserProfileQuery } from '$lib/queries/activeUser.queries'
	import { getProfileName } from '$lib/utils/utils'
</script>

{#if $createActiveUserProfileQuery.isLoading}
	<p>Loading profile...</p>
{:else if $createActiveUserProfileQuery.isError}
	<p>Error loading profile</p>
{:else}
	<h1 class="text-3xl font-bold mb-6">
		{getProfileName($createActiveUserProfileQuery.data)}'s Contacts
	</h1>
	<ContactListVisualizer />
{/if}
