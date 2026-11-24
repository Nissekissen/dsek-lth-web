<script lang="ts">
  import { superForm } from "$lib/utils/client/superForms";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Spinner } from "$lib/components/ui/spinner";
  import SetPageTitle from "$lib/components/nav/SetPageTitle.svelte";
  import * as m from "$paraglide/messages.js";
  import Plus from "@lucide/svelte/icons/plus";

  let { data } = $props();

  // svelte-ignore state_referenced_locally
  const { form, errors, enhance, delayed } = superForm(data.form, {
    delayMs: 300,
  });
</script>

<SetPageTitle title={m.admin_info_createNewInfoPage()} />

<div class="mx-auto w-full max-w-4xl px-4 py-8">
  <Card class="border-border overflow-hidden p-0 shadow-xl">
    <CardHeader class="bg-muted/50 border-border border-b-[1px] pt-6 pb-6">
      <CardTitle class="text-3xl font-bold"
        >{m.admin_info_createNewInfoPage()}</CardTitle
      >
    </CardHeader>
    <CardContent class="flex flex-col gap-6 pt-6 pb-6">
      <form
        method="POST"
        action="?/create"
        use:enhance
        class="flex flex-col gap-6"
      >
        <div class="flex flex-col gap-2">
          <Label for="name">{m.admin_info_name()}</Label>
          <Input id="name" name="name" bind:value={$form.name} required />
          {#if $errors.name}
            <p class="text-destructive text-sm font-medium">{$errors.name}</p>
          {/if}
        </div>

        <div class="flex flex-col gap-2">
          <Label for="titleSv">{m.info_edit_title_sv()}</Label>
          <Input
            id="titleSv"
            name="titleSv"
            bind:value={$form.titleSv}
            required
          />
          {#if $errors.titleSv}
            <p class="text-destructive text-sm font-medium">
              {$errors.titleSv}
            </p>
          {/if}
        </div>

        <div class="flex flex-col gap-2">
          <Label for="titleEn">{m.info_edit_title_en()}</Label>
          <Input id="titleEn" name="titleEn" bind:value={$form.titleEn} />
          {#if $errors.titleEn}
            <p class="text-destructive text-sm font-medium">
              {$errors.titleEn}
            </p>
          {/if}
        </div>

        <div class="flex items-center justify-end">
          <Button
            type="submit"
            disabled={$delayed}
            class="flex min-w-32 items-center gap-2"
          >
            {#if $delayed}
              <Spinner class="h-4 w-4" />
            {:else}
              <Plus class="h-4 w-4" />
              {m.admin_info_create()}
            {/if}
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>
