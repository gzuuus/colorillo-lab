# app.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

# app.d.ts

```ts
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
```

# app.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		--background: 0 0% 100%;
		--foreground: 222.2 84% 4.9%;

		--muted: 210 40% 96.1%;
		--muted-foreground: 215.4 16.3% 46.9%;

		--popover: 0 0% 100%;
		--popover-foreground: 222.2 84% 4.9%;

		--card: 0 0% 100%;
		--card-foreground: 222.2 84% 4.9%;

		--border: 214.3 31.8% 91.4%;
		--input: 214.3 31.8% 91.4%;

		--primary: 222.2 47.4% 11.2%;
		--primary-foreground: 210 40% 98%;

		--secondary: 210 40% 96.1%;
		--secondary-foreground: 222.2 47.4% 11.2%;

		--accent: 210 40% 96.1%;
		--accent-foreground: 222.2 47.4% 11.2%;

		--destructive: 0 72.2% 50.6%;
		--destructive-foreground: 210 40% 98%;

		--ring: 222.2 84% 4.9%;

		--radius: 0.5rem;
	}

	.dark {
		--background: 222.2 84% 4.9%;
		--foreground: 210 40% 98%;

		--muted: 217.2 32.6% 17.5%;
		--muted-foreground: 215 20.2% 65.1%;

		--popover: 222.2 84% 4.9%;
		--popover-foreground: 210 40% 98%;

		--card: 222.2 84% 4.9%;
		--card-foreground: 210 40% 98%;

		--border: 217.2 32.6% 17.5%;
		--input: 217.2 32.6% 17.5%;

		--primary: 210 40% 98%;
		--primary-foreground: 222.2 47.4% 11.2%;

		--secondary: 217.2 32.6% 17.5%;
		--secondary-foreground: 210 40% 98%;

		--accent: 217.2 32.6% 17.5%;
		--accent-foreground: 210 40% 98%;

		--destructive: 0 62.8% 30.6%;
		--destructive-foreground: 210 40% 98%;

		--ring: hsl(212.7, 26.8%, 83.9);
	}
}

@layer base {
	* {
		@apply border-border;
	}
	body {
		@apply bg-background text-foreground;
	}
}
```

# lib/utils.ts

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cubicOut } from 'svelte/easing'
import type { TransitionConfig } from 'svelte/transition'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

type FlyAndScaleParams = {
	y?: number
	x?: number
	start?: number
	duration?: number
}

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node)
	const transform = style.transform === 'none' ? '' : style.transform

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA
		const [minB, maxB] = scaleB

		const percentage = (valueA - minA) / (maxA - minA)
		const valueB = percentage * (maxB - minB) + minB

		return valueB
	}

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str
			return str + `${key}:${style[key]};`
		}, '')
	}

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0])
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0])
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1])

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			})
		},
		easing: cubicOut
	}
}
```

# lib/subs.ts

```ts
// import type { NDKEvent } from "@nostr-dev-kit/ndk"

import { derived } from 'svelte/store'

// type RelayAction = 'add' | 'remove'

// export async function manageUserRelays(userRelays: Set<NDKEvent>, action: RelayAction) {
// 	const handlers = Array.from(userRelays).map((event) => {
// 		const handler = eventKindActions.get(event.kind as number)
// 		return handler ? () => handler(event, action) : () => console.log('Unknown event kind:', event)
// 	})

// 	await Promise.all(handlers.map((handler) => handler()))
// }
```

# lib/ndkLogin.ts

