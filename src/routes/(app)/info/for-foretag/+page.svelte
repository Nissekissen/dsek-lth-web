<script lang="ts">
  import InfoSection from "$lib/components/info/InfoSection.svelte";
  import SetPageTitle from "$lib/components/nav/SetPageTitle.svelte";
  import EditBar from "$lib/components/info/EditBar.svelte";
  import { beforeNavigate } from "$app/navigation";
  import AddSection from "$lib/components/info/AddSection.svelte";
  import SectionControls from "$lib/components/info/SectionControls.svelte";
  import { groupSections } from "$lib/info/sections";
  import * as m from "$paraglide/messages";
  import { getLocale } from "$paraglide/runtime";
  import { sectionsEn, sectionsSv } from "./content";

  const withIds = (list: typeof sectionsSv) =>
    list.map((s) => ({ ...s, id: crypto.randomUUID() }));

  const initial = withIds(getLocale() === "sv" ? sectionsSv : sectionsEn);
  let sections = $state(structuredClone(initial));
  let saved = $state.raw(initial);

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

  const normalize = (list: typeof sections) =>
    list.map((s) => ({
      ...s,
      heading: s.heading || undefined,
      body: s.body || undefined,
    }));

  const dirty = $derived(
    JSON.stringify(normalize(sections)) !== JSON.stringify(normalize(saved)),
  );

  const blocks = $derived.by(() => {
    let groups = 0;
    return groupSections(sections).map((block) =>
      block.kind === "group" ? { ...block, index: groups++ } : block,
    );
  });

  let editing = $state(false);

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

<SetPageTitle title={m.nav_for_companies()} />

<EditBar
  bind:editing
  {dirty}
  onsave={() => {
    saved = $state.snapshot(sections);
    editing = false;
  }}
  ondiscard={() => {
    sections = structuredClone(saved);
    editing = false;
  }}
/>

<!-- This page should not be in the final version, it is here only to test the layout -->

{#snippet row(index: number)}
  {@const style = sections[index]!.style}
  <div class="group relative">
    <InfoSection bind:section={sections[index]!} {editing} />
    {#if editing}
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
