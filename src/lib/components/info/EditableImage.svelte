<script lang="ts">
  import * as m from "$paraglide/messages";
  import ImagePickerDialog from "$lib/components/info/ImagePickerDialog.svelte";
  import { cn } from "$lib/utils";

  let {
    image = $bindable(),
    imageAlt = $bindable(),
    editing = false,
    class: klass,
    placeholderClass,
  }: {
    image?: string;
    imageAlt?: string;
    editing?: boolean;
    class?: string;
    /** Only used while there is no image, since an image sets its own height. */
    placeholderClass?: string;
  } = $props();

  let open = $state(false);
</script>

<div class={cn("relative w-full", klass)}>
  {#if image}
    <img
      src={image}
      alt={imageAlt ?? ""}
      loading="lazy"
      class="bg-muted h-auto w-full rounded-lg shadow-lg"
    />
  {:else}
    <div
      class={cn(
        "bg-muted size-full rounded-lg border-2 border-dashed shadow-lg",
        placeholderClass,
      )}
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
