<script lang="ts">
  import { applyAction, deserialize } from "$app/forms";
  import { beforeNavigate } from "$app/navigation";
  import AddSection from "$lib/components/info/AddSection.svelte";
  import EditBar from "$lib/components/info/EditBar.svelte";
  import InfoSection from "$lib/components/info/InfoSection.svelte";
  import PageSettingsDialog from "$lib/components/info/PageSettingsDialog.svelte";
  import SectionControls from "$lib/components/info/SectionControls.svelte";
  import SetPageTitle from "$lib/components/nav/SetPageTitle.svelte";
  import {
    groupSections,
    missingEnglish,
    type InfoLang,
    type InfoSection as Section,
    type PageSettings,
  } from "$lib/info/sections";
  import { toast } from "$lib/stores/toast";
  import * as m from "$paraglide/messages";
  import { getLocale } from "$paraglide/runtime";

  let {
    page,
    sections: initialSections,
    canEdit,
    canDelete,
  }: {
    page: {
      slug: string;
      titleSv: string;
      titleEn: string | null;
      aliases: string[];
      version: number;
    };
    sections: Section[];
    canEdit: boolean;
    canDelete: boolean;
  } = $props();

  // The parent re-creates the editor when another page is opened, so the
  // initial values are only read once on purpose.
  // svelte-ignore state_referenced_locally
  const initialSettings: PageSettings = {
    titleSv: page.titleSv,
    titleEn: page.titleEn ?? "",
    aliases: page.aliases.join(" "),
  };
  // svelte-ignore state_referenced_locally
  let version = page.version;

  // svelte-ignore state_referenced_locally
  let sections = $state(structuredClone(initialSections));
  let settings = $state(structuredClone(initialSettings));
  // svelte-ignore state_referenced_locally
  let saved = $state.raw({
    sections: structuredClone(initialSections),
    settings: initialSettings,
  });

  let editing = $state(false);
  let saving = $state(false);
  let settingsOpen = $state(false);
  // The language being edited, which can differ from the language of the site.
  let editLang = $state<InfoLang>(getLocale());
  const lang = $derived<InfoLang>(editing ? editLang : getLocale());

  const addSection = (after: number) =>
    sections.splice(after + 1, 0, { id: crypto.randomUUID(), style: "text" });

  const moveSection = (i: number, delta: -1 | 1) => {
    const a = sections[i];
    const b = sections[i + delta];
    if (!a || !b) return;
    sections[i] = b;
    sections[i + delta] = a;
  };

  const deleteSection = (i: number) => sections.splice(i, 1);

  // Empty text is the same as no text, so it doesn't count as a change.
  const normalize = (list: Section[]) =>
    list.map((s) => ({
      ...s,
      headingSv: s.headingSv || undefined,
      headingEn: s.headingEn || undefined,
      bodySv: s.bodySv || undefined,
      bodyEn: s.bodyEn || undefined,
      imageAltSv: s.imageAltSv || undefined,
      imageAltEn: s.imageAltEn || undefined,
    }));

  const snapshot = () => ({
    sections: normalize($state.snapshot(sections)),
    settings: $state.snapshot(settings),
  });

  const dirty = $derived(
    JSON.stringify(snapshot()) !==
      JSON.stringify({
        sections: normalize(saved.sections),
        settings: saved.settings,
      }),
  );

  const blocks = $derived.by(() => {
    let groups = 0;
    return groupSections(sections).map((block) =>
      block.kind === "group" ? { ...block, index: groups++ } : block,
    );
  });

  const title = $derived(
    getLocale() === "en" && settings.titleEn
      ? settings.titleEn
      : settings.titleSv,
  );

  const parseAliases = (aliases: string) =>
    aliases.split(/[\s,]+/).filter(Boolean);

  const save = async () => {
    saving = true;
    try {
      const body = new FormData();
      body.append(
        "payload",
        JSON.stringify({
          version,
          titleSv: settings.titleSv,
          titleEn: settings.titleEn,
          aliases: parseAliases(settings.aliases),
          sections: $state.snapshot(sections),
        }),
      );
      const response = await fetch("?/save", { method: "POST", body });
      const result = deserialize(await response.text());
      if (result.type === "success" && result.data) {
        const data = result.data as { version: number; aliases: string[] };
        version = data.version;
        settings.aliases = data.aliases.join(" ");
        saved = {
          sections: $state.snapshot(sections),
          settings: $state.snapshot(settings),
        };
        editing = false;
        toast(m.info_edit_saved(), "success");
      } else if (result.type === "failure") {
        const data = result.data as { message?: string } | undefined;
        toast(data?.message ?? m.info_edit_save_failed(), "error");
      } else {
        toast(m.info_edit_save_failed(), "error");
      }
    } catch {
      toast(m.info_edit_save_failed(), "error");
    } finally {
      saving = false;
    }
  };

  const deletePage = async () => {
    const response = await fetch("?/delete", {
      method: "POST",
      body: new FormData(),
    });
    await applyAction(deserialize(await response.text()));
  };

  // Warn before leaving with unsaved edits. For a tab close or reload,
  // cancel() makes the browser show its own confirmation.
  beforeNavigate(({ cancel, willUnload }) => {
    if (!editing || !dirty) return;
    if (willUnload) {
      cancel();
      return;
    }
    if (!confirm(m.info_edit_leave_confirm())) cancel();
  });
