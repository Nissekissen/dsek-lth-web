<script lang="ts">
  import * as m from "$paraglide/messages";
  import ImagePickerDialog from "$lib/components/info/ImagePickerDialog.svelte";
  import { cn } from "$lib/utils";

  let {
    image = $bindable(),
    imageAlt = $bindable(),
    editing = false,
    class: klass,
  }: {
    image?: string;
    imageAlt?: string;
    editing?: boolean;
    class?: string;
  } = $props();

  let open = $state(false);
</script>

<div class={cn("relative w-full", klass)}>
  {#if image}
    <img
      src={image}
      alt={imageAlt ?? ""}
      loading="lazy"
      class="bg-muted size-full rounded-lg object-cover shadow-lg"
    />
  {:else}
    <div
      class="bg-muted size-full rounded-lg border-2 border-dashed shadow-lg"
    ></div>
  {/if}

  {#if editing}
    <button
      type="button"
      onclick={() => (open = true)}
      class={cn(
        "absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-opacity",
        image
          ? "bg-black/50 text-white opacity-0 hover:opacity-100 focus-visible:opacity-100"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {image ? m.info_edit_image_change() : m.info_edit_image_add()}
    </button>
  {/if}
</div>

<ImagePickerDialog bind:open bind:image bind:imageAlt />
