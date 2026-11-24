<script lang="ts">
  import * as m from "$paraglide/messages";
  import { Button } from "$lib/components/ui/button";
  import * as ButtonGroup from "$lib/components/ui/button-group";
  import type { InfoLang } from "$lib/info/sections";
  import Pencil from "@lucide/svelte/icons/pencil";
  import Settings from "@lucide/svelte/icons/settings";

  let {
    editing = $bindable(false),
    lang = $bindable(),
    dirty = false,
    saving = false,
    onsave,
    ondiscard,
    onsettings,
  }: {
    editing?: boolean;
    /** The language being edited. Independent of the language of the site. */
    lang: InfoLang;
    dirty?: boolean;
    saving?: boolean;
    onsave: () => void;
    ondiscard: () => void;
    onsettings: () => void;
  } = $props();
</script>

{#if editing}
  <div
    class="bg-background md-nav:bottom-4 fixed right-4 bottom-20 z-50 flex items-center gap-3 rounded-xl border p-2 shadow-lg"
  >
    <span class="text-muted-foreground px-2 text-sm"
      >{dirty ? m.info_edit_unsaved() : m.info_edit_editing()}</span
    >
    <ButtonGroup.Root aria-label={m.info_edit_language()}>
      <Button
        size="sm"
        variant={lang === "sv" ? "rosa" : "outline"}
        onclick={() => (lang = "sv")}>{m.language_swedish()}</Button
      >
      <Button
        size="sm"
        variant={lang === "en" ? "rosa" : "outline"}
        onclick={() => (lang = "en")}>{m.language_english()}</Button
      >
    </ButtonGroup.Root>
    <Button
      variant="outline"
      size="icon"
      aria-label={m.info_edit_settings()}
      onclick={onsettings}><Settings /></Button
    >
    <Button variant="outline" onclick={ondiscard} disabled={saving}
      >{m.cancel()}</Button
    >
    <Button onclick={onsave} disabled={!dirty || saving}>{m.save()}</Button>
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
