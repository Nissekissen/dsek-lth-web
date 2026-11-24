<script lang="ts">
  import InfoSection from "$lib/components/info/InfoSection.svelte";
  import SetPageTitle from "$lib/components/nav/SetPageTitle.svelte";
  import EditBar from "$lib/components/info/EditBar.svelte";
  import { groupSections } from "$lib/info/sections";
  import * as m from "$paraglide/messages";
  import { getLocale } from "$paraglide/runtime";
  import { sectionsEn, sectionsSv } from "./content";

  let sections = $state(structuredClone(getLocale() === "sv" ? sectionsSv : sectionsEn))
  let saved = $state.snapshot(sections)


  const normalize = (list: typeof sections) =>
    list.map((s) => ({
      ...s,
      heading: s.heading || undefined,
      body: s.body || undefined,
    }));

  const dirty = $derived(
    JSON.stringify(normalize(sections)) !== JSON.stringify(normalize(saved))
  );

  const blocks = $derived.by(() => {
    let groups = 0;
    return groupSections(sections).map(
      (block) =>
        block.kind === "group" ? { ...block, index: groups++ } : block,
    );
  });

  let editing = $state(false);
</script>

<SetPageTitle title={m.nav_for_companies()} />

<EditBar bind:editing dirty={dirty} onsave={() => {saved = $state.snapshot(sections); editing = false}} ondiscard={() => {sections = structuredClone(saved); editing = false}} />

<!-- This page should not be in the final version, it is here only to test the layout -->

{#each blocks as block, i (i)}
  {#if block.kind === "standalone"}
    <InfoSection bind:section={sections[block.index]!} {editing} />
  {:else}
    <div
      class="border-b last:border-b-0"
      class:bg-muted-background={block.index % 2 === 1}
    >
      {#each block.sections as { index } (index)}
        <InfoSection bind:section={sections[index]!} {editing} />
      {/each}
    </div>
  {/if}
{/each}

