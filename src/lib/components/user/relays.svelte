<script lang="ts">
	import { createActiveUserRelaysQuery } from '$lib/queries/activeUser.queries'
	import RenderRelays from '../nostr-events/renderRelays.svelte'
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 w-full max-w-screen-md">
	{#if $createActiveUserRelaysQuery.data}
		{#each $createActiveUserRelaysQuery.data as event}
			<RenderRelays relayEvent={event} />
		{/each}
	{/if}
</div>
