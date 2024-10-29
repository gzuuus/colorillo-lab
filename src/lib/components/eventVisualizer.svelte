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