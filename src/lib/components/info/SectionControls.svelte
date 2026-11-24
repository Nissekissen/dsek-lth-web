<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import * as Select from "$lib/components/ui/select";
  import { Button } from "$lib/components/ui/button";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import ChevronUp from "@lucide/svelte/icons/chevron-up";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import {
    SECTION_STYLES,
    type InfoSection,
    type SectionStyle,
  } from "$lib/info/sections";

  // TODO: move to Paraglide messages together with the other strings.
  const STYLE_LABELS: Record<SectionStyle, string> = {
    hero: "Toppsektion",
    category: "Kategori",
    "image-left": "Bild till vänster",
    "image-right": "Bild till höger",
    "image-center": "Bild i mitten",
    text: "Text",
    footer: "Sidfot",
  };

  let {
    section = $bindable(),
    locked = false,
    first = false,
    last = false,
    onmove,
    ondelete,
    class: klass,
  }: {
    section: InfoSection;
    /** Hero and footer keep their place and can't be deleted. */
    locked?: boolean;
    first?: boolean;
    last?: boolean;
    onmove: (delta: -1 | 1) => void;
    ondelete: () => void;
    class?: string;
  } = $props();

  let deleteOpen = $state(false);
</script>

<div
  class={[
    "bg-background flex items-center gap-1 rounded-lg border p-1 shadow-md",
    klass,
  ]}
>
  <Select.Root
    type="single"
    value={section.style}
    onValueChange={(value) => (section.style = value as SectionStyle)}
  >
    <Select.Trigger size="sm" class="w-36">
      {STYLE_LABELS[section.style]}
    </Select.Trigger>
    <Select.Content>
      {#each SECTION_STYLES as style (style)}
        <Select.Item value={style}>{STYLE_LABELS[style]}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>

  {#if !locked}
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Flytta upp"
      disabled={first}
      onclick={() => onmove(-1)}
    >
      <ChevronUp />
    </Button>
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Flytta ner"
      disabled={last}
      onclick={() => onmove(1)}
    >
      <ChevronDown />
    </Button>

    <AlertDialog.Root bind:open={deleteOpen}>
      <AlertDialog.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="ghost"
            size="icon-sm"
            aria-label="Ta bort avsnitt"
          >
            <Trash2 />
          </Button>
        {/snippet}
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Ta bort avsnitt?</AlertDialog.Title>
          <AlertDialog.Description>
            Avsnittet tas bort från sidan. Du kan ångra det med Avbryt innan du
            sparar.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Avbryt</AlertDialog.Cancel>
          <AlertDialog.Action
            onclick={() => {
              deleteOpen = false;
              ondelete();
            }}>Ta bort</AlertDialog.Action
          >
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  {/if}
</div>
