<script lang="ts">
  import * as m from "$paraglide/messages";
  import { Button } from "$lib/components/ui/button";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import type { PageSettings } from "$lib/info/sections";

  let {
    open = $bindable(false),
    settings = $bindable(),
    slug,
    canDelete = false,
    ondelete,
  }: {
    open?: boolean;
    settings: PageSettings;
    slug: string;
    canDelete?: boolean;
    ondelete: () => void;
  } = $props();

  let deleteOpen = $state(false);
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{m.info_edit_settings()}</Dialog.Title>
      <Dialog.Description>/info/{slug}</Dialog.Description>
    </Dialog.Header>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <Label for="title-sv">{m.info_edit_title_sv()}</Label>
        <Input id="title-sv" bind:value={settings.titleSv} />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="title-en">{m.info_edit_title_en()}</Label>
        <Input id="title-en" bind:value={settings.titleEn} />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="aliases">{m.info_edit_aliases()}</Label>
        <Input id="aliases" bind:value={settings.aliases} />
        <p class="text-muted-foreground text-sm">
          {m.info_edit_aliases_help()}
        </p>
      </div>
    </div>

    <Dialog.Footer>
      {#if canDelete}
        <Button variant="destructive" onclick={() => (deleteOpen = true)}
          >{m.info_edit_delete_page()}</Button
        >
      {/if}
      <Button onclick={() => (open = false)}>{m.info_edit_done()}</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root bind:open={deleteOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{m.info_edit_delete_page_title()}</AlertDialog.Title>
      <AlertDialog.Description>
        {m.info_edit_delete_page_description()}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>{m.cancel()}</AlertDialog.Cancel>
      <AlertDialog.Action
        onclick={() => {
          deleteOpen = false;
          ondelete();
        }}>{m.info_edit_delete_confirm()}</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
