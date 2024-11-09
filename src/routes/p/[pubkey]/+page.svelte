<script lang="ts">
	import ContactListVisualizer from '$lib/components/contactListVisualizer.svelte'
	import { contactLoader } from '$lib/services/contact-loader'
	import { createActiveUserProfileQuery, getProfileName } from '$lib/queries/follows.query'

	let loadingProgress = contactLoader.getProgress()
</script>

{#if $createActiveUserProfileQuery.isLoading}
	<p>Loading profile...</p>
{:else if $createActiveUserProfileQuery.isError}
	<p>Error loading profile</p>
{:else}
	<h1 class="text-3xl font-bold mb-6">
		{getProfileName($createActiveUserProfileQuery.data)}'s Contacts
	</h1>
	{$loadingProgress.loaded} / {$loadingProgress.total}
	<ContactListVisualizer />
{/if}
