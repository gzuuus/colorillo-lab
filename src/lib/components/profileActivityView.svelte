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