</script>

<SetPageTitle {title} />

{#if canEdit}
  <EditBar
    bind:editing
    bind:lang={editLang}
    {dirty}
    {saving}
    onsave={save}
    ondiscard={() => {
      sections = structuredClone(saved.sections);
      settings = structuredClone(saved.settings);
      editing = false;
    }}
    onsettings={() => (settingsOpen = true)}
  />
  <PageSettingsDialog
    bind:open={settingsOpen}
    bind:settings
    slug={page.slug}
    {canDelete}
    ondelete={deletePage}
  />
{/if}

{#snippet row(index: number)}
  {@const style = sections[index]!.style}
  <div class="group relative">
    <InfoSection bind:section={sections[index]!} {lang} {editing} />
    {#if editing}
      {#if missingEnglish(sections[index]!)}
        <span
          class="bg-background text-muted-foreground absolute top-2 left-2 z-10 rounded-md border px-2 py-1 text-xs"
        >
          {m.info_edit_missing_translation()}
        </span>
      {/if}
      <SectionControls
        bind:section={sections[index]!}
        locked={style === "hero" || style === "footer"}
        first={index === 0 || sections[index - 1]?.style === "hero"}
        last={sections[index + 1] === undefined ||
          sections[index + 1]?.style === "footer"}
        onmove={(delta) => moveSection(index, delta)}
        ondelete={() => deleteSection(index)}
        class="mt-2 mr-4 ml-auto w-fit md:pointer-events-none md:absolute md:top-2 md:right-2 md:z-10 md:m-0 md:opacity-0 md:transition-opacity md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:focus-within:pointer-events-auto md:focus-within:opacity-100 md:has-data-[state=open]:pointer-events-auto md:has-data-[state=open]:opacity-100"
      />
    {/if}
  </div>
  {#if editing && style !== "footer"}
    <AddSection onclick={() => addSection(index)} />
  {/if}
{/snippet}

{#if editing && sections.length === 0}
  <AddSection onclick={() => addSection(-1)} />
{/if}

{#each blocks as block, i (block.kind === "standalone" ? block.section.id : (block.sections[0]?.section.id ?? i))}
  {#if block.kind === "standalone"}
    {@render row(block.index)}
  {:else}
    <div
      class="border-b last:border-b-0"
      class:bg-muted-background={block.index % 2 === 1}
    >
      {#each block.sections as { section, index } (section.id)}
        {@render row(index)}
      {/each}
    </div>
  {/if}
{/each}
