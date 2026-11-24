<script lang="ts">
  import * as m from "$paraglide/messages";
  import FileUpload from "$lib/components/FileUpload.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  let {
    open = $bindable(false),
    image = $bindable(),
    imageAlt = $bindable(),
    showAlt = true,
    removeLabel = m.info_edit_image_remove(),
  }: {
    open?: boolean;
    image?: string;
    imageAlt?: string;
    showAlt?: boolean;
    removeLabel?: string;
  } = $props();

  let files = $state<FileList | undefined>();

  // FileUpload fills `files` for the file input, drops and the URL dialog.
  // Turn the picked file into a data URL for now. Uploading it to storage
  // happens on the server once the page can be saved for real.
  $effect(() => {
    const file = files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") image = reader.result;
      open = false;
    };
    reader.readAsDataURL(file);
    // Clear the input so the same file can be picked again.
    files = new DataTransfer().files;
  });

  const removeImage = () => {
    image = undefined;
    imageAlt = undefined;
    open = false;
  };
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{m.info_edit_image_title()}</Dialog.Title>
      <Dialog.Description>
        {m.info_edit_image_description()}
      </Dialog.Description>
    </Dialog.Header>

    <FileUpload bind:files accept="image/*" />

    {#if showAlt}
      <div class="flex flex-col gap-2">
        <Label for="image-alt">{m.info_edit_image_alt()}</Label>
        <Input
          id="image-alt"
          bind:value={imageAlt}
          placeholder={m.info_edit_image_alt_placeholder()}
        />
      </div>
    {/if}

    {#if image}
      <Dialog.Footer>
        <Button variant="outline" onclick={removeImage}>{removeLabel}</Button>
      </Dialog.Footer>
    {/if}
  </Dialog.Content>
</Dialog.Root>
