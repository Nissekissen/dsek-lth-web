<script lang="ts">
  import FileUpload from "$lib/components/FileUpload.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
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
  let files = $state<FileList | undefined>();

  $effect(() => {
    const file = files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") image = reader.result;
      open = false;
    };
    reader.readAsDataURL(file);
    files = new DataTransfer().files;
  });

  const removeImage = () => {
    image = undefined;
    imageAlt = undefined;
    open = false;
  };
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
      {image ? "Byt bild" : "Lägg till bild"}
    </button>
  {/if}
</div>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Välj bild</Dialog.Title>
      <Dialog.Description>
        Ladda upp en fil eller ange en länk till en bild.
      </Dialog.Description>
    </Dialog.Header>

    <FileUpload bind:files accept="image/*" />

    <div class="flex flex-col gap-2">
      <Label for="image-alt">Alternativ text</Label>
      <Input
        id="image-alt"
        bind:value={imageAlt}
        placeholder="Beskriv bilden för den som inte kan se den"
      />
    </div>

    {#if image}
      <Dialog.Footer>
        <Button variant="outline" onclick={removeImage}>Ta bort bild</Button>
      </Dialog.Footer>
    {/if}
  </Dialog.Content>
</Dialog.Root>
