<script lang="ts">
	import { Progress } from '$lib/components/ui/progress'

	export let stats: Map<
		number,
		{
			foundCount: number
			contactsWithEvents: number
			totalContacts: number
		}
	>
	export let kind: number
	export let total: number

	$: eventStats = stats.get(kind) || {
		foundCount: 0,
		contactsWithEvents: 0,
		totalContacts: 0
	}

	$: coveragePercentage = Math.round((eventStats.contactsWithEvents / total) * 100)
	$: missingContacts = total - eventStats.contactsWithEvents
</script>

<div class="space-y-2">
	<div class="flex justify-between text-sm">
		<span>Coverage: {coveragePercentage}%</span>
		<span class="text-muted-foreground">
			({eventStats.contactsWithEvents} contacts with events)
		</span>
	</div>

	<Progress value={coveragePercentage} max={100} class="w-full" />

	<div class="flex justify-between text-sm">
		<span class="text-muted-foreground">
			Missing: {missingContacts} contacts
		</span>
		<span class="text-muted-foreground">
			(Total events: {eventStats.foundCount})
		</span>
	</div>
</div>
