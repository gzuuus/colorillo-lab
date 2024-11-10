<script lang="ts">
	import { contactLoader } from '$lib/services/contact-loader'
	import { AlertCircle } from 'lucide-svelte'
	import { Progress } from './ui/progress'

	const progress = contactLoader.getProgress()
	export let progressPercentage = 0

	$: {
		progressPercentage =
			$progress.total > 0 ? Math.round(($progress.loaded / $progress.total) * 100) : 0
	}
</script>

{#if $progress.total > 0 && !$progress.isComplete}
	<div class="w-full p-4 rounded-lg bg-background/95">
		<div class=" inline-flex w-full items-center gap-2">
			<Progress value={progressPercentage} max={100} class="w-full h-1" />
			<span>{progressPercentage}%</span>
		</div>
		<div class="flex items-center justify-between text-sm">
			<span class="text-muted-foreground">
				Loading profiles {$progress.loaded}/{$progress.total}
			</span>

			{#if $progress.failed > 0}
				<div class="flex items-center gap-1 text-destructive">
					<AlertCircle class="h-4 w-4" />
					<span>{$progress.failed} failed</span>
				</div>
			{/if}
		</div>
		{#if $progress.isComplete}
			<p class="text-sm text-muted-foreground text-center">
				Completed loading {$progress.loaded} profiles
				{#if $progress.failed > 0}
					({$progress.failed} failed)
				{/if}
			</p>
		{/if}
	</div>
{/if}
