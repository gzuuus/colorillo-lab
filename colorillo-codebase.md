# .gitignore

```
node_modules

# Output
.output
.vercel
/.svelte-kit
/build

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.*
!.env.example
!.env.test

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

```

# .npmrc

```
engine-strict=true

```

# .prettierignore

```
# Package Managers
package-lock.json
pnpm-lock.yaml
yarn.lock

```

# .prettierrc

```
{
	"useTabs": true,
	"singleQuote": true,
	"semi": false,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-tailwindcss", "prettier-plugin-svelte"],
	"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}

```

# colorillo-codebase.md

```md
# .gitignore

\`\`\`
node_modules

# Output

.output
.vercel
/.svelte-kit
/build

# OS

.DS_Store
Thumbs.db

# Env

.env
.env.\*
!.env.example
!.env.test

# Vite

vite.config.js.timestamp-_
vite.config.ts.timestamp-_

\`\`\`

# .npmrc

\`\`\`
engine-strict=true

\`\`\`

# .prettierignore

\`\`\`

# Package Managers

package-lock.json
pnpm-lock.yaml
yarn.lock

\`\`\`

# .prettierrc

\`\`\`
{
"useTabs": true,
"singleQuote": true,
"semi": false,
"trailingComma": "none",
"printWidth": 100,
"plugins": ["prettier-plugin-tailwindcss", "prettier-plugin-svelte"],
"overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}

\`\`\`

# components.json

\`\`\`json
{
"$schema": "https://shadcn-svelte.com/schema.json",
	"style": "default",
	"tailwind": {
		"config": "tailwind.config.js",
		"css": "src/app.css",
		"baseColor": "slate"
	},
	"aliases": {
		"components": "$lib/components",
"utils": "$lib/utils"
},
"typescript": true
}

\`\`\`

# eslint.config.js

\`\`\`js
import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} \*/
export default [
js.configs.recommended,
...ts.configs.recommended,
...svelte.configs['flat/recommended'],
prettier,
...svelte.configs['flat/prettier'],
{
languageOptions: {
globals: {
...globals.browser,
...globals.node
}
}
},
{
files: ['**/\*.svelte'],
languageOptions: {
parserOptions: {
parser: ts.parser
}
}
},
{
ignores: ['build/', '.svelte-kit/', 'dist/']
}
]

\`\`\`

# package.json

\`\`\`json
{
"name": "colorillo-lab",
"version": "0.0.1",
"private": true,
"scripts": {
"dev": "vite dev",
"build": "vite build",
"preview": "vite preview",
"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
"lint": "prettier --check . && eslint .",
"format": "prettier --write ."
},
"devDependencies": {
"@sveltejs/adapter-auto": "^3.0.0",
"@sveltejs/kit": "^2.0.0",
"@sveltejs/vite-plugin-svelte": "^3.0.0",
"@types/eslint": "^9.6.0",
"@types/tinycolor2": "^1.4.6",
"autoprefixer": "^10.4.20",
"eslint": "^9.0.0",
"eslint-config-prettier": "^9.1.0",
"eslint-plugin-svelte": "^2.36.0",
"globals": "^15.0.0",
"postcss": "^8.4.47",
"prettier": "^3.1.1",
"prettier-plugin-svelte": "^3.1.2",
"svelte": "^4.2.7",
"svelte-check": "^4.0.0",
"tailwindcss": "^3.4.11",
"typescript": "^5.0.0",
"typescript-eslint": "^8.0.0",
"vite": "^5.0.3"
},
"type": "module",
"dependencies": {
"@nostr-dev-kit/ndk": "^2.10.0",
"@nostr-dev-kit/ndk-cache-dexie": "^2.5.1",
"@nostr-dev-kit/ndk-svelte": "^2.2.18",
"@tanstack/svelte-query": "^5.56.2",
"@tanstack/svelte-table": "^8.20.5",
"@tanstack/svelte-virtual": "^3.10.8",
"bits-ui": "^0.21.13",
"clsx": "^2.1.1",
"cmdk-sv": "^0.0.18",
"date-fns": "^4.1.0",
"dexie": "^4.0.8",
"lucide-svelte": "^0.446.0",
"prettier-plugin-tailwindcss": "^0.6.6",
"tailwind-merge": "^2.5.2",
"tailwind-variants": "^0.2.1",
"tinycolor2": "^1.6.0"
}
}

\`\`\`

# postcss.config.js

\`\`\`js
export default {
plugins: {
tailwindcss: {},
autoprefixer: {}
}
}

\`\`\`

# README.md

\`\`\`md

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

\`\`\`bash

# create a new project in the current directory

npm create svelte@latest

# create a new project in my-app

npm create svelte@latest my-app
\`\`\`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

\`\`\`bash
npm run dev

# or start the server and open the app in a new browser tab

npm run dev -- --open
\`\`\`

## Building

To create a production version of your app:

\`\`\`bash
npm run build
\`\`\`

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

\`\`\`

# src/app.css

\`\`\`css
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

@layer base { \* {
@apply border-border;
}
body {
@apply bg-background text-foreground;
}
}

\`\`\`

# src/app.d.ts

\`\`\`ts
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

\`\`\`

# src/app.html

\`\`\`html

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

\`\`\`

# src/lib/components/colorIndex.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/colorIndexView.svelte

\`\`\`svelte

<script lang="ts">
	import ColorIndex from './colorIndex.svelte'
	import ContactCard from './contactCard.svelte'
	import { createUserFollowsByIdQuery } from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import tinycolor from 'tinycolor2'
	import { derived, writable } from 'svelte/store'

	export let pubkey: string
	let contactListElement: HTMLElement
	let currentColorIndex = writable(0)

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)

	$: userColors = derived(userFollowsQuery, ($query) => {
		if (!$query.data) return []

		return sortColorsByHue(
			[...$query.data].map((user) => ({
				color: `#${user.pubkey.slice(0, 6)}`,
				pubkey: user.pubkey,
				created_at: user.profile?.created_at!
			}))
		)
	})

	$: virtualizer = createVirtualizer({
		count: $userColors.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 90,
		overscan: 5
	})

	function sortColorsByHue(
		colors: { color: string; pubkey: string; created_at: number }[]
	): typeof colors {
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

{#if $userFollowsQuery.data}
	Contacts length: {$userFollowsQuery.data.size}
{/if}

<div class="grid grid-cols-[auto,1fr] gap-2 h-[calc(100vh-200px)]">
	<ColorIndex colors={$userColors} onColorClick={scrollToContact} />
	<div class="relative border rounded-md overflow-hidden">
		<div class="overflow-y-auto h-full" bind:this={contactListElement}>
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

\`\`\`

# src/lib/components/contactCard.svelte

\`\`\`svelte

<script lang="ts">
	import { queryClient } from '$lib/queries/client'
	import { createProfileQuery, getProfileName, profileQueryKey } from '$lib/queries/follows.query'
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'

	export let color: string
	export let pubkey: string

	// $: state = queryClient.getQueryState(profileQueryKey(pubkey))

	$: profileQuery = createProfileQuery(pubkey)
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

\`\`\`

# src/lib/components/contactListVisualizer.svelte

\`\`\`svelte

<!-- src/lib/components/contactListVisualizer.svelte -->
<script lang="ts">
	import { writable } from 'svelte/store'
	import { Button } from '$lib/components/ui/button'
	import ColorIndexView from './colorIndexView.svelte'
	import DateSortedView from './dateSortedView.svelte'
	import ProfileActivityView from './profileActivityView.svelte'

	export let pubkey: string

	enum VisualizationType {
		ColorIndex = 'Color Index',
		DateSorted = 'Date Sorted',
		ProfileActivity = 'Profile Activity'
	}

	const currentVisualization = writable<VisualizationType>(VisualizationType.ColorIndex)

	const visualizations = [
		{ type: VisualizationType.ColorIndex, component: ColorIndexView },
		{ type: VisualizationType.DateSorted, component: DateSortedView },
		{ type: VisualizationType.ProfileActivity, component: ProfileActivityView }
	]

	function switchVisualization(type: VisualizationType) {
		currentVisualization.set(type)
	}
</script>

<div class="mb-4">
	{#each visualizations as viz}
		<Button
			variant={$currentVisualization === viz.type ? 'default' : 'outline'}
			on:click={() => switchVisualization(viz.type)}
			class="mr-2"
		>
			{viz.type}
		</Button>
	{/each}
</div>

<div>
	{#each visualizations as viz}
		{#if $currentVisualization === viz.type}
			<svelte:component this={viz.component} {pubkey} />
		{/if}
	{/each}
</div>

\`\`\`

# src/lib/components/dateSortedView.svelte

\`\`\`svelte

<script lang="ts">
	import ContactCard from './contactCard.svelte'
	import { createUserFollowsByIdQuery, getTypedProfileQueryData } from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import { writable } from 'svelte/store'
	import { Button } from '$lib/components/ui/button'
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type SortingState,
		type Updater
	} from '@tanstack/svelte-table'
	import type { NDKUser } from '@nostr-dev-kit/ndk'
	import { queryClient } from '$lib/queries/client'

	export let pubkey: string
	let contactListElement: HTMLElement

	let sorting: SortingState = []

	function setSorting(updater: Updater<SortingState>) {
		if (updater instanceof Function) sorting = updater(sorting)
		else sorting = updater

		tableOptions.update((opts) => ({
			...opts,
			state: {
				...opts.state,
				sorting
			}
		}))
	}

	const columns: ColumnDef<NDKUser>[] = [
		{
			accessorKey: 'pubkey',
			header: 'Public Key'
		},
		{
			accessorFn: (row) => {
				const profile = getTypedProfileQueryData(queryClient, row.pubkey)
				return profile?.created_at || 0
			},
			id: 'created_at',
			header: 'Created At'
		}
	]

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)

	$: tableOptions = writable({
		data: Array.from($userFollowsQuery.data || []),
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	})

	$: table = createSvelteTable(tableOptions)

	$: rows = $table.getRowModel().rows

	$: virtualizer = createVirtualizer({
		count: rows.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 100,
		overscan: 5
	})

	$: sortOrder = sorting[0]?.desc ? 'desc' : 'asc'
	$: sortBy = sorting[0]?.id || 'created_at'

	function toggleSortOrder() {
		setSorting((old) =>
			old[0]?.desc ? [{ id: sortBy, desc: false }] : [{ id: sortBy, desc: true }]
		)
	}

	function toggleSortBy() {
		const newSortBy = sortBy === 'created_at' ? 'pubkey' : 'created_at'
		setSorting([{ id: newSortBy, desc: sortOrder === 'desc' }])
	}
</script>

<div class="mb-4 flex space-x-2">
	<Button on:click={toggleSortBy} variant="outline">
		Sort by: {sortBy === 'created_at' ? 'Creation Date' : 'Public Key'}
	</Button>
	<Button on:click={toggleSortOrder} variant="outline">
		Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
	</Button>
</div>

<div class="border rounded-md overflow-hidden h-[calc(100vh-250px)]">
	<div class="overflow-y-auto h-full" bind:this={contactListElement}>
		<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
			{#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
				{#if rows[virtualRow.index]}
					<div
						class="absolute top-0 left-0 w-full"
						style="height: {virtualRow.size}px; transform: translateY({virtualRow.start}px);"
					>
						<ContactCard
							color={`#${rows[virtualRow.index].original.pubkey.slice(0, 6)}`}
							pubkey={rows[virtualRow.index].original.pubkey}
						/>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

\`\`\`

# src/lib/components/eventVisualizer.svelte

\`\`\`svelte

<!-- EventVisualizer.svelte -->
<script lang="ts">
    import { formatDate, formatRelativeTime } from '$lib/utils/date.utils';
    import { NDKKind } from '@nostr-dev-kit/ndk';
    import type { PubkeyEventEntry } from './stores/appDb';
    import { Badge } from '$lib/components/ui/badge';
    import { Card, CardContent, CardFooter } from '$lib/components/ui/card';
  
    export let event: PubkeyEventEntry | undefined;
  
  </script>

  <Card>
    <CardContent>
      <h3 class="text-lg font-semibold">
        {event ? NDKKind[event.kind] || `Kind ${event.kind}` : 'Unknown Event'}
      </h3>
      <!-- <p>{NDKKind(event)}</p> -->
    </CardContent>
    <CardFooter class="text-sm text-muted-foreground">
      {#if event}
        <Badge variant="outline" class="mr-2">{formatRelativeTime(event.createdAt)}</Badge>
        <span>{formatDate(event.createdAt)}</span>
      {/if}
    </CardFooter>
  </Card>
\`\`\`

# src/lib/components/header.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/latestNote.svelte

\`\`\`svelte

<!-- src/lib/components/LatestNote.svelte -->
<script lang="ts">
	import { NDKKind } from '@nostr-dev-kit/ndk'
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'
	import type { PubkeyEventEntry } from './stores/appDb'

	export let event: PubkeyEventEntry
</script>

{#if event}
<div class="text-sm truncate">{event.kind}: {NDKKind[event.kind]}</div>
<div class="text-xs text-muted-foreground">
<p>Created: {formatDate(event?.createdAt)}</p>
<p>{formatRelativeTime(event?.createdAt)}</p>
</div>
{:else}
<div class="text-sm text-muted-foreground">No notes found</div>
{/if}

\`\`\`

# src/lib/components/loginButton.svelte

\`\`\`svelte

<!-- src/lib/components/loginButton.svelte -->
<script lang="ts">
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import ndkStore from './stores/ndk'

	async function handleAuth() {
		if ($ndkStore.activeUser) {
			// Implement logout functionality
			goto('/')
		} else {
			const loginResult = await loginWithExtension()
			if (!loginResult) {
				console.error('Login error!')
			}
		}
	}
</script>

<Button on:click={handleAuth}>
	{$ndkStore.activeUser ? 'Logout' : 'Login'}
</Button>

\`\`\`

# src/lib/components/profileActivityView.svelte

\`\`\`svelte

<script lang="ts">
  import { createUserFollowsByIdQuery } from '$lib/queries/follows.query';
  import { latestEventsStore } from './services/notesService';
  import ndkStore from './stores/ndk';
  import ContactCard from './contactCard.svelte';
  import { Button } from '$lib/components/ui/button';
  import { NDKKind } from '@nostr-dev-kit/ndk';
  import * as Popover from '$lib/components/ui/popover';
  import * as Command from '$lib/components/ui/command';
  import EventVisualizer from './eventVisualizer.svelte'
  import { debounce } from '$lib/utils';

  export let pubkey: string;
  
  $: userFollowsQuery = createUserFollowsByIdQuery(pubkey);

  $: if ($userFollowsQuery.data) {
    const pubkeys = [...$userFollowsQuery.data].map(follow => follow.pubkey);
    console.log("pub length", pubkeys.length);
    latestEventsStore.fetchLatestEvents(pubkeys);
  }

  let autoFetch = false;
  let localTargetKinds = $latestEventsStore.targetKinds;
  let selectedKinds: number[] = [];
  let isSelectionMode = false;

  const debouncedUpdateTargetKinds = debounce((kinds: number[]) => {
    latestEventsStore.updateTargetKinds(kinds);
  }, 300);

  async function fetchRemainingEvents() {
    const shouldContinue = await latestEventsStore.fetchRemainingEvents($ndkStore);
    if (!shouldContinue) {
      autoFetch = false;
    }
  }

  function toggleAutoFetch() {
    autoFetch = !autoFetch;
    if (autoFetch && $latestEventsStore.remainingCount > 0 && $latestEventsStore.fetchingStatus === 'idle') {
      fetchRemainingEvents();
    }
  }

  $: if (autoFetch && $latestEventsStore.fetchingStatus === 'idle' && $latestEventsStore.remainingCount > 0) {
    fetchRemainingEvents();
  }

  function toggleSelectionMode() {
    isSelectionMode = !isSelectionMode;
    selectedKinds = [];
  }

  function toggleKindSelection(kind: number) {
    if (selectedKinds.includes(kind)) {
      selectedKinds = selectedKinds.filter(k => k !== kind);
    } else {
      selectedKinds = [...selectedKinds, kind];
    }
  }

  function removeSelectedKinds() {
    if ($latestEventsStore.fetchingStatus === 'idle') {
      localTargetKinds = localTargetKinds.filter(kind => !selectedKinds.includes(kind));
      debouncedUpdateTargetKinds(localTargetKinds);
      selectedKinds = [];
    }
  }

  function addKind(kind: number) {
    if ($latestEventsStore.fetchingStatus === 'idle') {
      localTargetKinds = [...localTargetKinds, kind];
      debouncedUpdateTargetKinds(localTargetKinds);
    }
  }
  function removeKind(kind: number) {
    if ($latestEventsStore.fetchingStatus === 'idle') {
      localTargetKinds = localTargetKinds.filter(k => k !== kind);
      debouncedUpdateTargetKinds(localTargetKinds);
    }
  }

  const kindOptions = Object.entries(NDKKind)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({ label: key, value: value as number }));

  $: isFetching = $latestEventsStore.fetchingStatus === 'fetching';
</script>

<div class="space-y-4">
  <div>
    <h3 class="text-lg font-semibold mb-2">Target Event Kinds</h3>
    <div class="flex flex-wrap gap-2 mb-2">
      {#each localTargetKinds as kind}
      <Button 
        variant={isSelectionMode && selectedKinds.includes(kind) ? "secondary" : "outline"}
        size="sm" 
        on:click={() => isSelectionMode ? toggleKindSelection(kind) : null}
        disabled={isFetching}
      >
          {NDKKind[kind] || `Kind ${kind}`}
          {#if !isSelectionMode}
            <span class="ml-2 cursor-pointer" on:click|stopPropagation={() => removeKind  (kind)}>×</span>
          {/if}
      </Button>
      {/each}
    </div>
    <div class="flex gap-2 mb-2">
      <Button
        variant={isSelectionMode ? "secondary" : "outline"}
        size="sm"
        on:click={toggleSelectionMode}
        disabled={isFetching}
      >
        {isSelectionMode ? 'Exit Selection Mode' : 'Enter Selection Mode'}
      </Button>
      {#if isSelectionMode}
        <Button
          variant="destructive"
          size="sm"
          on:click={removeSelectedKinds}
          disabled={isFetching || selectedKinds.length === 0}
        >
          Remove Selected ({selectedKinds.length})
        </Button>
      {/if}
    </div>
    <Popover.Root let:ids>
      <Popover.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          role="combobox"
          class="w-[200px] justify-between"
          disabled={isFetching}
        >
          Add Kinds
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-[250px] p-0">
        <Command.Root>
          <Command.Input placeholder="Search kind..." />
          <Command.Empty>No kind found.</Command.Empty>
          <Command.Group>
            {#each kindOptions as option}
              <Command.Item
                value={`${option.value} ${option.label}`}
                onSelect={() => {
                  if (!isFetching && !localTargetKinds.includes(option.value)) {
                    addKind(option.value);
                  }
                }}
                disabled={isFetching || localTargetKinds.includes(option.value)}
              >
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center gap-2">
                    {#if localTargetKinds.includes(option.value)}
                      <span class="text-green-500">✓</span>
                    {/if}
                    <span class="font-semibold">{option.value}</span>
                    <span class="text-sm text-gray-600">{option.label}</span>
                  </div>
                </div>
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  </div>

  <div>
    <p>Remaining pubkeys without events: {$latestEventsStore.remainingCount}</p>
    <div class="flex gap-2">
      <Button 
        on:click={fetchRemainingEvents} 
        disabled={isFetching || autoFetch || localTargetKinds.length === 0}
      >
        {isFetching ? 'Fetching...' : 'Fetch Remaining'}
      </Button>
      <Button 
        variant={autoFetch ? "destructive" : "secondary"} 
        on:click={toggleAutoFetch}
        disabled={ localTargetKinds.length === 0 || autoFetch }
      >
        {autoFetch ? 'Stop Auto Fetch' : 'Start Auto Fetch'}
      </Button>
    </div>
  </div>

{#if $userFollowsQuery.data}
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each $userFollowsQuery.data as { pubkey }}
        <div class="space-y-2">
          <ContactCard color={`#${pubkey.slice(0, 6)}`} {pubkey} />
<EventVisualizer event={$latestEventsStore.events.get(pubkey)} />
</div>
{/each}
</div>
{/if}

</div>
\`\`\`

# src/lib/components/renderProfile.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/services/notesService.ts

\`\`\`ts
// stores/latestEvents.ts
import { writable, derived, get } from 'svelte/store';
import { liveQuery } from 'dexie';
import type NDK from '@nostr-dev-kit/ndk';
import { getLatestEventPerPubkeyAndKind, pubkeyEventDB, type PubkeyEventEntry } from '../stores/appDb';
import { NDKKind } from '@nostr-dev-kit/ndk';
const enumValues = Object.values(NDKKind).filter(value => typeof value === 'number') as number[];

function createLatestEventsStore() {
const events = writable<Map<string, PubkeyEventEntry>>(new Map());
const pendingPubkeys = writable<Set<string>>(new Set());
const targetKinds = writable<number[]>(enumValues.slice(0, 15));
const remainingCount = derived(pendingPubkeys, $pendingPubkeys => $pendingPubkeys.size);
const fetchingStatus = writable<'idle' | 'fetching' | 'complete'>('idle');

    function fetchLatestEvents(pubkeys: string[]) {
        const query = liveQuery(() =>
            getLatestEventPerPubkeyAndKind(pubkeys, get(targetKinds))
        );
        query.subscribe((latestEvents) => {
            events.set(latestEvents);
            const missingPubkeys = new Set(pubkeys.filter(pk => !latestEvents.has(pk)));
            pendingPubkeys.set(missingPubkeys);
        });
    }


    function updateTargetKinds(newKinds: number[]) {
        targetKinds.set(newKinds);
        const currentPubkeys = Array.from(get(events).keys());
        fetchLatestEvents(currentPubkeys);
    }

    async function fetchRemainingEvents(ndk: NDK): Promise<boolean> {
        const currentPendingPubkeys = get(pendingPubkeys);
        const currentTargetKinds = get(targetKinds);

        if (currentPendingPubkeys.size === 0) {
            fetchingStatus.set('complete');
            return false;
        }

        fetchingStatus.set('fetching');

        const fetchedEvents = await ndk.fetchEvents({
            kinds: currentTargetKinds,
            authors: Array.from(currentPendingPubkeys),
            limit: 100
        });

        console.log(fetchedEvents.size, 'fetched events');

        if (fetchedEvents.size === 0) {
            fetchingStatus.set('complete');
            return false;
        }

        const newEntries: PubkeyEventEntry[] = Array.from(fetchedEvents).map(event => ({
            pubkey: event.pubkey,
            eventId: event.id,
            kind: event.kind!,
            createdAt: event.created_at!,
            content: event.content
        }));

        await pubkeyEventDB.pubkeyEvents.bulkPut(newEntries);

        events.update(map => {
            newEntries.forEach(entry => {
                const existingEntry = map.get(entry.pubkey);
                if (!existingEntry || entry.createdAt > existingEntry.createdAt) {
                    map.set(entry.pubkey, entry);
                }
            });
            return map;
        });

        pendingPubkeys.update(set => {
            newEntries.forEach(entry => set.delete(entry.pubkey));
            return set;
        });

        fetchingStatus.set('idle');
        return true;
    }

    const store = {
        subscribe: derived(
            [events, remainingCount, targetKinds, fetchingStatus],
            ([$events, $remainingCount, $targetKinds, $fetchingStatus]) => ({
                events: $events,
                remainingCount: $remainingCount,
                targetKinds: $targetKinds,
                fetchingStatus: $fetchingStatus
            })
        ).subscribe,
        fetchLatestEvents,
        fetchRemainingEvents,
        updateTargetKinds
    };

    return store;

}

export const latestEventsStore = createLatestEventsStore();
\`\`\`

# src/lib/components/stores/appDb.ts

\`\`\`ts
// appDb.ts
import { db as ndkDb } from '@nostr-dev-kit/ndk-cache-dexie';
import Dexie from 'dexie';

export interface PubkeyEventEntry {
pubkey: string;
eventId: string;
kind: number;
createdAt: number;
content: string;
}

export class PubkeyEventDB extends Dexie {
pubkeyEvents!: Dexie.Table<PubkeyEventEntry, string>;

    constructor() {
        super('PubkeyEventDatabase');
        this.version(1).stores({
            pubkeyEvents: 'eventId, pubkey, kind, createdAt, [pubkey+kind]'
        });
    }

}

export const pubkeyEventDB = new PubkeyEventDB();

export async function syncWithNDKDb(): Promise<void> {
const allEvents = await ndkDb.events.toArray();
await pubkeyEventDB.pubkeyEvents.bulkPut(
allEvents.map((event) => ({
pubkey: event.pubkey,
eventId: event.id,
kind: event.kind,
createdAt: event.createdAt,
content: event.event
}))
);
}

export async function getLatestEventPerPubkey(pubkeys: string[]) {
return pubkeyEventDB.pubkeyEvents
.where('pubkey')
.anyOf(pubkeys)
.toArray()
.then((events) => {
const latestEvents = new Map<string, PubkeyEventEntry>();
events.forEach((event) => {
const existingEvent = latestEvents.get(event.pubkey);
if (!existingEvent || event.createdAt > existingEvent.createdAt) {
latestEvents.set(event.pubkey, event);
}
});
return latestEvents;
});
}

export async function getLatestEventPerPubkeyAndKind(pubkeys: string[], kinds: number[] = [0, 3]) {
return pubkeyEventDB.pubkeyEvents
.where('pubkey')  
 .anyOf(pubkeys)
.and(event => kinds.includes(event.kind))
.toArray()
.then((events) => {
const latestEvents = new Map<string, PubkeyEventEntry>();
events.forEach((event) => {
const existingEvent = latestEvents.get(event.pubkey);
if (!existingEvent || event.createdAt > existingEvent.createdAt) {
latestEvents.set(event.pubkey, event);
}
});
return latestEvents;
});
}
\`\`\`

# src/lib/components/stores/ndk.ts

\`\`\`ts
import type { NDKCacheAdapter } from '@nostr-dev-kit/ndk'
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie'
import NDKSvelte from '@nostr-dev-kit/ndk-svelte'
import { writable } from 'svelte/store'

let cacheAdapter: NDKCacheAdapter | undefined = undefined
export const defaulRelaysUrls: string[] = [
// 'wss://nos.lol',
// 'wss://relay.nostr.net',
// 'wss://nostr.wine',
'wss://purplepag.es',
// 'wss://relay.damus.io'
'wss://nostrelites.org'
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
outboxRelayUrls: ['wss://purplepag.es', 'wss://relay.nos.social'],
enableOutboxModel: true,
autoConnectUserRelays: true,
cacheAdapter
})

ndk.connect().then(() => console.log('ndk connected successfully'))

const ndkStore = writable(ndk)

export default ndkStore

\`\`\`

# src/lib/components/ui/badge/badge.svelte

\`\`\`svelte

<script lang="ts">
	import { type Variant, badgeVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export let href: string | undefined = undefined;
	export let variant: Variant = "default";
	export { className as class };
</script>

<svelte:element
this={href ? "a" : "span"}
{href}
class={cn(badgeVariants({ variant, className }))}
{...$$restProps}

>

    <slot />

</svelte:element>

\`\`\`

# src/lib/components/ui/badge/index.ts

\`\`\`ts
import { type VariantProps, tv } from "tailwind-variants";
export { default as Badge } from "./badge.svelte";

export const badgeVariants = tv({
base: "focus:ring-ring inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
variants: {
variant: {
default: "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
secondary:
"bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
destructive:
"bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent",
outline: "text-foreground",
},
},
defaultVariants: {
variant: "default",
},
});

export type Variant = VariantProps<typeof badgeVariants>["variant"];

\`\`\`

# src/lib/components/ui/button/button.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/ui/button/index.ts

\`\`\`ts
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

\`\`\`

# src/lib/components/ui/card/card-content.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/ui/card/card-description.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/ui/card/card-footer.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/ui/card/card-header.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/ui/card/card-title.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/ui/card/card.svelte

\`\`\`svelte

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

\`\`\`

# src/lib/components/ui/card/index.ts

\`\`\`ts
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

\`\`\`

# src/lib/components/ui/checkbox/checkbox.svelte

\`\`\`svelte

<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import Check from "lucide-svelte/icons/check";
	import Minus from "lucide-svelte/icons/minus";
	import { cn } from "$lib/utils.js";

	type $$Props = CheckboxPrimitive.Props;
	type $$Events = CheckboxPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let checked: $$Props["checked"] = false;
	export { className as class };
</script>

<CheckboxPrimitive.Root
class={cn(
"border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
className
)}
bind:checked
{...$$restProps}
on:click

>

    <CheckboxPrimitive.Indicator
    	class={cn("flex h-4 w-4 items-center justify-center text-current")}
    	let:isChecked
    	let:isIndeterminate
    >
    	{#if isChecked}
    		<Check class="h-3.5 w-3.5" />
    	{:else if isIndeterminate}
    		<Minus class="h-3.5 w-3.5" />
    	{/if}
    </CheckboxPrimitive.Indicator>

</CheckboxPrimitive.Root>

\`\`\`

# src/lib/components/ui/checkbox/index.ts

\`\`\`ts
import Root from "./checkbox.svelte";
export {
Root,
//
Root as Checkbox,
};

\`\`\`

# src/lib/components/ui/collapsible/collapsible-content.svelte

\`\`\`svelte

<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from "bits-ui";
	import { slide } from "svelte/transition";

	type $$Props = CollapsiblePrimitive.ContentProps;

	export let transition: $$Props["transition"] = slide;
	export let transitionConfig: $$Props["transitionConfig"] = {
		duration: 150,
	};
</script>

<CollapsiblePrimitive.Content {transition} {transitionConfig} {...$$restProps}>
<slot />
</CollapsiblePrimitive.Content>

\`\`\`

# src/lib/components/ui/collapsible/index.ts

\`\`\`ts
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import Content from "./collapsible-content.svelte";

const Root = CollapsiblePrimitive.Root;
const Trigger = CollapsiblePrimitive.Trigger;

export {
Root,
Content,
Trigger,
//
Root as Collapsible,
Content as CollapsibleContent,
Trigger as CollapsibleTrigger,
};

\`\`\`

# src/lib/components/ui/command/command-dialog.svelte

\`\`\`svelte

<script lang="ts">
	import type { Dialog as DialogPrimitive } from "bits-ui";
	import type { Command as CommandPrimitive } from "cmdk-sv";
	import Command from "./command.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";

	type $$Props = DialogPrimitive.Props & CommandPrimitive.CommandProps;

	export let open: $$Props["open"] = false;
	export let value: $$Props["value"] = undefined;
</script>

<Dialog.Root bind:open {...$$restProps}>
	<Dialog.Content class="overflow-hidden p-0 shadow-lg">
		<Command
			class="[&_[data-cmdk-group-heading]]:text-muted-foreground [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group]:not([hidden])_~[data-cmdk-group]]:pt-0 [&_[data-cmdk-group]]:px-2 [&_[data-cmdk-input-wrapper]_svg]:h-5 [&_[data-cmdk-input-wrapper]_svg]:w-5 [&_[data-cmdk-input]]:h-12 [&_[data-cmdk-item]]:px-2 [&_[data-cmdk-item]]:py-3 [&_[data-cmdk-item]_svg]:h-5 [&_[data-cmdk-item]_svg]:w-5"
			{...$$restProps}
bind:value >
<slot />
</Command>
</Dialog.Content>
</Dialog.Root>

\`\`\`

# src/lib/components/ui/command/command-empty.svelte

\`\`\`svelte

<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";

	type $$Props = CommandPrimitive.EmptyProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Empty class={cn("py-6 text-center text-sm", className)} {...$$restProps}>
<slot />
</CommandPrimitive.Empty>

\`\`\`

# src/lib/components/ui/command/command-group.svelte

\`\`\`svelte

<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";
	type $$Props = CommandPrimitive.GroupProps;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Group
class={cn(
"text-foreground [&_[data-cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:py-1.5 [&_[data-cmdk-group-heading]]:text-xs [&\_[data-cmdk-group-heading]]:font-medium",
className
)}
{...$$restProps}

>

    <slot />

</CommandPrimitive.Group>

\`\`\`

# src/lib/components/ui/command/command-input.svelte

\`\`\`svelte

<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import Search from "lucide-svelte/icons/search";
	import { cn } from "$lib/utils.js";

	type $$Props = CommandPrimitive.InputProps;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string = "";
</script>

<div class="flex items-center border-b px-2" data-cmdk-input-wrapper="">
	<Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
	<CommandPrimitive.Input
		class={cn(
			"placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}
		{...$$restProps}
		bind:value
	/>
</div>

\`\`\`

# src/lib/components/ui/command/command-item.svelte

\`\`\`svelte

<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";

	type $$Props = CommandPrimitive.ItemProps;

	export let asChild = false;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Item
{asChild}
class={cn(
"aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
className
)}
{...$$restProps}
let:action
let:attrs

>

    <slot {action} {attrs} />

</CommandPrimitive.Item>

\`\`\`

# src/lib/components/ui/command/command-list.svelte

\`\`\`svelte

<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";

	type $$Props = CommandPrimitive.ListProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.List
class={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
{...$$restProps}

>

    <slot />

</CommandPrimitive.List>

\`\`\`

# src/lib/components/ui/command/command-separator.svelte

\`\`\`svelte

<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";

	type $$Props = CommandPrimitive.SeparatorProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Separator class={cn("bg-border -mx-1 h-px", className)} {...$$restProps} />

\`\`\`

# src/lib/components/ui/command/command-shortcut.svelte

\`\`\`svelte

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLSpanElement>;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<span
class={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
{...$$restProps}

>

    <slot />

</span>

\`\`\`

# src/lib/components/ui/command/command.svelte

\`\`\`svelte

<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils.js";

	type $$Props = CommandPrimitive.CommandProps;

	export let value: $$Props["value"] = undefined;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Root
class={cn(
"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
className
)}
bind:value
{...$$restProps}

>

    <slot />

</CommandPrimitive.Root>

\`\`\`

# src/lib/components/ui/command/index.ts

\`\`\`ts
import { Command as CommandPrimitive } from "cmdk-sv";

import Root from "./command.svelte";
import Dialog from "./command-dialog.svelte";
import Empty from "./command-empty.svelte";
import Group from "./command-group.svelte";
import Item from "./command-item.svelte";
import Input from "./command-input.svelte";
import List from "./command-list.svelte";
import Separator from "./command-separator.svelte";
import Shortcut from "./command-shortcut.svelte";

const Loading = CommandPrimitive.Loading;

export {
Root,
Dialog,
Empty,
Group,
Item,
Input,
List,
Separator,
Shortcut,
Loading,
//
Root as Command,
Dialog as CommandDialog,
Empty as CommandEmpty,
Group as CommandGroup,
Item as CommandItem,
Input as CommandInput,
List as CommandList,
Separator as CommandSeparator,
Shortcut as CommandShortcut,
Loading as CommandLoading,
};

\`\`\`

# src/lib/components/ui/dialog/dialog-content.svelte

\`\`\`svelte

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import X from "lucide-svelte/icons/x";
	import * as Dialog from "./index.js";
	import { cn, flyAndScale } from "$lib/utils.js";

	type $$Props = DialogPrimitive.ContentProps;

	let className: $$Props["class"] = undefined;
	export let transition: $$Props["transition"] = flyAndScale;
	export let transitionConfig: $$Props["transitionConfig"] = {
		duration: 200,
	};
	export { className as class };
</script>

<Dialog.Portal>
<Dialog.Overlay />
<DialogPrimitive.Content
{transition}
{transitionConfig}
class={cn(
"bg-background fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg sm:rounded-lg md:w-full",
className
)}
{...$$restProps} >
<slot />
<DialogPrimitive.Close
class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none" >
<X class="h-4 w-4" />
<span class="sr-only">Close</span>
</DialogPrimitive.Close>
</DialogPrimitive.Content>
</Dialog.Portal>

\`\`\`

# src/lib/components/ui/dialog/dialog-description.svelte

\`\`\`svelte

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = DialogPrimitive.DescriptionProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<DialogPrimitive.Description
class={cn("text-muted-foreground text-sm", className)}
{...$$restProps}

>

    <slot />

</DialogPrimitive.Description>

\`\`\`

# src/lib/components/ui/dialog/dialog-footer.svelte

\`\`\`svelte

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div
	class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
	{...$$restProps}
>
	<slot />
</div>

\`\`\`

# src/lib/components/ui/dialog/dialog-header.svelte

\`\`\`svelte

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...$$restProps}>
	<slot />
</div>

\`\`\`

# src/lib/components/ui/dialog/dialog-overlay.svelte

\`\`\`svelte

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { fade } from "svelte/transition";
	import { cn } from "$lib/utils.js";

	type $$Props = DialogPrimitive.OverlayProps;

	let className: $$Props["class"] = undefined;
	export let transition: $$Props["transition"] = fade;
	export let transitionConfig: $$Props["transitionConfig"] = {
		duration: 150,
	};
	export { className as class };
</script>

<DialogPrimitive.Overlay
{transition}
{transitionConfig}
class={cn("bg-background/80 fixed inset-0 z-50 backdrop-blur-sm", className)}
{...$$restProps}
/>

\`\`\`

# src/lib/components/ui/dialog/dialog-portal.svelte

\`\`\`svelte

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	type $$Props = DialogPrimitive.PortalProps;
</script>

<DialogPrimitive.Portal {...$$restProps}>
<slot />
</DialogPrimitive.Portal>

\`\`\`

# src/lib/components/ui/dialog/dialog-title.svelte

\`\`\`svelte

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = DialogPrimitive.TitleProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<DialogPrimitive.Title
class={cn("text-lg font-semibold leading-none tracking-tight", className)}
{...$$restProps}

>

    <slot />

</DialogPrimitive.Title>

\`\`\`

# src/lib/components/ui/dialog/index.ts

\`\`\`ts
import { Dialog as DialogPrimitive } from "bits-ui";

import Title from "./dialog-title.svelte";
import Portal from "./dialog-portal.svelte";
import Footer from "./dialog-footer.svelte";
import Header from "./dialog-header.svelte";
import Overlay from "./dialog-overlay.svelte";
import Content from "./dialog-content.svelte";
import Description from "./dialog-description.svelte";

const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;
const Close = DialogPrimitive.Close;

export {
Root,
Title,
Portal,
Footer,
Header,
Trigger,
Overlay,
Content,
Description,
Close,
//
Root as Dialog,
Title as DialogTitle,
Portal as DialogPortal,
Footer as DialogFooter,
Header as DialogHeader,
Trigger as DialogTrigger,
Overlay as DialogOverlay,
Content as DialogContent,
Description as DialogDescription,
Close as DialogClose,
};

\`\`\`

# src/lib/components/ui/input/index.ts

\`\`\`ts
import Root from "./input.svelte";

export type FormInputEvent<T extends Event = Event> = T & {
currentTarget: EventTarget & HTMLInputElement;
};
export type InputEvents = {
blur: FormInputEvent<FocusEvent>;
change: FormInputEvent<Event>;
click: FormInputEvent<MouseEvent>;
focus: FormInputEvent<FocusEvent>;
focusin: FormInputEvent<FocusEvent>;
focusout: FormInputEvent<FocusEvent>;
keydown: FormInputEvent<KeyboardEvent>;
keypress: FormInputEvent<KeyboardEvent>;
keyup: FormInputEvent<KeyboardEvent>;
mouseover: FormInputEvent<MouseEvent>;
mouseenter: FormInputEvent<MouseEvent>;
mouseleave: FormInputEvent<MouseEvent>;
mousemove: FormInputEvent<MouseEvent>;
paste: FormInputEvent<ClipboardEvent>;
input: FormInputEvent<InputEvent>;
wheel: FormInputEvent<WheelEvent>;
};

export {
Root,
//
Root as Input,
};

\`\`\`

# src/lib/components/ui/input/input.svelte

\`\`\`svelte

<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { InputEvents } from "./index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props["readonly"] = undefined;
</script>

<input
class={cn(
"border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
className
)}
bind:value
{readonly}
on:blur
on:change
on:click
on:focus
on:focusin
on:focusout
on:keydown
on:keypress
on:keyup
on:mouseover
on:mouseenter
on:mouseleave
on:mousemove
on:paste
on:input
on:wheel|passive
{...$$restProps}
/>

\`\`\`

# src/lib/components/ui/label/index.ts

\`\`\`ts
import Root from "./label.svelte";

export {
Root,
//
Root as Label,
};

\`\`\`

# src/lib/components/ui/label/label.svelte

\`\`\`svelte

<script lang="ts">
	import { Label as LabelPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = LabelPrimitive.Props;
	type $$Events = LabelPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<LabelPrimitive.Root
class={cn(
"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
className
)}
{...$$restProps}
on:mousedown

>

    <slot />

</LabelPrimitive.Root>

\`\`\`

# src/lib/components/ui/popover/index.ts

\`\`\`ts
import { Popover as PopoverPrimitive } from "bits-ui";
import Content from "./popover-content.svelte";
const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;
const Close = PopoverPrimitive.Close;

export {
Root,
Content,
Trigger,
Close,
//
Root as Popover,
Content as PopoverContent,
Trigger as PopoverTrigger,
Close as PopoverClose,
};

\`\`\`

# src/lib/components/ui/popover/popover-content.svelte

\`\`\`svelte

<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";
	import { cn, flyAndScale } from "$lib/utils.js";

	type $$Props = PopoverPrimitive.ContentProps;
	let className: $$Props["class"] = undefined;
	export let transition: $$Props["transition"] = flyAndScale;
	export let transitionConfig: $$Props["transitionConfig"] = undefined;
	export { className as class };
</script>

<PopoverPrimitive.Content
{transition}
{transitionConfig}
class={cn(
"bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none",
className
)}
{...$$restProps}

>

    <slot />

</PopoverPrimitive.Content>

\`\`\`

# src/lib/components/ui/select/index.ts

\`\`\`ts
import { Select as SelectPrimitive } from "bits-ui";

import Label from "./select-label.svelte";
import Item from "./select-item.svelte";
import Content from "./select-content.svelte";
import Trigger from "./select-trigger.svelte";
import Separator from "./select-separator.svelte";

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;
const Input = SelectPrimitive.Input;
const Value = SelectPrimitive.Value;

export {
Root,
Group,
Input,
Label,
Item,
Value,
Content,
Trigger,
Separator,
//
Root as Select,
Group as SelectGroup,
Input as SelectInput,
Label as SelectLabel,
Item as SelectItem,
Value as SelectValue,
Content as SelectContent,
Trigger as SelectTrigger,
Separator as SelectSeparator,
};

\`\`\`

# src/lib/components/ui/select/select-content.svelte

\`\`\`svelte

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { scale } from "svelte/transition";
	import { cn, flyAndScale } from "$lib/utils.js";

	type $$Props = SelectPrimitive.ContentProps;
	type $$Events = SelectPrimitive.ContentEvents;

	export let sideOffset: $$Props["sideOffset"] = 4;
	export let inTransition: $$Props["inTransition"] = flyAndScale;
	export let inTransitionConfig: $$Props["inTransitionConfig"] = undefined;
	export let outTransition: $$Props["outTransition"] = scale;
	export let outTransitionConfig: $$Props["outTransitionConfig"] = {
		start: 0.95,
		opacity: 0,
		duration: 50,
	};

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Content
{inTransition}
{inTransitionConfig}
{outTransition}
{outTransitionConfig}
{sideOffset}
class={cn(
"bg-popover text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md outline-none",
className
)}
{...$$restProps}
on:keydown

>

    <div class="w-full p-1">
    	<slot />
    </div>

</SelectPrimitive.Content>

\`\`\`

# src/lib/components/ui/select/select-item.svelte

\`\`\`svelte

<script lang="ts">
	import Check from "lucide-svelte/icons/check";
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = SelectPrimitive.ItemProps;
	type $$Events = SelectPrimitive.ItemEvents;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"];
	export let label: $$Props["label"] = undefined;
	export let disabled: $$Props["disabled"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Item
{value}
{disabled}
{label}
class={cn(
"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
className
)}
{...$$restProps}
on:click
on:keydown
on:focusin
on:focusout
on:pointerleave
on:pointermove

>

    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    	<SelectPrimitive.ItemIndicator>
    		<Check class="h-4 w-4" />
    	</SelectPrimitive.ItemIndicator>
    </span>
    <slot>
    	{label || value}
    </slot>

</SelectPrimitive.Item>

\`\`\`

# src/lib/components/ui/select/select-label.svelte

\`\`\`svelte

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = SelectPrimitive.LabelProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Label
class={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
{...$$restProps}

>

    <slot />

</SelectPrimitive.Label>

\`\`\`

# src/lib/components/ui/select/select-separator.svelte

\`\`\`svelte

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	type $$Props = SelectPrimitive.SeparatorProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Separator class={cn("bg-muted -mx-1 my-1 h-px", className)} {...$$restProps} />

\`\`\`

# src/lib/components/ui/select/select-trigger.svelte

\`\`\`svelte

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";

	type $$Props = SelectPrimitive.TriggerProps;
	type $$Events = SelectPrimitive.TriggerEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Trigger
class={cn(
"border-input bg-background ring-offset-background focus-visible:ring-ring aria-[invalid]:border-destructive data-[placeholder]:[&>span]:text-muted-foreground flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
className
)}
{...$$restProps}
let:builder
on:click
on:keydown

>

    <slot {builder} />
    <div>
    	<ChevronDown class="h-4 w-4 opacity-50" />
    </div>

</SelectPrimitive.Trigger>

\`\`\`

# src/lib/ndkLogin.ts

\`\`\`ts
// src/lib/ndkLogin.ts
import { NDKNip07Signer, NDKSubscriptionCacheUsage, NDKUser } from '@nostr-dev-kit/ndk'
import ndkStore, { ndk } from './components/stores/ndk'

export async function loginWithExtension(): Promise<boolean> {
try {
const signer = new NDKNip07Signer()
console.log('Waiting for NIP-07 signer')
await signer.blockUntilReady()
ndk.signer = signer
ndkStore.set(ndk)
await fetchActiveUserData()
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

export function isLoggedIn(): boolean {
return !!ndk.signer
}

\`\`\`

# src/lib/queries/client.ts

\`\`\`ts
import { browser } from '$app/environment'
import { QueryClient, type CreateQueryResult } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export const queryClient = new QueryClient({
defaultOptions: {
queries: {
enabled: browser,
staleTime: 5 _ 60 _ 1000, // 5 minutes
refetchOnWindowFocus: false,
refetchOnReconnect: true
}
}
})

\`\`\`

# src/lib/queries/events.query.ts

\`\`\`ts
import ndkStore from '$lib/components/stores/ndk'
import { NDKSubscriptionCacheUsage, type NDKEvent, type NDKFilter } from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { queryClient } from './client'

export const latestEventQueryKey = (pubkey: string) => ['latestEvent', pubkey]
export const createLatestEventQuery = (pubkey: string) =>
createQuery<NDKEvent | null>(
{
queryKey: ['latestEvent', pubkey],
queryFn: async () => {
const $ndkStore = get(ndkStore)

    			const filter: NDKFilter = { kinds: [1], authors: [pubkey] }

    			const cachedEvent = await $ndkStore.fetchEvent(filter, {
    				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
    			})

    			if (cachedEvent) {
    				return cachedEvent
    			}

    			const eventFromRelay = await $ndkStore.fetchEvent(filter, {
    				cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
    				groupable: true
    			})

    			if (!eventFromRelay) {
    				console.log('Profile not found', pubkey)
    				throw Error('Profile not found')
    			}

    			return eventFromRelay
    		},
    		staleTime: 5 * 60 * 1000, // 5 minutes
    		retry: 3,
    		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    	},
    	queryClient
    )

\`\`\`

# src/lib/queries/follows.query.ts

\`\`\`ts
// src/lib/queries/follows.query.ts
import { QueryClient, createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import ndkStore from '$lib/components/stores/ndk'
import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk'
import { NDKKind, NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk'
import { queryClient } from './client'

export const followsQueryKey = (pubkey: string) => ['follows', pubkey]
export const profileQueryKey = (pubkey: string) => ['profile', pubkey]

export const createUserFollowsByIdQuery = (pubkey: string) =>
createQuery<Set<NDKUser> | null>(
{
queryKey: followsQueryKey(pubkey),
queryFn: async () => {
const $ndkStore = get(ndkStore)
				if (!$ndkStore.activeUser) return null

    			const cachedFollows = await $ndkStore.activeUser.follows({
    				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
    			})

    			if (cachedFollows && cachedFollows.size > 0) {
    				return cachedFollows
    			}

    			const followsFromRelay = await $ndkStore.activeUser.follows({
    				cacheUsage: NDKSubscriptionCacheUsage.PARALLEL
    			})
    			console.log(followsFromRelay)
    			if (!followsFromRelay) {
    				console.log('Follows not found', pubkey)
    				throw Error('Follows not found')
    			}
    			return followsFromRelay
    		},
    		staleTime: 5 * 60 * 1000, // 5 minutes
    		retry: 3,
    		enabled: !!pubkey,
    		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    	},
    	queryClient
    )

export const createProfileQuery = (pubkey: string) =>
createQuery<NDKUserProfile | null>(
{
queryKey: profileQueryKey(pubkey),
queryFn: async () => {
const $ndkStore = get(ndkStore)
const user = $ndkStore.getUser({ pubkey })

    			const cachedProfile = await user.fetchProfile({
    				cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
    			})

    			if (cachedProfile) {
    				return cachedProfile
    			}

    			const profileFromRelays = await user.fetchProfile({
    				cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
    				groupable: true
    			})

    			if (!profileFromRelays) {
    				console.log('Profile not found', pubkey)
    				throw Error('Profile not found')
    			}

    			return profileFromRelays
    		},
    		staleTime: 5 * 60 * 1000, // 5 minutes
    		retry: 3,
    		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    		enabled: !!get(ndkStore).activeUser
    	},
    	queryClient
    )

export const getProfileName = (profile: NDKUserProfile | null | undefined): string =>
profile?.name ||
profile?.displayName ||
profile?.nip05 ||
(profile?.pubkey as string) ||
'Unnamed user'

export function getTypedProfileQueryData(
queryClient: QueryClient,
pubkey: string
): NDKUserProfile | null | undefined {
return queryClient.getQueryData<NDKUserProfile | null>(profileQueryKey(pubkey))
}

\`\`\`

# src/lib/subs.ts

\`\`\`ts
import type { NDKEvent, NostrEvent } from '@nostr-dev-kit/ndk'
import type { ExtendedBaseType, NDKEventStore } from '@nostr-dev-kit/ndk-svelte'
import { ndk } from './components/stores/ndk'
import { derived, writable, type Readable } from 'svelte/store'
import { db } from '@nostr-dev-kit/ndk-cache-dexie'

export const followsStore = writable<string[]>([])

export const notesSub: NDKEventStore<ExtendedBaseType<NDKEvent>> = ndk.storeSubscribe(
{},
{ closeOnEose: false, autoStart: false }
)

export const combinedActivityStore: Readable<{
follows: string[]
notes: Map<string, NDKEvent>
filledPercentage: number
pendingPubkeys: string[]
}> = derived([followsStore, notesSub], ([$followsStore, $notesSub]) => {
const follows = $followsStore
const notes = new Map<string, NDKEvent>()

    for (const event of $notesSub) {
    	if (!notes.has(event.pubkey) || event.created_at! > notes.get(event.pubkey)!.created_at!) {
    		notes.set(event.pubkey, event)
    	}
    }

    const pendingPubkeys = follows.filter((pubkey) => !notes.has(pubkey))
    const filledPercentage =
    	follows.length > 0 ? ((follows.length - pendingPubkeys.length) / follows.length) * 100 : 0

    return {
    	follows,
    	notes,
    	filledPercentage,
    	pendingPubkeys
    }

})

export async function populateEventsFromDexie(pubkeys: string[]): Promise<Map<string, NDKEvent>> {
const events = await db.events
.where('kind')
.equals(1)
.and((event) => pubkeys.includes(event.pubkey))
.toArray()

    const notesMap = new Map<string, NDKEvent>()
    events.forEach((event) => {
    	if (
    		!notesMap.has(event.pubkey) ||
    		event.created_at! > notesMap.get(event.pubkey)!.created_at!
    	) {
    		notesMap.set(event.pubkey, event as unknown as NDKEvent)
    	}
    })

    return notesMap

}

\`\`\`

# src/lib/utils.ts

\`\`\`ts
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

export function debounce<T extends (...args: any[]) => void>(
func: T,
delay: number
): (...args: Parameters<T>) => void {
let timeoutId: ReturnType<typeof setTimeout>;
return (...args: Parameters<T>) => {
clearTimeout(timeoutId);
timeoutId = setTimeout(() => func(...args), delay);
};
}
\`\`\`

# src/lib/utils/date.utils.ts

\`\`\`ts
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns'

export function formatDate(timestamp: number | undefined): string {
return timestamp ? format(fromUnixTime(timestamp), 'PPP') : 'Unknown'
}

export function formatRelativeTime(timestamp: number | undefined): string {
return timestamp ? formatDistanceToNow(fromUnixTime(timestamp), { addSuffix: true }) : 'Unknown'
}

\`\`\`

# src/lib/utils/queries.utils.ts

\`\`\`ts
import type { CreateQueryResult } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export async function resolveQuery<T>(queryFn: () => CreateQueryResult<T, Error>, timeout: number = 1000 \* 60): Promise<T> {
const startTime = Date.now()
const query = queryFn()
let currentQuery = get(query)

    while (!currentQuery.isSuccess && !currentQuery.isError) {
    	if (Date.now() - startTime > timeout) {
    		throw new Error('Query timed out')
    	}
    	await new Promise((resolve) => setTimeout(resolve, 15))
    	currentQuery = get(query)
    }

    if (currentQuery.isFetched && !currentQuery.isError) {
    	return currentQuery.data
    }

    throw currentQuery.error || new Error('Price query failed')

}
\`\`\`

# src/routes/+layout.svelte

\`\`\`svelte

<script lang="ts">
	import Header from '$lib/components/header.svelte'
	import '../app.css'
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/components/stores/ndk'

	import { queryClient } from '$lib/queries/client'
	import { resolveQuery } from '$lib/utils/queries.utils'
	import { createProfileQuery, createUserFollowsByIdQuery, getProfileName } from '$lib/queries/follows.query'

	$: if ($ndkStore.activeUser && window.location.pathname === '/login') {
		goto(`/p/${$ndkStore.activeUser.pubkey}`)
	}

	$: userFollows = $ndkStore.activeUser?.pubkey ? createUserFollowsByIdQuery($ndkStore.activeUser!.pubkey) : undefined
	$: if (userFollows) console.log($userFollows?.data)

	async function initializeUserData() {
		for (const follow of $userFollows?.data!) {
			console.log("Initializing q for", follow.pubkey)
			const followProfile = await resolveQuery(() => createProfileQuery(follow.pubkey))
			console.log("Profile for", getProfileName(followProfile))
		}
	}
	$: if ($userFollows?.data) {
		initializeUserData()
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

\`\`\`

# src/routes/+page.svelte

\`\`\`svelte

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

\`\`\`

# src/routes/login/+page.svelte

\`\`\`svelte

<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation'
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import ndkStore from '$lib/components/stores/ndk'

	async function handleLogin() {
		const loginResult = await loginWithExtension()
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

\`\`\`

# src/routes/p/[pubkey]/+page.svelte

\`\`\`svelte

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

\`\`\`

# static/favicon.png

This is a binary file of the type: Image

# svelte.config.js

\`\`\`js
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/\*_ @type {import('@sveltejs/kit').Config} _/
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
preprocess: vitePreprocess(),

    kit: {
    	// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    	// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    	// See https://kit.svelte.dev/docs/adapters for more information about adapters.
    	adapter: adapter()
    },
    alias: {
    	'@/*': './path/to/lib/*'
    }

}

export default config

\`\`\`

# tailwind.config.js

\`\`\`js
import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} \*/
const config = {
darkMode: ['class'],
content: ['./src/**/\*.{html,js,svelte,ts}'],
safelist: ['dark'],
theme: {
container: {
center: true,
padding: '2rem',
screens: {
'2xl': '1400px'
}
},
extend: {
colors: {
border: 'hsl(var(--border) / <alpha-value>)',
input: 'hsl(var(--input) / <alpha-value>)',
ring: 'hsl(var(--ring) / <alpha-value>)',
background: 'hsl(var(--background) / <alpha-value>)',
foreground: 'hsl(var(--foreground) / <alpha-value>)',
primary: {
DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
},
secondary: {
DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
},
destructive: {
DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
},
muted: {
DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
},
accent: {
DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
},
popover: {
DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
},
card: {
DEFAULT: 'hsl(var(--card) / <alpha-value>)',
foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
}
},
borderRadius: {
lg: 'var(--radius)',
md: 'calc(var(--radius) - 2px)',
sm: 'calc(var(--radius) - 4px)'
},
fontFamily: {
sans: [...fontFamily.sans]
}
}
}
}

export default config

\`\`\`

# tsconfig.json

\`\`\`json
{
"extends": "./.svelte-kit/tsconfig.json",
"compilerOptions": {
"allowJs": true,
"checkJs": true,
"esModuleInterop": true,
"forceConsistentCasingInFileNames": true,
"resolveJsonModule": true,
"skipLibCheck": true,
"sourceMap": true,
"strict": true,
"moduleResolution": "bundler"
}
// Path aliases are handled by https://kit.svelte.dev/docs/configuration#alias
// except $lib which is handled by https://kit.svelte.dev/docs/configuration#files
//
// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
// from the referenced tsconfig.json - TypeScript does not merge them in
}

\`\`\`

# vite.config.ts

\`\`\`ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
plugins: [sveltekit()]
})

\`\`\`
```

# components.json

```json
{
	"$schema": "https://shadcn-svelte.com/schema.json",
	"style": "default",
	"tailwind": {
		"config": "tailwind.config.js",
		"css": "src/app.css",
		"baseColor": "slate"
	},
	"aliases": {
		"components": "$lib/components",
		"utils": "$lib/utils"
	},
	"typescript": true
}
```

# eslint.config.js

```js
import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
]
```

# package.json

```json
{
	"name": "colorillo-lab",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"lint": "prettier --check . && eslint .",
		"format": "prettier --write ."
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^3.0.0",
		"@sveltejs/kit": "^2.0.0",
		"@sveltejs/vite-plugin-svelte": "^3.0.0",
		"@types/eslint": "^9.6.0",
		"@types/tinycolor2": "^1.4.6",
		"autoprefixer": "^10.4.20",
		"eslint": "^9.0.0",
		"eslint-config-prettier": "^9.1.0",
		"eslint-plugin-svelte": "^2.36.0",
		"globals": "^15.0.0",
		"postcss": "^8.4.47",
		"prettier": "^3.1.1",
		"prettier-plugin-svelte": "^3.1.2",
		"svelte": "^4.2.7",
		"svelte-check": "^4.0.0",
		"tailwindcss": "^3.4.11",
		"typescript": "^5.0.0",
		"typescript-eslint": "^8.0.0",
		"vite": "^5.0.3"
	},
	"type": "module",
	"dependencies": {
		"@nostr-dev-kit/ndk": "^2.10.0",
		"@nostr-dev-kit/ndk-cache-dexie": "^2.5.1",
		"@nostr-dev-kit/ndk-svelte": "^2.2.18",
		"@tanstack/svelte-query": "^5.56.2",
		"@tanstack/svelte-table": "^8.20.5",
		"@tanstack/svelte-virtual": "^3.10.8",
		"bits-ui": "^0.21.13",
		"clsx": "^2.1.1",
		"cmdk-sv": "^0.0.18",
		"date-fns": "^4.1.0",
		"dexie": "^4.0.8",
		"lucide-svelte": "^0.446.0",
		"prettier-plugin-tailwindcss": "^0.6.6",
		"tailwind-merge": "^2.5.2",
		"tailwind-variants": "^0.2.1",
		"tinycolor2": "^1.6.0"
	}
}
```

# postcss.config.js

```js
export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: {}
	}
}
```

# README.md

```md
# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

\`\`\`bash

# create a new project in the current directory

npm create svelte@latest

# create a new project in my-app

npm create svelte@latest my-app
\`\`\`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

\`\`\`bash
npm run dev

# or start the server and open the app in a new browser tab

npm run dev -- --open
\`\`\`

## Building

To create a production version of your app:

\`\`\`bash
npm run build
\`\`\`

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
```

# src/app.css

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

# src/app.d.ts

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

# src/app.html

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

# src/lib/components/colorIndex.svelte

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

# src/lib/components/colorIndexView.svelte

```svelte
<script lang="ts">
	import ColorIndex from './colorIndex.svelte'
	import ContactCard from './contactCard.svelte'
	import { createUserFollowsByIdQuery } from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import tinycolor from 'tinycolor2'
	import { derived, writable } from 'svelte/store'

	export let pubkey: string
	let contactListElement: HTMLElement
	let currentColorIndex = writable(0)

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)

	$: userColors = derived(userFollowsQuery, ($query) => {
		if (!$query.data) return []

		return sortColorsByHue(
			[...$query.data].map((user) => ({
				color: `#${user.pubkey.slice(0, 6)}`,
				pubkey: user.pubkey,
				created_at: user.profile?.created_at!
			}))
		)
	})

	$: virtualizer = createVirtualizer({
		count: $userColors.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 90,
		overscan: 5
	})

	function sortColorsByHue(
		colors: { color: string; pubkey: string; created_at: number }[]
	): typeof colors {
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

{#if $userFollowsQuery.data}
	Contacts length: {$userFollowsQuery.data.size}
{/if}
<div class="grid grid-cols-[auto,1fr] gap-2 h-[calc(100vh-200px)]">
	<ColorIndex colors={$userColors} onColorClick={scrollToContact} />
	<div class="relative border rounded-md overflow-hidden">
		<div class="overflow-y-auto h-full" bind:this={contactListElement}>
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
```

# src/lib/components/contactCard.svelte

```svelte
<script lang="ts">
	import { queryClient } from '$lib/queries/client'
	import { createProfileQuery, getProfileName, profileQueryKey } from '$lib/queries/follows.query'
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'

	export let color: string
	export let pubkey: string

	// $: state = queryClient.getQueryState(profileQueryKey(pubkey))

	$: profileQuery = createProfileQuery(pubkey)
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
```

# src/lib/components/contactListVisualizer.svelte

```svelte
<!-- src/lib/components/contactListVisualizer.svelte -->
<script lang="ts">
	import { writable } from 'svelte/store'
	import { Button } from '$lib/components/ui/button'
	import ColorIndexView from './colorIndexView.svelte'
	import DateSortedView from './dateSortedView.svelte'
	import ProfileActivityView from './profileActivityView.svelte'

	export let pubkey: string

	enum VisualizationType {
		ColorIndex = 'Color Index',
		DateSorted = 'Date Sorted',
		ProfileActivity = 'Profile Activity'
	}

	const currentVisualization = writable<VisualizationType>(VisualizationType.ColorIndex)

	const visualizations = [
		{ type: VisualizationType.ColorIndex, component: ColorIndexView },
		{ type: VisualizationType.DateSorted, component: DateSortedView },
		{ type: VisualizationType.ProfileActivity, component: ProfileActivityView }
	]

	function switchVisualization(type: VisualizationType) {
		currentVisualization.set(type)
	}
</script>

<div class="mb-4">
	{#each visualizations as viz}
		<Button
			variant={$currentVisualization === viz.type ? 'default' : 'outline'}
			on:click={() => switchVisualization(viz.type)}
			class="mr-2"
		>
			{viz.type}
		</Button>
	{/each}
</div>

<div>
	{#each visualizations as viz}
		{#if $currentVisualization === viz.type}
			<svelte:component this={viz.component} {pubkey} />
		{/if}
	{/each}
</div>
```

# src/lib/components/dateSortedView.svelte

```svelte
<script lang="ts">
	import ContactCard from './contactCard.svelte'
	import { createUserFollowsByIdQuery, getTypedProfileQueryData } from '$lib/queries/follows.query'
	import { createVirtualizer } from '@tanstack/svelte-virtual'
	import { writable } from 'svelte/store'
	import { Button } from '$lib/components/ui/button'
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type SortingState,
		type Updater
	} from '@tanstack/svelte-table'
	import type { NDKUser } from '@nostr-dev-kit/ndk'
	import { queryClient } from '$lib/queries/client'

	export let pubkey: string
	let contactListElement: HTMLElement

	let sorting: SortingState = []

	function setSorting(updater: Updater<SortingState>) {
		if (updater instanceof Function) sorting = updater(sorting)
		else sorting = updater

		tableOptions.update((opts) => ({
			...opts,
			state: {
				...opts.state,
				sorting
			}
		}))
	}

	const columns: ColumnDef<NDKUser>[] = [
		{
			accessorKey: 'pubkey',
			header: 'Public Key'
		},
		{
			accessorFn: (row) => {
				const profile = getTypedProfileQueryData(queryClient, row.pubkey)
				return profile?.created_at || 0
			},
			id: 'created_at',
			header: 'Created At'
		}
	]

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)

	$: tableOptions = writable({
		data: Array.from($userFollowsQuery.data || []),
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	})

	$: table = createSvelteTable(tableOptions)

	$: rows = $table.getRowModel().rows

	$: virtualizer = createVirtualizer({
		count: rows.length,
		getScrollElement: () => contactListElement,
		estimateSize: () => 100,
		overscan: 5
	})

	$: sortOrder = sorting[0]?.desc ? 'desc' : 'asc'
	$: sortBy = sorting[0]?.id || 'created_at'

	function toggleSortOrder() {
		setSorting((old) =>
			old[0]?.desc ? [{ id: sortBy, desc: false }] : [{ id: sortBy, desc: true }]
		)
	}

	function toggleSortBy() {
		const newSortBy = sortBy === 'created_at' ? 'pubkey' : 'created_at'
		setSorting([{ id: newSortBy, desc: sortOrder === 'desc' }])
	}
</script>

<div class="mb-4 flex space-x-2">
	<Button on:click={toggleSortBy} variant="outline">
		Sort by: {sortBy === 'created_at' ? 'Creation Date' : 'Public Key'}
	</Button>
	<Button on:click={toggleSortOrder} variant="outline">
		Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
	</Button>
</div>

<div class="border rounded-md overflow-hidden h-[calc(100vh-250px)]">
	<div class="overflow-y-auto h-full" bind:this={contactListElement}>
		<div style="height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
			{#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.index)}
				{#if rows[virtualRow.index]}
					<div
						class="absolute top-0 left-0 w-full"
						style="height: {virtualRow.size}px; transform: translateY({virtualRow.start}px);"
					>
						<ContactCard
							color={`#${rows[virtualRow.index].original.pubkey.slice(0, 6)}`}
							pubkey={rows[virtualRow.index].original.pubkey}
						/>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
```

# src/lib/components/eventVisualizer.svelte

```svelte
<!-- EventVisualizer.svelte -->
<script lang="ts">
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'
	import { NDKKind } from '@nostr-dev-kit/ndk'
	import type { PubkeyEventEntry } from './stores/appDb'
	import { Badge } from '$lib/components/ui/badge'
	import { Card, CardContent, CardFooter } from '$lib/components/ui/card'

	export let event: PubkeyEventEntry | undefined
</script>

<Card>
	<CardContent>
		<h3 class="text-lg font-semibold">
			{event ? NDKKind[event.kind] || `Kind ${event.kind}` : 'Unknown Event'}
		</h3>
		<!-- <p>{NDKKind(event)}</p> -->
	</CardContent>
	<CardFooter class="text-sm text-muted-foreground">
		{#if event}
			<Badge variant="outline" class="mr-2">{formatRelativeTime(event.createdAt)}</Badge>
			<span>{formatDate(event.createdAt)}</span>
		{/if}
	</CardFooter>
</Card>
```

# src/lib/components/header.svelte

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

# src/lib/components/latestNote.svelte

```svelte
<!-- src/lib/components/LatestNote.svelte -->
<script lang="ts">
	import { NDKKind } from '@nostr-dev-kit/ndk'
	import { formatDate, formatRelativeTime } from '$lib/utils/date.utils'
	import type { PubkeyEventEntry } from './stores/appDb'

	export let event: PubkeyEventEntry
</script>

{#if event}
	<div class="text-sm truncate">{event.kind}: {NDKKind[event.kind]}</div>
	<div class="text-xs text-muted-foreground">
		<p>Created: {formatDate(event?.createdAt)}</p>
		<p>{formatRelativeTime(event?.createdAt)}</p>
	</div>
{:else}
	<div class="text-sm text-muted-foreground">No notes found</div>
{/if}
```

# src/lib/components/loginButton.svelte

```svelte
<!-- src/lib/components/loginButton.svelte -->
<script lang="ts">
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import { goto } from '$app/navigation'
	import ndkStore from './stores/ndk'

	async function handleAuth() {
		if ($ndkStore.activeUser) {
			// Implement logout functionality
			goto('/')
		} else {
			const loginResult = await loginWithExtension()
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

# src/lib/components/profileActivityView.svelte

```svelte
<script lang="ts">
	import { createUserFollowsByIdQuery } from '$lib/queries/follows.query'
	import { latestEventsStore } from './services/notesService'
	import ndkStore from './stores/ndk'
	import ContactCard from './contactCard.svelte'
	import { Button } from '$lib/components/ui/button'
	import { NDKKind } from '@nostr-dev-kit/ndk'
	import * as Popover from '$lib/components/ui/popover'
	import * as Command from '$lib/components/ui/command'
	import EventVisualizer from './eventVisualizer.svelte'
	import { debounce } from '$lib/utils'

	export let pubkey: string

	$: userFollowsQuery = createUserFollowsByIdQuery(pubkey)

	$: if ($userFollowsQuery.data) {
		const pubkeys = [...$userFollowsQuery.data].map((follow) => follow.pubkey)
		console.log('pub length', pubkeys.length)
		latestEventsStore.fetchLatestEvents(pubkeys)
	}

	let autoFetch = false
	let localTargetKinds = $latestEventsStore.targetKinds
	let selectedKinds: number[] = []
	let isSelectionMode = false

	const debouncedUpdateTargetKinds = debounce((kinds: number[]) => {
		latestEventsStore.updateTargetKinds(kinds)
	}, 300)

	async function fetchRemainingEvents() {
		const shouldContinue = await latestEventsStore.fetchRemainingEvents($ndkStore)
		if (!shouldContinue) {
			autoFetch = false
		}
	}

	function toggleAutoFetch() {
		autoFetch = !autoFetch
		if (
			autoFetch &&
			$latestEventsStore.remainingCount > 0 &&
			$latestEventsStore.fetchingStatus === 'idle'
		) {
			fetchRemainingEvents()
		}
	}

	$: if (
		autoFetch &&
		$latestEventsStore.fetchingStatus === 'idle' &&
		$latestEventsStore.remainingCount > 0
	) {
		fetchRemainingEvents()
	}

	function toggleSelectionMode() {
		isSelectionMode = !isSelectionMode
		selectedKinds = []
	}

	function toggleKindSelection(kind: number) {
		if (selectedKinds.includes(kind)) {
			selectedKinds = selectedKinds.filter((k) => k !== kind)
		} else {
			selectedKinds = [...selectedKinds, kind]
		}
	}

	function removeSelectedKinds() {
		if ($latestEventsStore.fetchingStatus === 'idle') {
			localTargetKinds = localTargetKinds.filter((kind) => !selectedKinds.includes(kind))
			debouncedUpdateTargetKinds(localTargetKinds)
			selectedKinds = []
		}
	}

	function addKind(kind: number) {
		if ($latestEventsStore.fetchingStatus === 'idle') {
			localTargetKinds = [...localTargetKinds, kind]
			debouncedUpdateTargetKinds(localTargetKinds)
		}
	}
	function removeKind(kind: number) {
		if ($latestEventsStore.fetchingStatus === 'idle') {
			localTargetKinds = localTargetKinds.filter((k) => k !== kind)
			debouncedUpdateTargetKinds(localTargetKinds)
		}
	}

	const kindOptions = Object.entries(NDKKind)
		.filter(([key, value]) => typeof value === 'number')
		.map(([key, value]) => ({ label: key, value: value as number }))

	$: isFetching = $latestEventsStore.fetchingStatus === 'fetching'
</script>

<div class="space-y-4">
	<div>
		<h3 class="text-lg font-semibold mb-2">Target Event Kinds</h3>
		<div class="flex flex-wrap gap-2 mb-2">
			{#each localTargetKinds as kind}
				<Button
					variant={isSelectionMode && selectedKinds.includes(kind) ? 'secondary' : 'outline'}
					size="sm"
					on:click={() => (isSelectionMode ? toggleKindSelection(kind) : null)}
					disabled={isFetching}
				>
					{NDKKind[kind] || `Kind ${kind}`}
					{#if !isSelectionMode}
						<span class="ml-2 cursor-pointer" on:click|stopPropagation={() => removeKind(kind)}
							>×</span
						>
					{/if}
				</Button>
			{/each}
		</div>
		<div class="flex gap-2 mb-2">
			<Button
				variant={isSelectionMode ? 'secondary' : 'outline'}
				size="sm"
				on:click={toggleSelectionMode}
				disabled={isFetching}
			>
				{isSelectionMode ? 'Exit Selection Mode' : 'Enter Selection Mode'}
			</Button>
			{#if isSelectionMode}
				<Button
					variant="destructive"
					size="sm"
					on:click={removeSelectedKinds}
					disabled={isFetching || selectedKinds.length === 0}
				>
					Remove Selected ({selectedKinds.length})
				</Button>
			{/if}
		</div>
		<Popover.Root let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					class="w-[200px] justify-between"
					disabled={isFetching}
				>
					Add Kinds
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-[250px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search kind..." />
					<Command.Empty>No kind found.</Command.Empty>
					<Command.Group>
						{#each kindOptions as option}
							<Command.Item
								value={`${option.value} ${option.label}`}
								onSelect={() => {
									if (!isFetching && !localTargetKinds.includes(option.value)) {
										addKind(option.value)
									}
								}}
								disabled={isFetching || localTargetKinds.includes(option.value)}
							>
								<div class="flex items-center justify-between w-full">
									<div class="flex items-center gap-2">
										{#if localTargetKinds.includes(option.value)}
											<span class="text-green-500">✓</span>
										{/if}
										<span class="font-semibold">{option.value}</span>
										<span class="text-sm text-gray-600">{option.label}</span>
									</div>
								</div>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</div>

	<div>
		<p>Remaining pubkeys without events: {$latestEventsStore.remainingCount}</p>
		<div class="flex gap-2">
			<Button
				on:click={fetchRemainingEvents}
				disabled={isFetching || autoFetch || localTargetKinds.length === 0}
			>
				{isFetching ? 'Fetching...' : 'Fetch Remaining'}
			</Button>
			<Button
				variant={autoFetch ? 'destructive' : 'secondary'}
				on:click={toggleAutoFetch}
				disabled={localTargetKinds.length === 0 || autoFetch}
			>
				{autoFetch ? 'Stop Auto Fetch' : 'Start Auto Fetch'}
			</Button>
		</div>
	</div>

	{#if $userFollowsQuery.data}
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each $userFollowsQuery.data as { pubkey }}
				<div class="space-y-2">
					<ContactCard color={`#${pubkey.slice(0, 6)}`} {pubkey} />
					<EventVisualizer event={$latestEventsStore.events.get(pubkey)} />
				</div>
			{/each}
		</div>
	{/if}
</div>
```

# src/lib/components/renderProfile.svelte

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

# src/lib/components/services/contact-loader.ts

```ts
import { type NDKUser } from '@nostr-dev-kit/ndk'
import { createProfileQuery, ProfileNotFoundError } from '$lib/queries/follows.query'
import { writable, type Readable } from 'svelte/store'
import { resolveQuery } from '$lib/utils/queries.utils'

interface LoadingProgress {
	total: number
	loaded: number
	failed: number
	isComplete: boolean
}

export class ContactLoaderService {
	private BATCH_SIZE = 30
	private CONCURRENT_BATCHES = 3

	private progress = writable<LoadingProgress>({
		total: 0,
		loaded: 0,
		failed: 0,
		isComplete: false
	})

	getProgress(): Readable<LoadingProgress> {
		return { subscribe: this.progress.subscribe }
	}

	async loadContacts(contacts: NDKUser[]) {
		this.progress.set({
			total: contacts.length,
			loaded: 0,
			failed: 0,
			isComplete: false
		})

		try {
			const batches = this.createBatches(contacts)

			for (let i = 0; i < batches.length; i += this.CONCURRENT_BATCHES) {
				const currentBatches = batches.slice(i, i + this.CONCURRENT_BATCHES)
				await Promise.all(currentBatches.map((batch) => this.processBatch(batch)))
			}
		} catch (error) {
			console.error('Contact loading error:', error)
		} finally {
			this.progress.update((p) => ({ ...p, isComplete: true }))
		}
	}

	private createBatches(contacts: NDKUser[]): NDKUser[][] {
		return contacts.reduce<NDKUser[][]>((batches, contact, index) => {
			const batchIndex = Math.floor(index / this.BATCH_SIZE)
			if (!batches[batchIndex]) {
				batches[batchIndex] = []
			}
			batches[batchIndex].push(contact)
			return batches
		}, [])
	}

	private async processBatch(batch: NDKUser[]) {
		await Promise.all(
			batch.map(async (contact) => {
				try {
					await resolveQuery(() => createProfileQuery(contact.pubkey))
					this.progress.update((p) => ({
						...p,
						loaded: p.loaded + 1
					}))
				} catch (error) {
					if (error instanceof ProfileNotFoundError) {
						console.info(`Profile not found for ${contact.pubkey}`)
					} else {
						console.warn(`Error loading profile for ${contact.pubkey}:`, error)
					}

					this.progress.update((p) => ({
						...p,
						loaded: p.loaded + 1,
						failed: p.failed + 1
					}))
				}
			})
		)
	}
}

export const contactLoader = new ContactLoaderService()
```

# src/lib/components/services/notesService.ts

```ts
// stores/latestEvents.ts
import { writable, derived, get } from 'svelte/store'
import { liveQuery } from 'dexie'
import type NDK from '@nostr-dev-kit/ndk'
import {
	getLatestEventPerPubkeyAndKind,
	pubkeyEventDB,
	type PubkeyEventEntry
} from '../stores/appDb'
import { NDKKind } from '@nostr-dev-kit/ndk'
const enumValues = Object.values(NDKKind).filter((value) => typeof value === 'number') as number[]

function createLatestEventsStore() {
	const events = writable<Map<string, PubkeyEventEntry>>(new Map())
	const pendingPubkeys = writable<Set<string>>(new Set())
	const targetKinds = writable<number[]>(enumValues.slice(0, 15))
	const remainingCount = derived(pendingPubkeys, ($pendingPubkeys) => $pendingPubkeys.size)
	const fetchingStatus = writable<'idle' | 'fetching' | 'complete'>('idle')

	function fetchLatestEvents(pubkeys: string[]) {
		const query = liveQuery(() => getLatestEventPerPubkeyAndKind(pubkeys, get(targetKinds)))
		query.subscribe((latestEvents) => {
			events.set(latestEvents)
			const missingPubkeys = new Set(pubkeys.filter((pk) => !latestEvents.has(pk)))
			pendingPubkeys.set(missingPubkeys)
		})
	}

	function updateTargetKinds(newKinds: number[]) {
		targetKinds.set(newKinds)
		const currentPubkeys = Array.from(get(events).keys())
		fetchLatestEvents(currentPubkeys)
	}

	async function fetchRemainingEvents(ndk: NDK): Promise<boolean> {
		const currentPendingPubkeys = get(pendingPubkeys)
		const currentTargetKinds = get(targetKinds)

		if (currentPendingPubkeys.size === 0) {
			fetchingStatus.set('complete')
			return false
		}

		fetchingStatus.set('fetching')

		const fetchedEvents = await ndk.fetchEvents({
			kinds: currentTargetKinds,
			authors: Array.from(currentPendingPubkeys),
			limit: 100
		})

		console.log(fetchedEvents.size, 'fetched events')

		if (fetchedEvents.size === 0) {
			fetchingStatus.set('complete')
			return false
		}

		const newEntries: PubkeyEventEntry[] = Array.from(fetchedEvents).map((event) => ({
			pubkey: event.pubkey,
			eventId: event.id,
			kind: event.kind!,
			createdAt: event.created_at!,
			content: event.content
		}))

		await pubkeyEventDB.pubkeyEvents.bulkPut(newEntries)

		events.update((map) => {
			newEntries.forEach((entry) => {
				const existingEntry = map.get(entry.pubkey)
				if (!existingEntry || entry.createdAt > existingEntry.createdAt) {
					map.set(entry.pubkey, entry)
				}
			})
			return map
		})

		pendingPubkeys.update((set) => {
			newEntries.forEach((entry) => set.delete(entry.pubkey))
			return set
		})

		fetchingStatus.set('idle')
		return true
	}

	const store = {
		subscribe: derived(
			[events, remainingCount, targetKinds, fetchingStatus],
			([$events, $remainingCount, $targetKinds, $fetchingStatus]) => ({
				events: $events,
				remainingCount: $remainingCount,
				targetKinds: $targetKinds,
				fetchingStatus: $fetchingStatus
			})
		).subscribe,
		fetchLatestEvents,
		fetchRemainingEvents,
		updateTargetKinds
	}

	return store
}

export const latestEventsStore = createLatestEventsStore()
```

# src/lib/components/stores/appDb.ts

```ts
// appDb.ts
import { db as ndkDb } from '@nostr-dev-kit/ndk-cache-dexie'
import Dexie from 'dexie'

export interface PubkeyEventEntry {
	pubkey: string
	eventId: string
	kind: number
	createdAt: number
	content: string
}

export class PubkeyEventDB extends Dexie {
	pubkeyEvents!: Dexie.Table<PubkeyEventEntry, string>

	constructor() {
		super('PubkeyEventDatabase')
		this.version(1).stores({
			pubkeyEvents: 'eventId, pubkey, kind, createdAt, [pubkey+kind]'
		})
	}
}

export const pubkeyEventDB = new PubkeyEventDB()

export async function syncWithNDKDb(): Promise<void> {
	const allEvents = await ndkDb.events.toArray()
	await pubkeyEventDB.pubkeyEvents.bulkPut(
		allEvents.map((event) => ({
			pubkey: event.pubkey,
			eventId: event.id,
			kind: event.kind,
			createdAt: event.createdAt,
			content: event.event
		}))
	)
}

export async function getLatestEventPerPubkey(pubkeys: string[]) {
	return pubkeyEventDB.pubkeyEvents
		.where('pubkey')
		.anyOf(pubkeys)
		.toArray()
		.then((events) => {
			const latestEvents = new Map<string, PubkeyEventEntry>()
			events.forEach((event) => {
				const existingEvent = latestEvents.get(event.pubkey)
				if (!existingEvent || event.createdAt > existingEvent.createdAt) {
					latestEvents.set(event.pubkey, event)
				}
			})
			return latestEvents
		})
}

export async function getLatestEventPerPubkeyAndKind(pubkeys: string[], kinds: number[] = [0, 3]) {
	return pubkeyEventDB.pubkeyEvents
		.where('pubkey')
		.anyOf(pubkeys)
		.and((event) => kinds.includes(event.kind))
		.toArray()
		.then((events) => {
			const latestEvents = new Map<string, PubkeyEventEntry>()
			events.forEach((event) => {
				const existingEvent = latestEvents.get(event.pubkey)
				if (!existingEvent || event.createdAt > existingEvent.createdAt) {
					latestEvents.set(event.pubkey, event)
				}
			})
			return latestEvents
		})
}
```

# src/lib/components/stores/ndk.ts

```ts
import type { NDKCacheAdapter } from '@nostr-dev-kit/ndk'
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie'
import NDKSvelte from '@nostr-dev-kit/ndk-svelte'
import { writable } from 'svelte/store'

let cacheAdapter: NDKCacheAdapter | undefined = undefined
export const defaulRelaysUrls: string[] = [
	// 'wss://nos.lol',
	// 'wss://relay.nostr.net',
	// 'wss://nostr.wine',
	'wss://purplepag.es',
	// 'wss://relay.damus.io'
	'wss://nostrelites.org'
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
	outboxRelayUrls: ['wss://purplepag.es', 'wss://relay.nos.social'],
	enableOutboxModel: true,
	autoConnectUserRelays: true,
	cacheAdapter
})

ndk.connect().then(() => console.log('ndk connected successfully'))

const ndkStore = writable(ndk)

export default ndkStore
```

# src/lib/components/ui/badge/badge.svelte

```svelte
<script lang="ts">
	import { type Variant, badgeVariants } from './index.js'
	import { cn } from '$lib/utils.js'

	let className: string | undefined | null = undefined
	export let href: string | undefined = undefined
	export let variant: Variant = 'default'
	export { className as class }
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={cn(badgeVariants({ variant, className }))}
	{...$$restProps}
>
	<slot />
</svelte:element>
```

# src/lib/components/ui/badge/index.ts

```ts
import { type VariantProps, tv } from 'tailwind-variants'
export { default as Badge } from './badge.svelte'

export const badgeVariants = tv({
	base: 'focus:ring-ring inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
			destructive:
				'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
			outline: 'text-foreground'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})

export type Variant = VariantProps<typeof badgeVariants>['variant']
```

# src/lib/components/ui/button/button.svelte

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

# src/lib/components/ui/button/index.ts

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

# src/lib/components/ui/card/card-content.svelte

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

# src/lib/components/ui/card/card-description.svelte

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

# src/lib/components/ui/card/card-footer.svelte

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

# src/lib/components/ui/card/card-header.svelte

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

# src/lib/components/ui/card/card-title.svelte

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

# src/lib/components/ui/card/card.svelte

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

# src/lib/components/ui/card/index.ts

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

# src/lib/components/ui/checkbox/checkbox.svelte

```svelte
<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from 'bits-ui'
	import Check from 'lucide-svelte/icons/check'
	import Minus from 'lucide-svelte/icons/minus'
	import { cn } from '$lib/utils.js'

	type $$Props = CheckboxPrimitive.Props
	type $$Events = CheckboxPrimitive.Events

	let className: $$Props['class'] = undefined
	export let checked: $$Props['checked'] = false
	export { className as class }
</script>

<CheckboxPrimitive.Root
	class={cn(
		'border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
		className
	)}
	bind:checked
	{...$$restProps}
	on:click
>
	<CheckboxPrimitive.Indicator
		class={cn('flex h-4 w-4 items-center justify-center text-current')}
		let:isChecked
		let:isIndeterminate
	>
		{#if isChecked}
			<Check class="h-3.5 w-3.5" />
		{:else if isIndeterminate}
			<Minus class="h-3.5 w-3.5" />
		{/if}
	</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
```

# src/lib/components/ui/checkbox/index.ts

```ts
import Root from './checkbox.svelte'
export {
	Root,
	//
	Root as Checkbox
}
```

# src/lib/components/ui/collapsible/collapsible-content.svelte

```svelte
<script lang="ts">
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui'
	import { slide } from 'svelte/transition'

	type $$Props = CollapsiblePrimitive.ContentProps

	export let transition: $$Props['transition'] = slide
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 150
	}
</script>

<CollapsiblePrimitive.Content {transition} {transitionConfig} {...$$restProps}>
	<slot />
</CollapsiblePrimitive.Content>
```

# src/lib/components/ui/collapsible/index.ts

```ts
import { Collapsible as CollapsiblePrimitive } from 'bits-ui'
import Content from './collapsible-content.svelte'

const Root = CollapsiblePrimitive.Root
const Trigger = CollapsiblePrimitive.Trigger

export {
	Root,
	Content,
	Trigger,
	//
	Root as Collapsible,
	Content as CollapsibleContent,
	Trigger as CollapsibleTrigger
}
```

# src/lib/components/ui/command/command-dialog.svelte

```svelte
<script lang="ts">
	import type { Dialog as DialogPrimitive } from 'bits-ui'
	import type { Command as CommandPrimitive } from 'cmdk-sv'
	import Command from './command.svelte'
	import * as Dialog from '$lib/components/ui/dialog/index.js'

	type $$Props = DialogPrimitive.Props & CommandPrimitive.CommandProps

	export let open: $$Props['open'] = false
	export let value: $$Props['value'] = undefined
</script>

<Dialog.Root bind:open {...$$restProps}>
	<Dialog.Content class="overflow-hidden p-0 shadow-lg">
		<Command
			class="[&_[data-cmdk-group-heading]]:text-muted-foreground [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group]:not([hidden])_~[data-cmdk-group]]:pt-0 [&_[data-cmdk-group]]:px-2 [&_[data-cmdk-input-wrapper]_svg]:h-5 [&_[data-cmdk-input-wrapper]_svg]:w-5 [&_[data-cmdk-input]]:h-12 [&_[data-cmdk-item]]:px-2 [&_[data-cmdk-item]]:py-3 [&_[data-cmdk-item]_svg]:h-5 [&_[data-cmdk-item]_svg]:w-5"
			{...$$restProps}
			bind:value
		>
			<slot />
		</Command>
	</Dialog.Content>
</Dialog.Root>
```

# src/lib/components/ui/command/command-empty.svelte

```svelte
<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv'
	import { cn } from '$lib/utils.js'

	type $$Props = CommandPrimitive.EmptyProps
	let className: string | undefined | null = undefined
	export { className as class }
</script>

<CommandPrimitive.Empty class={cn('py-6 text-center text-sm', className)} {...$$restProps}>
	<slot />
</CommandPrimitive.Empty>
```

# src/lib/components/ui/command/command-group.svelte

```svelte
<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv'
	import { cn } from '$lib/utils.js'
	type $$Props = CommandPrimitive.GroupProps

	let className: string | undefined | null = undefined
	export { className as class }
</script>

<CommandPrimitive.Group
	class={cn(
		'text-foreground [&_[data-cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:py-1.5 [&_[data-cmdk-group-heading]]:text-xs [&_[data-cmdk-group-heading]]:font-medium',
		className
	)}
	{...$$restProps}
>
	<slot />
</CommandPrimitive.Group>
```

# src/lib/components/ui/command/command-input.svelte

```svelte
<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv'
	import Search from 'lucide-svelte/icons/search'
	import { cn } from '$lib/utils.js'

	type $$Props = CommandPrimitive.InputProps

	let className: string | undefined | null = undefined
	export { className as class }
	export let value: string = ''
</script>

<div class="flex items-center border-b px-2" data-cmdk-input-wrapper="">
	<Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
	<CommandPrimitive.Input
		class={cn(
			'placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		{...$$restProps}
		bind:value
	/>
</div>
```

# src/lib/components/ui/command/command-item.svelte

```svelte
<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv'
	import { cn } from '$lib/utils.js'

	type $$Props = CommandPrimitive.ItemProps

	export let asChild = false

	let className: string | undefined | null = undefined
	export { className as class }
</script>

<CommandPrimitive.Item
	{asChild}
	class={cn(
		'aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
	{...$$restProps}
	let:action
	let:attrs
>
	<slot {action} {attrs} />
</CommandPrimitive.Item>
```

# src/lib/components/ui/command/command-list.svelte

```svelte
<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv'
	import { cn } from '$lib/utils.js'

	type $$Props = CommandPrimitive.ListProps
	let className: string | undefined | null = undefined
	export { className as class }
</script>

<CommandPrimitive.List
	class={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
	{...$$restProps}
>
	<slot />
</CommandPrimitive.List>
```

# src/lib/components/ui/command/command-separator.svelte

```svelte
<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv'
	import { cn } from '$lib/utils.js'

	type $$Props = CommandPrimitive.SeparatorProps
	let className: string | undefined | null = undefined
	export { className as class }
</script>

<CommandPrimitive.Separator class={cn('bg-border -mx-1 h-px', className)} {...$$restProps} />
```

# src/lib/components/ui/command/command-shortcut.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLSpanElement>

	let className: string | undefined | null = undefined
	export { className as class }
</script>

<span
	class={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
	{...$$restProps}
>
	<slot />
</span>
```

# src/lib/components/ui/command/command.svelte

```svelte
<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv'
	import { cn } from '$lib/utils.js'

	type $$Props = CommandPrimitive.CommandProps

	export let value: $$Props['value'] = undefined

	let className: string | undefined | null = undefined
	export { className as class }
</script>

<CommandPrimitive.Root
	class={cn(
		'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
		className
	)}
	bind:value
	{...$$restProps}
>
	<slot />
</CommandPrimitive.Root>
```

# src/lib/components/ui/command/index.ts

```ts
import { Command as CommandPrimitive } from 'cmdk-sv'

import Root from './command.svelte'
import Dialog from './command-dialog.svelte'
import Empty from './command-empty.svelte'
import Group from './command-group.svelte'
import Item from './command-item.svelte'
import Input from './command-input.svelte'
import List from './command-list.svelte'
import Separator from './command-separator.svelte'
import Shortcut from './command-shortcut.svelte'

const Loading = CommandPrimitive.Loading

export {
	Root,
	Dialog,
	Empty,
	Group,
	Item,
	Input,
	List,
	Separator,
	Shortcut,
	Loading,
	//
	Root as Command,
	Dialog as CommandDialog,
	Empty as CommandEmpty,
	Group as CommandGroup,
	Item as CommandItem,
	Input as CommandInput,
	List as CommandList,
	Separator as CommandSeparator,
	Shortcut as CommandShortcut,
	Loading as CommandLoading
}
```

# src/lib/components/ui/dialog/dialog-content.svelte

```svelte
<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui'
	import X from 'lucide-svelte/icons/x'
	import * as Dialog from './index.js'
	import { cn, flyAndScale } from '$lib/utils.js'

	type $$Props = DialogPrimitive.ContentProps

	let className: $$Props['class'] = undefined
	export let transition: $$Props['transition'] = flyAndScale
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 200
	}
	export { className as class }
</script>

<Dialog.Portal>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			'bg-background fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg sm:rounded-lg md:w-full',
			className
		)}
		{...$$restProps}
	>
		<slot />
		<DialogPrimitive.Close
			class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</Dialog.Portal>
```

# src/lib/components/ui/dialog/dialog-description.svelte

```svelte
<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils.js'

	type $$Props = DialogPrimitive.DescriptionProps

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<DialogPrimitive.Description
	class={cn('text-muted-foreground text-sm', className)}
	{...$$restProps}
>
	<slot />
</DialogPrimitive.Description>
```

# src/lib/components/ui/dialog/dialog-footer.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLDivElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<div
	class={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
	{...$$restProps}
>
	<slot />
</div>
```

# src/lib/components/ui/dialog/dialog-header.svelte

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLAttributes<HTMLDivElement>

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<div class={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...$$restProps}>
	<slot />
</div>
```

# src/lib/components/ui/dialog/dialog-overlay.svelte

```svelte
<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui'
	import { fade } from 'svelte/transition'
	import { cn } from '$lib/utils.js'

	type $$Props = DialogPrimitive.OverlayProps

	let className: $$Props['class'] = undefined
	export let transition: $$Props['transition'] = fade
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 150
	}
	export { className as class }
</script>

<DialogPrimitive.Overlay
	{transition}
	{transitionConfig}
	class={cn('bg-background/80 fixed inset-0 z-50 backdrop-blur-sm', className)}
	{...$$restProps}
/>
```

# src/lib/components/ui/dialog/dialog-portal.svelte

```svelte
<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui'
	type $$Props = DialogPrimitive.PortalProps
</script>

<DialogPrimitive.Portal {...$$restProps}>
	<slot />
</DialogPrimitive.Portal>
```

# src/lib/components/ui/dialog/dialog-title.svelte

```svelte
<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils.js'

	type $$Props = DialogPrimitive.TitleProps

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<DialogPrimitive.Title
	class={cn('text-lg font-semibold leading-none tracking-tight', className)}
	{...$$restProps}
>
	<slot />
</DialogPrimitive.Title>
```

# src/lib/components/ui/dialog/index.ts

```ts
import { Dialog as DialogPrimitive } from 'bits-ui'

import Title from './dialog-title.svelte'
import Portal from './dialog-portal.svelte'
import Footer from './dialog-footer.svelte'
import Header from './dialog-header.svelte'
import Overlay from './dialog-overlay.svelte'
import Content from './dialog-content.svelte'
import Description from './dialog-description.svelte'

const Root = DialogPrimitive.Root
const Trigger = DialogPrimitive.Trigger
const Close = DialogPrimitive.Close

export {
	Root,
	Title,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	Close,
	//
	Root as Dialog,
	Title as DialogTitle,
	Portal as DialogPortal,
	Footer as DialogFooter,
	Header as DialogHeader,
	Trigger as DialogTrigger,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Description as DialogDescription,
	Close as DialogClose
}
```

# src/lib/components/ui/input/index.ts

```ts
import Root from './input.svelte'

export type FormInputEvent<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLInputElement
}
export type InputEvents = {
	blur: FormInputEvent<FocusEvent>
	change: FormInputEvent<Event>
	click: FormInputEvent<MouseEvent>
	focus: FormInputEvent<FocusEvent>
	focusin: FormInputEvent<FocusEvent>
	focusout: FormInputEvent<FocusEvent>
	keydown: FormInputEvent<KeyboardEvent>
	keypress: FormInputEvent<KeyboardEvent>
	keyup: FormInputEvent<KeyboardEvent>
	mouseover: FormInputEvent<MouseEvent>
	mouseenter: FormInputEvent<MouseEvent>
	mouseleave: FormInputEvent<MouseEvent>
	mousemove: FormInputEvent<MouseEvent>
	paste: FormInputEvent<ClipboardEvent>
	input: FormInputEvent<InputEvent>
	wheel: FormInputEvent<WheelEvent>
}

export {
	Root,
	//
	Root as Input
}
```

# src/lib/components/ui/input/input.svelte

```svelte
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import type { InputEvents } from './index.js'
	import { cn } from '$lib/utils.js'

	type $$Props = HTMLInputAttributes
	type $$Events = InputEvents

	let className: $$Props['class'] = undefined
	export let value: $$Props['value'] = undefined
	export { className as class }

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props['readonly'] = undefined
</script>

<input
	class={cn(
		'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:value
	{readonly}
	on:blur
	on:change
	on:click
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:paste
	on:input
	on:wheel|passive
	{...$$restProps}
/>
```

# src/lib/components/ui/label/index.ts

```ts
import Root from './label.svelte'

export {
	Root,
	//
	Root as Label
}
```

# src/lib/components/ui/label/label.svelte

```svelte
<script lang="ts">
	import { Label as LabelPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils.js'

	type $$Props = LabelPrimitive.Props
	type $$Events = LabelPrimitive.Events

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<LabelPrimitive.Root
	class={cn(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	)}
	{...$$restProps}
	on:mousedown
>
	<slot />
</LabelPrimitive.Root>
```

# src/lib/components/ui/popover/index.ts

```ts
import { Popover as PopoverPrimitive } from 'bits-ui'
import Content from './popover-content.svelte'
const Root = PopoverPrimitive.Root
const Trigger = PopoverPrimitive.Trigger
const Close = PopoverPrimitive.Close

export {
	Root,
	Content,
	Trigger,
	Close,
	//
	Root as Popover,
	Content as PopoverContent,
	Trigger as PopoverTrigger,
	Close as PopoverClose
}
```

# src/lib/components/ui/popover/popover-content.svelte

```svelte
<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui'
	import { cn, flyAndScale } from '$lib/utils.js'

	type $$Props = PopoverPrimitive.ContentProps
	let className: $$Props['class'] = undefined
	export let transition: $$Props['transition'] = flyAndScale
	export let transitionConfig: $$Props['transitionConfig'] = undefined
	export { className as class }
</script>

<PopoverPrimitive.Content
	{transition}
	{transitionConfig}
	class={cn(
		'bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none',
		className
	)}
	{...$$restProps}
>
	<slot />
</PopoverPrimitive.Content>
```

# src/lib/components/ui/select/index.ts

```ts
import { Select as SelectPrimitive } from 'bits-ui'

import Label from './select-label.svelte'
import Item from './select-item.svelte'
import Content from './select-content.svelte'
import Trigger from './select-trigger.svelte'
import Separator from './select-separator.svelte'

const Root = SelectPrimitive.Root
const Group = SelectPrimitive.Group
const Input = SelectPrimitive.Input
const Value = SelectPrimitive.Value

export {
	Root,
	Group,
	Input,
	Label,
	Item,
	Value,
	Content,
	Trigger,
	Separator,
	//
	Root as Select,
	Group as SelectGroup,
	Input as SelectInput,
	Label as SelectLabel,
	Item as SelectItem,
	Value as SelectValue,
	Content as SelectContent,
	Trigger as SelectTrigger,
	Separator as SelectSeparator
}
```

# src/lib/components/ui/select/select-content.svelte

```svelte
<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui'
	import { scale } from 'svelte/transition'
	import { cn, flyAndScale } from '$lib/utils.js'

	type $$Props = SelectPrimitive.ContentProps
	type $$Events = SelectPrimitive.ContentEvents

	export let sideOffset: $$Props['sideOffset'] = 4
	export let inTransition: $$Props['inTransition'] = flyAndScale
	export let inTransitionConfig: $$Props['inTransitionConfig'] = undefined
	export let outTransition: $$Props['outTransition'] = scale
	export let outTransitionConfig: $$Props['outTransitionConfig'] = {
		start: 0.95,
		opacity: 0,
		duration: 50
	}

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<SelectPrimitive.Content
	{inTransition}
	{inTransitionConfig}
	{outTransition}
	{outTransitionConfig}
	{sideOffset}
	class={cn(
		'bg-popover text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md outline-none',
		className
	)}
	{...$$restProps}
	on:keydown
>
	<div class="w-full p-1">
		<slot />
	</div>
</SelectPrimitive.Content>
```

# src/lib/components/ui/select/select-item.svelte

```svelte
<script lang="ts">
	import Check from 'lucide-svelte/icons/check'
	import { Select as SelectPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils.js'

	type $$Props = SelectPrimitive.ItemProps
	type $$Events = SelectPrimitive.ItemEvents

	let className: $$Props['class'] = undefined
	export let value: $$Props['value']
	export let label: $$Props['label'] = undefined
	export let disabled: $$Props['disabled'] = undefined
	export { className as class }
</script>

<SelectPrimitive.Item
	{value}
	{disabled}
	{label}
	class={cn(
		'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerleave
	on:pointermove
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		<SelectPrimitive.ItemIndicator>
			<Check class="h-4 w-4" />
		</SelectPrimitive.ItemIndicator>
	</span>
	<slot>
		{label || value}
	</slot>
</SelectPrimitive.Item>
```

# src/lib/components/ui/select/select-label.svelte

```svelte
<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils.js'

	type $$Props = SelectPrimitive.LabelProps

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<SelectPrimitive.Label
	class={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
	{...$$restProps}
>
	<slot />
</SelectPrimitive.Label>
```

# src/lib/components/ui/select/select-separator.svelte

```svelte
<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils.js'

	type $$Props = SelectPrimitive.SeparatorProps

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<SelectPrimitive.Separator class={cn('bg-muted -mx-1 my-1 h-px', className)} {...$$restProps} />
```

# src/lib/components/ui/select/select-trigger.svelte

```svelte
<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui'
	import ChevronDown from 'lucide-svelte/icons/chevron-down'
	import { cn } from '$lib/utils.js'

	type $$Props = SelectPrimitive.TriggerProps
	type $$Events = SelectPrimitive.TriggerEvents

	let className: $$Props['class'] = undefined
	export { className as class }
</script>

<SelectPrimitive.Trigger
	class={cn(
		'border-input bg-background ring-offset-background focus-visible:ring-ring aria-[invalid]:border-destructive data-[placeholder]:[&>span]:text-muted-foreground flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
		className
	)}
	{...$$restProps}
	let:builder
	on:click
	on:keydown
>
	<slot {builder} />
	<div>
		<ChevronDown class="h-4 w-4 opacity-50" />
	</div>
</SelectPrimitive.Trigger>
```

# src/lib/ndkLogin.ts

```ts
// src/lib/ndkLogin.ts
import { NDKNip07Signer, NDKSubscriptionCacheUsage, NDKUser } from '@nostr-dev-kit/ndk'
import ndkStore, { ndk } from './components/stores/ndk'

export async function loginWithExtension(): Promise<boolean> {
	try {
		const signer = new NDKNip07Signer()
		console.log('Waiting for NIP-07 signer')
		await signer.blockUntilReady()
		ndk.signer = signer
		ndkStore.set(ndk)
		await fetchActiveUserData()
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

export function isLoggedIn(): boolean {
	return !!ndk.signer
}
```

# src/lib/queries/client.ts

```ts
import { browser } from '$app/environment'
import { QueryClient, type CreateQueryResult } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: browser,
			staleTime: 5 * 60 * 1000, // 5 minutes
			refetchOnWindowFocus: false,
			refetchOnReconnect: true
		}
	}
})
```

# src/lib/queries/events.query.ts

```ts
import ndkStore from '$lib/components/stores/ndk'
import { NDKSubscriptionCacheUsage, type NDKEvent, type NDKFilter } from '@nostr-dev-kit/ndk'
import { createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import { queryClient } from './client'

export const latestEventQueryKey = (pubkey: string) => ['latestEvent', pubkey]
export const createLatestEventQuery = (pubkey: string) =>
	createQuery<NDKEvent | null>(
		{
			queryKey: ['latestEvent', pubkey],
			queryFn: async () => {
				const $ndkStore = get(ndkStore)

				const filter: NDKFilter = { kinds: [1], authors: [pubkey] }

				const cachedEvent = await $ndkStore.fetchEvent(filter, {
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
				})

				if (cachedEvent) {
					return cachedEvent
				}

				const eventFromRelay = await $ndkStore.fetchEvent(filter, {
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
					groupable: true
				})

				if (!eventFromRelay) {
					console.log('Profile not found', pubkey)
					throw Error('Profile not found')
				}

				return eventFromRelay
			},
			staleTime: 5 * 60 * 1000, // 5 minutes
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
		},
		queryClient
	)
```

# src/lib/queries/follows.query.ts

```ts
// src/lib/queries/follows.query.ts
import { QueryClient, createQuery } from '@tanstack/svelte-query'
import { get } from 'svelte/store'
import ndkStore from '$lib/components/stores/ndk'
import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk'
import { NDKKind, NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk'
import { queryClient } from './client'

export const followsQueryKey = (pubkey: string) => ['follows', pubkey]
export const profileQueryKey = (pubkey: string) => ['profile', pubkey]

export const createUserFollowsByIdQuery = (pubkey: string) =>
	createQuery<Set<NDKUser> | null>(
		{
			queryKey: followsQueryKey(pubkey),
			queryFn: async () => {
				const $ndkStore = get(ndkStore)
				if (!$ndkStore.activeUser) return null

				const cachedFollows = await $ndkStore.activeUser.follows({
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
				})

				if (cachedFollows && cachedFollows.size > 0) {
					return cachedFollows
				}

				const followsFromRelay = await $ndkStore.activeUser.follows({
					cacheUsage: NDKSubscriptionCacheUsage.PARALLEL
				})
				console.log(followsFromRelay)
				if (!followsFromRelay) {
					console.log('Follows not found', pubkey)
					throw Error('Follows not found')
				}
				return followsFromRelay
			},
			staleTime: 5 * 60 * 1000, // 5 minutes
			retry: 3,
			enabled: !!pubkey,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
		},
		queryClient
	)

export function getTypedFollowsQueryData(
	queryClient: QueryClient,
	pubkey: string
): Set<NDKUser> | null | undefined {
	return queryClient.getQueryData<Set<NDKUser> | null>(followsQueryKey(pubkey))
}
export class ProfileNotFoundError extends Error {
	constructor(pubkey: string) {
		super(`Profile not found for ${pubkey}`)
		this.name = 'ProfileNotFoundError'
	}
}

export const createProfileQuery = (pubkey: string) =>
	createQuery<NDKUserProfile | null>(
		{
			queryKey: profileQueryKey(pubkey),
			queryFn: async () => {
				const $ndkStore = get(ndkStore)
				const user = $ndkStore.getUser({ pubkey })

				// First try cache
				const cachedProfile = await user.fetchProfile({
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_CACHE
				})

				if (cachedProfile) {
					return cachedProfile
				}

				// Then try relays
				const profileFromRelays = await user.fetchProfile({
					cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
					groupable: true
				})

				if (!profileFromRelays) {
					throw new ProfileNotFoundError(pubkey)
				}

				return profileFromRelays
			},
			retry: (failureCount, error) => {
				if (error instanceof ProfileNotFoundError) {
					return false
				}
				return failureCount < 3
			},
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			staleTime: 5 * 60 * 1000, // 5 minutes
			enabled: !!get(ndkStore).activeUser
		},
		queryClient
	)

export const getProfileName = (profile: NDKUserProfile | null | undefined): string =>
	profile?.name ||
	profile?.displayName ||
	profile?.nip05 ||
	(profile?.pubkey as string) ||
	'Unnamed user'

export function getTypedProfileQueryData(
	queryClient: QueryClient,
	pubkey: string
): NDKUserProfile | null | undefined {
	return queryClient.getQueryData<NDKUserProfile | null>(profileQueryKey(pubkey))
}
```

# src/lib/subs.ts

```ts
import type { NDKEvent, NostrEvent } from '@nostr-dev-kit/ndk'
import type { ExtendedBaseType, NDKEventStore } from '@nostr-dev-kit/ndk-svelte'
import { ndk } from './components/stores/ndk'
import { derived, writable, type Readable } from 'svelte/store'
import { db } from '@nostr-dev-kit/ndk-cache-dexie'

export const followsStore = writable<string[]>([])

export const notesSub: NDKEventStore<ExtendedBaseType<NDKEvent>> = ndk.storeSubscribe(
	{},
	{ closeOnEose: false, autoStart: false }
)

export const combinedActivityStore: Readable<{
	follows: string[]
	notes: Map<string, NDKEvent>
	filledPercentage: number
	pendingPubkeys: string[]
}> = derived([followsStore, notesSub], ([$followsStore, $notesSub]) => {
	const follows = $followsStore
	const notes = new Map<string, NDKEvent>()

	for (const event of $notesSub) {
		if (!notes.has(event.pubkey) || event.created_at! > notes.get(event.pubkey)!.created_at!) {
			notes.set(event.pubkey, event)
		}
	}

	const pendingPubkeys = follows.filter((pubkey) => !notes.has(pubkey))
	const filledPercentage =
		follows.length > 0 ? ((follows.length - pendingPubkeys.length) / follows.length) * 100 : 0

	return {
		follows,
		notes,
		filledPercentage,
		pendingPubkeys
	}
})

export async function populateEventsFromDexie(pubkeys: string[]): Promise<Map<string, NDKEvent>> {
	const events = await db.events
		.where('kind')
		.equals(1)
		.and((event) => pubkeys.includes(event.pubkey))
		.toArray()

	const notesMap = new Map<string, NDKEvent>()
	events.forEach((event) => {
		if (
			!notesMap.has(event.pubkey) ||
			event.created_at! > notesMap.get(event.pubkey)!.created_at!
		) {
			notesMap.set(event.pubkey, event as unknown as NDKEvent)
		}
	})

	return notesMap
}
```

# src/lib/utils.ts

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

export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}
```

# src/lib/utils/date.utils.ts

```ts
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns'

export function formatDate(timestamp: number | undefined): string {
	return timestamp ? format(fromUnixTime(timestamp), 'PPP') : 'Unknown'
}

export function formatRelativeTime(timestamp: number | undefined): string {
	return timestamp ? formatDistanceToNow(fromUnixTime(timestamp), { addSuffix: true }) : 'Unknown'
}
```

# src/lib/utils/queries.utils.ts

```ts
import type { CreateQueryResult } from '@tanstack/svelte-query'
import { get } from 'svelte/store'

export async function resolveQuery<T>(
	queryFn: () => CreateQueryResult<T, Error>,
	timeout: number = 1000 * 60
): Promise<T> {
	const startTime = Date.now()
	const query = queryFn()
	let currentQuery = get(query)

	while (!currentQuery.isSuccess && !currentQuery.isError) {
		if (Date.now() - startTime > timeout) {
			throw new Error('Query timed out')
		}
		await new Promise((resolve) => setTimeout(resolve, 5))
		currentQuery = get(query)
	}

	if (currentQuery.isFetched && !currentQuery.isError) {
		return currentQuery.data
	}

	throw currentQuery.error || new Error('Price query failed')
}
```

# src/routes/+layout.svelte

```svelte
<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { goto } from '$app/navigation'
	import ndkStore from '$lib/components/stores/ndk'
	import { queryClient } from '$lib/queries/client'
	import { createUserFollowsByIdQuery } from '$lib/queries/follows.query'
	import '../app.css'
	import { contactLoader } from '$lib/components/services/contact-loader'
	import Header from '$lib/components/header.svelte'

	let loadingProgress = contactLoader.getProgress()

	$: userFollows = $ndkStore.activeUser?.pubkey
		? createUserFollowsByIdQuery($ndkStore.activeUser!.pubkey)
		: undefined

	async function initializeUserData() {
		if ($userFollows?.data) {
			const contacts = Array.from($userFollows.data)
			await contactLoader.loadContacts(contacts)
		}
	}

	$: if ($userFollows?.data && $loadingProgress.loaded === 0) {
		initializeUserData()
	}

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

# src/routes/+page.svelte

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

# src/routes/login/+page.svelte

```svelte
<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation'
	import { loginWithExtension } from '$lib/ndkLogin'
	import { Button } from '$lib/components/ui/button'
	import ndkStore from '$lib/components/stores/ndk'

	async function handleLogin() {
		const loginResult = await loginWithExtension()
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

# src/routes/p/[pubkey]/+page.svelte

```svelte
<script lang="ts">
	import { page } from '$app/stores'
	import ContactListVisualizer from '$lib/components/contactListVisualizer.svelte'
	import { contactLoader } from '$lib/components/services/contact-loader'
	import { createProfileQuery, getProfileName } from '$lib/queries/follows.query'

	const pubkey = $page.params.pubkey
	let loadingProgress = contactLoader.getProgress()

	$: profileQuery = createProfileQuery(pubkey)
</script>

{#if $profileQuery.isLoading}
	<p>Loading profile...</p>
{:else if $profileQuery.isError}
	<p>Error loading profile</p>
{:else}
	<h1 class="text-3xl font-bold mb-6">{getProfileName($profileQuery.data)}'s Contacts</h1>
	{$loadingProgress.loaded} / {$loadingProgress.total}

	<ContactListVisualizer {pubkey} />
{/if}
```

# static/favicon.png

This is a binary file of the type: Image

# svelte.config.js

```js
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	alias: {
		'@/*': './path/to/lib/*'
	}
}

export default config
```

# tailwind.config.js

```js
import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	}
}

export default config
```

# tsconfig.json

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
	// Path aliases are handled by https://kit.svelte.dev/docs/configuration#alias
	// except $lib which is handled by https://kit.svelte.dev/docs/configuration#files
	//
	// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
	// from the referenced tsconfig.json - TypeScript does not merge them in
}
```

# vite.config.ts

```ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()]
})
```
