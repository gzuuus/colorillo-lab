<script lang="ts">
	import { createProfileQuery, getProfileName } from '$lib/queries/follows.query'
	import { formatDistanceToNow, format, fromUnixTime } from 'date-fns'

	export let color: string
	export let pubkey: string

	$: profileQuery = createProfileQuery(pubkey)

	function formatDate(timestamp: number | undefined): string {
		return timestamp ? format(fromUnixTime(timestamp), 'PPP') : 'Unknown'
	}

	function formatRelativeTime(timestamp: number | undefined): string {
		return timestamp ? formatDistanceToNow(fromUnixTime(timestamp), { addSuffix: true }) : 'Unknown'
	}
</script>

<div class="grid grid-cols-[48px,1fr] gap-4 items-center hover:bg-muted transition-colors p-4">
	<div class="h-12 w-12 rounded-full" style:background-color={color}></div>
	<div>
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
		<p class="text-xs text-muted-foreground">{pubkey.slice(0, 8)}...</p>
	</div>
</div>
