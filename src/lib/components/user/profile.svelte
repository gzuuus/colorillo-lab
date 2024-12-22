<script lang="ts">
	import { createActiveUserProfileQuery } from '$lib/queries/activeUser.queries'
	import { getProfileName } from '$lib/utils/utils'
	import { Card } from '$lib/components/ui/card'
	import { GlobeIcon, LinkIcon } from 'lucide-svelte'
	import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
</script>

{#if $createActiveUserProfileQuery.data}
	{@const userProfile = $createActiveUserProfileQuery.data}
	<div class="container mx-auto px-1">
		<div class="relative">
			{#if userProfile.banner}
				<div class="w-full h-32 sm:h-48 overflow-hidden rounded-t-lg">
					<img src={userProfile.banner} alt="Profile banner" class="w-full h-full object-cover" />
				</div>
			{/if}

			<div class="px-4">
				<div class="relative -mt-16 sm:-mt-20">
					<Avatar class="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background">
						<AvatarImage src={userProfile.image} alt={getProfileName(userProfile)} />
						<AvatarFallback>{getProfileName(userProfile)?.slice(0, 2).toUpperCase()}</AvatarFallback
						>
					</Avatar>
				</div>

				<div class="mt-4">
					<h1 class="text-2xl font-bold">
						{userProfile.displayName || getProfileName(userProfile)}
					</h1>
					{#if userProfile.name}
						<p class="text-muted-foreground">@{userProfile.name}</p>
					{/if}
				</div>
			</div>
		</div>

		<Card class="mt-6 p-6">
			{#if userProfile.bio || userProfile.about}
				<div class="mb-6">
					<p class="text-sm leading-relaxed">
						{userProfile.bio || userProfile.about}
					</p>
				</div>
			{/if}

			<div class="space-y-3">
				{#if userProfile.website}
					<div class="flex items-center gap-2 text-sm">
						<GlobeIcon class="w-4 h-4" />
						<a
							href={userProfile.website}
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							{userProfile.website}
						</a>
					</div>
				{/if}

				{#if userProfile.nip05}
					<div class="flex items-center gap-2 text-sm">
						<LinkIcon class="w-4 h-4" />
						<span>{userProfile.nip05}</span>
					</div>
				{/if}
			</div>
		</Card>
	</div>
{/if}