```ts
// src/lib/ndkLogin.ts
import { NDKNip07Signer, NDKSubscriptionCacheUsage, NDKUser } from '@nostr-dev-kit/ndk'
import type { QueryClient } from '@tanstack/svelte-query'
import { followsQueryKey, profileQueryKey } from './queries/follows.query'
import { get } from 'svelte/store'
import ndkStore, { ndk } from './components/stores/ndk'

export async function loginWithExtension(queryClient: QueryClient): Promise<boolean> {
	try {
		const signer = new NDKNip07Signer()
		console.log('Waiting for NIP-07 signer')
		await signer.blockUntilReady()
		ndk.signer = signer
		ndkStore.set(ndk)
		const user = await fetchActiveUserData()
		if (user) {
			await prefetchProfiles(user.pubkey, queryClient)
		}
		return true
	} catch (e) {
		console.error(e)
		return false
	}
}

export async function fetchActiveUserData(): Promise<NDKUser | null> {
	if (!ndk.signer) return null
	console.log('Fetching profile')
	const user = await ndk.signer.user()
	await user.fetchProfile({ cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY })
	ndkStore.set(ndk)
	return user
}

async function prefetchProfiles(userId: string, queryClient: QueryClient) {
	const $ndkStore = get(ndkStore)

	// Prefetch user's follows
	await queryClient.prefetchQuery({
		queryKey: followsQueryKey(userId),
		queryFn: async () => {
			if (!$ndkStore.activeUser) return null
			return await $ndkStore.activeUser.follows()
		}
	})

	// Get the follows data
	const followsData = queryClient.getQueryData<Set<NDKUser> | null>(followsQueryKey(userId))

	if (followsData) {
		// Prefetch profiles for each followed user
		followsData.forEach((user) => {
			queryClient.prefetchQuery({
				queryKey: profileQueryKey(user.pubkey),
				queryFn: async () => {
					if (!$ndkStore.activeUser) return null
					return await $ndkStore.getUser({ pubkey: user.pubkey }).fetchProfile()
				}
			})
		})
	}
}

export function isLoggedIn(): boolean {
	return !!ndk.signer
}
```

