<script lang="ts">
  import InfoSection from "$lib/components/info/InfoSection.svelte";
  import SetPageTitle from "$lib/components/nav/SetPageTitle.svelte";
  import { groupSections, type Accent } from "$lib/info/sections";
  import * as m from "$paraglide/messages";
  import { getLocale } from "$paraglide/runtime";
  import { sectionsEn, sectionsSv } from "./content";

  const ACCENTS: Accent[] = ["rosa", "lila", "pistachio"];

  // Groups (a category and the sections under it) alternate between the page
  // background and the muted one, and each gets the next accent color. Hero
  // and footer have their own backgrounds.
  const blocks = $derived.by(() => {
    let groups = 0;
    return groupSections(getLocale() === "sv" ? sectionsSv : sectionsEn).map(
      (block) =>
        block.kind === "group" ? { ...block, index: groups++ } : block,
    );
  });
</script>

<SetPageTitle title={m.nav_for_companies()} />

{#each blocks as block, i (i)}
  {#if block.kind === "standalone"}
    <InfoSection section={block.section} />
  {:else}
    <div
      class="border-b last:border-b-0"
      class:bg-muted-background={block.index % 2 === 1}
    >
      {#each block.sections as section, j (j)}
        <InfoSection {section} accent={ACCENTS[block.index % ACCENTS.length]} />
      {/each}
    </div>
  {/if}
{/each}
