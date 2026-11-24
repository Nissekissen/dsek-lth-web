<script lang="ts">
  import * as m from "$paraglide/messages";
  import FileUpload from "$lib/components/FileUpload.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { toast } from "$lib/stores/toast";

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
  let uploading = $state(false);

  // FileUpload fills `files` for the file input, drops and the URL dialog.
  // The file is uploaded right away so the draft only ever holds a url.
  $effect(() => {
    const file = files?.[0];
    if (!file) return;
    // Clear the input so the same file can be picked again.
    files = new DataTransfer().files;
    void upload(file);
  });

  const upload = async (file: File) => {
    uploading = true;
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/info/upload", { method: "POST", body });
      if (!res.ok) throw new Error(await res.text());
      image = (await res.json()).url;
      open = false;
    } catch {
      toast(m.info_edit_upload_failed(), "error");
    } finally {
      uploading = false;
    }
  };

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

    <FileUpload bind:files accept="image/*" disabled={uploading} />

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