# routes/+page.svelte

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/components/stores/ndk'

	function navigateToProfile() {
		if ($ndkStore.activeUser) {
			goto(`/p/${$ndkStore.activeUser.pubkey}`)
		} else {
			goto('/login')
		}
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-background">
	<h1 class="text-4xl font-bold mb-8 text-primary">Colorillo</h1>
	<p class="text-lg text-center mb-8 text-muted-foreground">Your colorful contact list manager</p>
	<Button on:click={navigateToProfile}>
		{$ndkStore.activeUser ? 'View Profile' : 'Get Started'}
	</Button>
</div>
```

# routes/+layout.svelte

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import Header from '$lib/components/header.svelte'
	import '../app.css'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { isLoggedIn, fetchActiveUserData } from '$lib/ndkLogin'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/components/stores/ndk'

	const queryClient = new QueryClient()

	onMount(async () => {
		if (isLoggedIn()) {
			await fetchActiveUserData()
		}
	})

	$: if ($ndkStore.activeUser && window.location.pathname === '/login') {
		goto(`/p/${$ndkStore.activeUser.pubkey}`)
	}
</script>

<QueryClientProvider client={queryClient}>
	<div class="min-h-screen bg-background">
		<Header />
		<main class="container mx-auto px-4 py-8">
			<slot />
		</main>
	</div>
</QueryClientProvider>
```

# lib/utils/queries.utils.ts

```ts
import type { CreateQueryResult } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export async function resolveQuery<T>(
	queryFn: () => CreateQueryResult<T, Error>,
	maxRetries?: number,
	retryDelay?: number
): Promise<T> {
	const queryPromise = queryFn()
	let retryCount = 0

	return new Promise((resolve, reject) => {
		const check = async () => {
			const currentQuery = get(queryPromise)
			if (currentQuery.isFetched && currentQuery.data !== undefined) {
				resolve(currentQuery.data)
			} else if (retryCount < (maxRetries ?? 10)) {
				retryCount++
				setTimeout(check, retryDelay ?? 250)
			} else {
				reject(new Error('Max retries exceeded'))
			}
		}
		check()
	})
}
```

# lib/queries/follows.query.ts

```ts
// src/lib/queries/follows.query.ts
import ndkStore from '$lib/components/stores/ndk'
import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk'
import { NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export const followsQueryKey = (userId: string) => ['follows', userId]
export const profileQueryKey = (pubkey: string) => ['profile', pubkey]

export const createUserFollowsByIdQuery = (userId: string) =>
	createQuery<Set<NDKUser> | null>({
		queryKey: followsQueryKey(userId),
		queryFn: async () => {
			const $ndkStore = get(ndkStore)
			if (!$ndkStore.activeUser) return null

			// First, try to get data from cache
			const cachedFollows = await $ndkStore.activeUser.follows({
				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
			})

			if (cachedFollows && cachedFollows.size > 0) {
				return cachedFollows
			}

			// If cache is empty or doesn't exist, fetch from relay
			return await $ndkStore.activeUser.follows()
		},
		staleTime: Infinity
	})

export const createProfileQuery = (pubkey: string) =>
	createQuery<NDKUserProfile | null>({
		queryKey: profileQueryKey(pubkey),
		queryFn: async () => {
			const $ndkStore = get(ndkStore)
			if (!$ndkStore.activeUser) return null

			const user = $ndkStore.getUser({ pubkey })

			// First, try to get profile from cache
			const cachedProfile = await user.fetchProfile({
				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
			})

			if (cachedProfile) {
				return cachedProfile
			}

			// If cache is empty or doesn't exist, fetch from relay
			return await user.fetchProfile()
		},
		staleTime: Infinity
	})

export const getProfileName = (profile: NDKUserProfile | null | undefined): string =>
	profile?.name || profile?.displayName || profile?.nip05 || 'Unnamed user'
```

# lib/components/renderProfile.svelte

```svelte
<script lang="ts">
	import { createProfileQuery, getProfileName } from '$lib/queries/follows.query'
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
```

# lib/components/loginButton.svelte

```svelte
<!-- src/lib/components/loginButton.svelte -->
<script lang="ts">
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import { useQueryClient } from '@tanstack/svelte-query'
	import ndkStore from './stores/ndk'

	const queryClient = useQueryClient()

	async function handleAuth() {
		if ($ndkStore.activeUser) {
			// Implement logout functionality
			goto('/')
		} else {
			const loginResult = await loginWithExtension(queryClient)
			if (!loginResult) {
				console.error('Login error!')
			}
		}
	}
</script>

<Button on:click={handleAuth}>
	{$ndkStore.activeUser ? 'Logout' : 'Login'}
</Button>
```

# lib/components/header.svelte

```svelte
<!-- src/lib/components/header.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import LoginButton from './loginButton.svelte'
	import ndkStore from './stores/ndk'

	function goToProfile() {
		if ($ndkStore.activeUser) {
			goto(`/p/${$ndkStore.activeUser.pubkey}`)
		}
	}
</script>

<header
	class="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 items-center justify-between">
		<div class="flex items-center space-x-4">
			<a class="flex items-center space-x-2" href="/">
				<span class="font-bold">Colorillo</span>
			</a>
			{#if $ndkStore.activeUser}
				<Button variant="ghost" on:click={goToProfile}>Profile</Button>
			{/if}
		</div>
		<LoginButton />
	</div>
</header>
```

# lib/components/contactCard.svelte

```svelte
<!-- ContactCard.svelte -->
<script lang="ts">
	import { createProfileQuery, getProfileName } from '$lib/queries/follows.query'

	export let color: string
	export let pubkey: string

	const profileQuery = createProfileQuery(pubkey)
</script>

<div
	class="grid grid-cols-[48px,1fr,auto] items-center hover:bg-muted transition-colors border-t first:border-t-0"
>
	<div class="h-16 w-full" style:background-color={color}></div>
	<div class="px-4 py-3">
		{#if $profileQuery.isLoading}
			<h3 class="font-semibold">Loading...</h3>
		{:else if $profileQuery.isError}
			<h3 class="font-semibold">Error loading profile</h3>
		{:else}
			<h3 class="font-semibold">{getProfileName($profileQuery.data)}</h3>
		{/if}
		<p class="text-sm text-muted-foreground">{pubkey.slice(0, 8)}...</p>
	</div>
	<div class="hidden md:block text-xs font-mono text-muted-foreground pr-4">{color}</div>
</div>
```

# lib/components/colorIndex.svelte

```svelte
<!-- src/lib/components/colorIndex.svelte -->
<script lang="ts">
	import { spring } from 'svelte/motion'
	import { onMount } from 'svelte'
	import RenderProfile from './renderProfile.svelte'

	export let colors: { color: string; pubkey: string }[]
	export let onColorClick: (index: number) => void

	let hoveredIndex = spring(0)
	let containerHeight: number
	let showMagnifiedView = false
	let colorPickerElement: HTMLElement
	let magnifiedViewElement: HTMLElement

	const visibleRange = 15

	$: itemHeight = containerHeight / colors.length
	$: magnifiedItemHeight = containerHeight / (visibleRange * 2 + 1)

	$: magnifiedItems = colors.slice(
		Math.max(0, Math.round($hoveredIndex) - visibleRange),
		Math.min(colors.length, Math.round($hoveredIndex) + visibleRange + 1)
	)

	function handleMouseMove(event: MouseEvent) {
		const { clientY } = event
		const { top } = (event.currentTarget as HTMLElement).getBoundingClientRect()
		const newHoveredIndex = (clientY - top) / itemHeight
		hoveredIndex.set(newHoveredIndex)
		showMagnifiedView = true
	}

	function handleColorClick(index: number) {
		onColorClick(index)
		colorPickerElement.scrollTop = index * itemHeight - containerHeight / 2 + itemHeight / 2
	}

	function handleMagnifiedViewClick(index: number) {
		const targetIndex = Math.round($hoveredIndex) - visibleRange + index
		handleColorClick(targetIndex)
	}

	function handleKeyDown(event: KeyboardEvent, index: number) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			handleColorClick(index)
		}
	}

	onMount(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				!colorPickerElement?.contains(event.target as Node) &&
				!magnifiedViewElement?.contains(event.target as Node)
			) {
				showMagnifiedView = false
			}
		}
		document.addEventListener('click', handleOutsideClick)
		return () => document.removeEventListener('click', handleOutsideClick)
	})
</script>

<div class="flex color-picker">
	<div
		bind:this={colorPickerElement}
		bind:clientHeight={containerHeight}
		class="w-8 flex flex-col relative cursor-pointer overflow-auto"
		on:mousemove={handleMouseMove}
		on:mouseleave={() => {
			if (!magnifiedViewElement?.matches(':hover') && !showMagnifiedView) showMagnifiedView = false
		}}
		role="listbox"
		aria-label="Color index"
		tabindex="0"
	>
		{#each colors as { color }, index (index)}
			<button
				role="option"
				aria-selected={Math.round($hoveredIndex) === index}
				class="w-full border-0 p-0 m-0"
				style:background-color={color}
				style:height="{itemHeight}px"
				on:click={() => handleColorClick(index)}
				on:keydown={(event) => handleKeyDown(event, index)}
			/>
		{/each}
	</div>

	{#if showMagnifiedView}
		<ul
			bind:this={magnifiedViewElement}
			class="w-48 flex flex-col list-none p-0 m-0"
			role="listbox"
			aria-label="Magnified color index"
			on:mouseleave={() => (showMagnifiedView = false)}
		>
			{#each magnifiedItems as { color, pubkey }, index (pubkey)}
				<li class="w-full flex items-center" style:height="{magnifiedItemHeight}px">
					<button
						role="option"
						aria-selected={Math.round($hoveredIndex) - Math.round($hoveredIndex - visibleRange) ===
							index}
						class="w-full h-full flex items-center border-0 p-0 m-0 bg-transparent"
						on:click={() => handleMagnifiedViewClick(index)}
						on:keydown={(event) => handleKeyDown(event, index)}
					>
						<div class="w-12 h-full" style:background-color={color}></div>
						<div class="ml-2 text-sm truncate">
							<RenderProfile {pubkey} />
						</div>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
```

# routes/login/+page.svelte

```svelte
<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation'
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import ndkStore from '$lib/components/stores/ndk'
	import { useQueryClient } from '@tanstack/svelte-query'
	const queryClient = useQueryClient()

	async function handleLogin() {
		const loginResult = await loginWithExtension(queryClient)
		if (loginResult && $ndkStore.activeUser) {
			goto(`/p/${$ndkStore.activeUser.pubkey}`)
		} else {
			// Handle login error
			console.error('Login failed')
		}
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-background">
	<h1 class="text-3xl font-bold mb-8">Login to Colorillo</h1>
	<Button on:click={handleLogin}>Login with Nostr Extension</Button>
</div>
```

# lib/components/stores/ndk.ts

```ts
import type { NDKCacheAdapter } from '@nostr-dev-kit/ndk'
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie'
import NDKSvelte from '@nostr-dev-kit/ndk-svelte'
import { writable } from 'svelte/store'

let cacheAdapter: NDKCacheAdapter | undefined = undefined
export const defaulRelaysUrls: string[] = [
	'wss://relay.nostr.band',
	'wss://nos.lol',
	'wss://relay.nostr.net'
]

if (typeof window !== 'undefined') {
	cacheAdapter = new NDKCacheAdapterDexie({
		dbName: 'colorillo.ndk.v0'
	})
}

export const relayBlackList: string[] = []

export const ndk: NDKSvelte = new NDKSvelte({
	explicitRelayUrls: defaulRelaysUrls,
	blacklistRelayUrls: relayBlackList,
	enableOutboxModel: true,
	autoConnectUserRelays: true,
	cacheAdapter
})

ndk.connect().then(() => console.log('ndk connected successfully'))

const ndkStore = writable(ndk)

export default ndkStore
```

# routes/p/[pubkey]/+page.svelte

```svelte
<!-- src/routes/p/[pubkey]/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores'
	import ColorIndex from '$lib/components/colorIndex.svelte'
	import ContactCard from '$lib/components/contactCard.svelte'
	import {
		createUserFollowsByIdQuery,
		createProfileQuery,
		getProfileName
	} from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import tinycolor from 'tinycolor2'
	import { derived, writable } from 'svelte/store'

	const pubkey = $page.params.pubkey
	let contactListElement: HTMLElement
	let currentColorIndex = writable(0)

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)
	$: profileQuery = createProfileQuery(pubkey)

	$: userColors = derived(userFollowsQuery, ($query) => {
		if (!$query.data) return []

		return sortColorsByHue(
			[...$query.data].map((user) => ({
				color: `#${user.pubkey.slice(0, 6)}`,
				pubkey: user.pubkey
			}))
		)
	})

	$: virtualizer = createVirtualizer({
		count: $userColors.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 80,
		overscan: 5
	})

	function sortColorsByHue(colors: { color: string; pubkey: string }[]): typeof colors {
		return colors.sort((a, b) => {
			const [{ h: hueA, v: brightnessA }, { h: hueB, v: brightnessB }] = [a.color, b.color].map(
				(c) => tinycolor(c).toHsv()
			)
			return hueA !== hueB ? hueA - hueB : brightnessA - brightnessB
		})
	}

	function scrollToContact(index: number) {
		$virtualizer.scrollToIndex(index)
		$currentColorIndex = index
	}
