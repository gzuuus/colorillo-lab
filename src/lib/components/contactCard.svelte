<script lang="ts">
	import { queryClient } from '$lib/queries/client'
	import { createProfileQuery, getProfileName, profileQueryKey } from '$lib/queries/follows.query'
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'

	export let color: string
	export let pubkey: string

	$: state = queryClient.getQueryState(profileQueryKey(pubkey))

	$: profileQuery =
		state?.errorUpdateCount && state.errorUpdateCount > 2 ? undefined : createProfileQuery(pubkey)
</script>

<div class="grid grid-cols-[48px,1fr] gap-4 items-center hover:bg-muted transition-colors p-4">
	<div class="h-12 w-12 rounded-full" style:background-color={color}></div>
	<div>
		{#if $profileQuery}
			{#if $profileQuery.isLoading}
				<h3 class="font-semibold">Loading...</h3>
			{:else if $profileQuery.isError}
				<h3 class="font-semibold">Error loading profile</h3>
			{:else}
				<h3 class="font-semibold">{getProfileName($profileQuery.data)}</h3>
				{#if $profileQuery.data?.displayName}
					<p class="text-sm text-muted-foreground">{$profileQuery.data.displayName}</p>
				{/if}
				<div class="text-xs text-muted-foreground">
					<p>Created: {formatDate($profileQuery.data?.created_at)}</p>
					<p>{formatRelativeTime($profileQuery.data?.created_at)}</p>
				</div>
			{/if}
		{:else}
			<h3 class="font-semibold">Couldn't load profile</h3>
		{/if}
		<p class="text-xs text-muted-foreground">{pubkey.slice(0, 8)}...</p>
	</div>
</div>
