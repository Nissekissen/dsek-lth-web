<script lang="ts">
  import * as m from "$paraglide/messages";
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
  <div
    class="bg-background md-nav:bottom-4 fixed right-4 bottom-20 z-50 flex items-center gap-3 rounded-xl border p-2 shadow-lg"
  >
    <span class="text-muted-foreground px-2 text-sm"
      >{dirty ? m.info_edit_unsaved() : m.info_edit_editing()}</span
    >
    <Button variant="outline" onclick={ondiscard}>{m.cancel()}</Button>
    <Button onclick={onsave} disabled={!dirty}>{m.save()}</Button>
  </div>
{:else}
  <Button
    class="md-nav:bottom-4 fixed right-4 bottom-20 z-50"
    onclick={() => (editing = true)}
  >
    <Pencil />
    {m.info_edit_start()}
  </Button>
{/if}