</script>

{#if $profileQuery.isLoading}
	<p>Loading profile...</p>
{:else if $profileQuery.isError}
	<p>Error loading profile</p>
{:else}
	<h1 class="text-3xl font-bold mb-6">{getProfileName($profileQuery.data)}'s Contacts</h1>

	{#if $userColors.length > 0}
		<div class="grid grid-cols-[auto,1fr] gap-2 h-[calc(100vh-100px)]">
			<ColorIndex colors={$userColors} onColorClick={scrollToContact} />
			<div class="relative border rounded-md overflow-hidden">
				<div class="overflow-y-auto h-[calc(100%-2rem)]" bind:this={contactListElement}>
					<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
						{#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
							<div
								class="absolute top-0 left-0 w-full"
								style="height: {virtualRow.size}px; transform: translateY({virtualRow.start}px);"
							>
								<ContactCard
									color={$userColors[virtualRow.index].color}
									pubkey={$userColors[virtualRow.index].pubkey}
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p class="text-muted-foreground">
			No contacts available. Add some friends to see their colorful profiles!
		</p>
	{/if}
{/if}
```

# lib/components/ui/card/index.ts

```ts
import Root from './card.svelte'
import Content from './card-content.svelte'
import Description from './card-description.svelte'
import Footer from './card-footer.svelte'
import Header from './card-header.svelte'
import Title from './card-title.svelte'

export {
	Root,
	Content,
	Description,
	Footer,
	Header,
	Title,
	//
	Root as Card,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle
}

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
```

# lib/components/ui/card/card.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLDivElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<div
	class={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)}
	{...$$restProps}
>
	<slot />
</div>
```

# lib/components/ui/card/card-title.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import type { HeadingLevel } from './index.js'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel
	}

	let className: $$Props['class'] = undefined
	export let tag: $$Props['tag'] = 'h3'
	export { className as class }
</script>

<svelte:element
	this={tag}
	class={cn('text-lg font-semibold leading-none tracking-tight', className)}
	{...$$restProps}
>
	<slot />
</svelte:element>
```

# lib/components/ui/card/card-header.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLDivElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<div class={cn('flex flex-col space-y-1.5 p-6', className)} {...$$restProps}>
	<slot />
</div>
```

# lib/components/ui/card/card-footer.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLDivElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<div class={cn('flex items-center p-6 pt-0', className)} {...$$restProps}>
	<slot />
</div>
```

# lib/components/ui/card/card-description.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLParagraphElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<p class={cn('text-muted-foreground text-sm', className)} {...$$restProps}>
	<slot />
</p>
```

# lib/components/ui/card/card-content.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLDivElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<div class={cn('p-6 pt-0', className)} {...$$restProps}>
	<slot />
</div>
```

# lib/components/ui/button/index.ts

```ts
import { type VariantProps, tv } from 'tailwind-variants'
import type { Button as ButtonPrimitive } from 'bits-ui'
import Root from './button.svelte'

const buttonVariants = tv({
	base: 'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/90',
			destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
			outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 hover:underline'
		},
		size: {
			default: 'h-10 px-4 py-2',
			sm: 'h-9 rounded-md px-3',
			lg: 'h-11 rounded-md px-8',
			icon: 'h-10 w-10'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
})

type Variant = VariantProps<typeof buttonVariants>['variant']
type Size = VariantProps<typeof buttonVariants>['size']

type Props = ButtonPrimitive.Props & {
	variant?: Variant
	size?: Size
}

type Events = ButtonPrimitive.Events

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants
}
```

# lib/components/ui/button/button.svelte

```svelte
<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui'
	import { type Events, type Props, buttonVariants } from './index.js'
	import { cn } from '$lib/utils.js'

	type $$Props = Props
	type $$Events = Events

	let className: $$Props['class'] = undefined
	export let variant: $$Props['variant'] = 'default'
	export let size: $$Props['size'] = 'default'
	export let builders: $$Props['builders'] = []
	export { className as class }
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</ButtonPrimitive.Root>
```
