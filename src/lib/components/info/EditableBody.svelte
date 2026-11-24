<script lang="ts">
  import MarkdownBody from "$lib/components/MarkdownBody.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import { Switch } from "$lib/components/ui/switch";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";

  let {
    value = $bindable(),
    editing = false,
    class: klass,
  }: {
    value?: string;
    editing?: boolean;
    class?: string;
  } = $props();

  let open = $state(false);
  let preview = $state(false);

  $effect(() => { if (!editing) open = false; });
</script>

{#if editing}
  {#if open}
    <div class="flex flex-col gap-2">
      <div class={["grid gap-4", preview && "md:grid-cols-2"]}>
        <Editor bind:value />
        {#if preview}
          <MarkdownBody body={value ?? ""} preview />
        {/if}
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Switch id="preview-switch" bind:checked={preview} />
          <Label for="preview-switch">Förhandsgranska</Label>
        </div>
        <Button onclick={() => (open = false)}>Klar</Button>
      </div>
    </div>
  {:else}
    <button
      type="button"
      class="block w-full cursor-pointer rounded text-left outline outline-dashed outline-rosa-background/50 hover:bg-rosa-background/10"
      onclick={() => (open = true)}>
      {#if value}<MarkdownBody body={value} class={klass} />{/if}
    </button>
  {/if}
{:else}
  {#if value}<MarkdownBody body={value} class={klass} />{/if}
{/if}
