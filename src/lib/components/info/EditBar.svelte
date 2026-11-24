<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Pencil from "@lucide/svelte/icons/pencil";

  let {
    editing = $bindable(false),
    dirty = false,
    onsave,
    ondiscard,
  }: {
    editing?: boolean;
    dirty?: boolean;
    onsave: () => void;
    ondiscard: () => void;
  } = $props();
</script>

{#if editing}
  <div class="bg-background fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-xl border p-2 shadow-lg">
    <span class="text-muted-foreground px-2 text-sm">{dirty ? "Osparade ändringar" : "Redigerar"}</span>
    <Button variant="outline" onclick={ondiscard}>Avbryt</Button>
    <Button onclick={onsave} disabled={!dirty}>Spara</Button>
  </div>
{:else}
  <Button class="fixed right-4 bottom-4 z-50" onclick={() => (editing = true)}>
    <Pencil />
    Redigera sida
  </Button>
{/if}
