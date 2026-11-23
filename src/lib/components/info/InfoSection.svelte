<script lang="ts">
  import MarkdownBody from "$lib/components/MarkdownBody.svelte";
  import type { InfoSection } from "$lib/info/sections";

  const HERO_IMAGE = "https://files.dsek.se/files/public/photos/hero2.webp";

  let { section }: { section: InfoSection } = $props();

  // Image styles without an image fall back to a plain text block.
  const style = $derived(
    section.style.startsWith("image-") && !section.image
      ? "text"
      : section.style,
  );
</script>

{#snippet picture(klass: string)}
  <img
    src={section.image}
    alt={section.imageAlt ?? ""}
    loading="lazy"
    class="bg-muted w-full rounded-lg object-cover shadow-lg {klass}"
  />
{/snippet}

{#if style === "hero"}
  <header
    class="flex min-h-[70vh] items-center bg-cover bg-center text-white"
    style:background-image="linear-gradient(to right, rgba(0,0,0,0.92),
    rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url({section.image ?? HERO_IMAGE})"
  >
    <div class="mx-auto w-full max-w-6xl px-4 py-16">
      <h1
        class="max-w-[18ch] text-4xl leading-none font-bold uppercase sm:text-6xl lg:text-7xl"
      >
        {section.heading}
      </h1>
      {#if section.body}
        <MarkdownBody
          body={section.body}
          class="prose-invert mt-6 max-w-prose text-lg text-white/90"
        />
      {/if}
    </div>
  </header>
{:else if style === "category"}
  <div class="mx-auto max-w-6xl px-4 pt-20 pb-2">
    <h2 class="text-center text-3xl font-bold uppercase sm:text-4xl">
      {section.heading}
    </h2>
    {#if section.body}
      <MarkdownBody body={section.body} class="mt-4" />
    {/if}
  </div>
{:else if style === "image-left" || style === "image-right"}
  <section
    class={[
      "mx-auto grid max-w-6xl items-center gap-8 px-4 py-9 md:gap-12",
      style === "image-right"
        ? "md:grid-cols-[3fr_2fr]"
        : "md:grid-cols-[2fr_3fr]",
    ]}
  >
    <div class={style === "image-right" ? "md:order-2" : ""}>
      {@render picture("aspect-4/3")}
    </div>
    <div>
      {#if section.heading}<h3 class="mb-3">{section.heading}</h3>{/if}
      {#if section.body}<MarkdownBody body={section.body} />{/if}
    </div>
  </section>
{:else if style === "image-center"}
  <section class="mx-auto max-w-6xl px-4 py-10">
    {@render picture("mx-auto aspect-21/9 max-w-[62rem]")}
    <div class="mx-auto mt-6 max-w-prose">
      {#if section.heading}<h3 class="mb-3 text-center">{section.heading}</h3>{/if}
      {#if section.body}<MarkdownBody body={section.body} />{/if}
    </div>
  </section>
{:else if style === "footer"}
  <footer class="mt-20 px-4 py-16 text-center">
    <div class="mx-auto max-w-prose">
      {#if section.heading}
        <h2 class="text-3xl font-bold uppercase sm:text-4xl">
          {section.heading}
        </h2>
      {/if}
      {#if section.body}
        <MarkdownBody body={section.body} class="mt-4" />
      {/if}
    </div>
  </footer>
{:else}
  <section class="mx-auto w-fit max-w-6xl px-4 py-8">
    {#if section.heading}
      <h3 class="mb-3 text-center">{section.heading}</h3>
    {/if}
    {#if section.body}<MarkdownBody body={section.body} />{/if}
  </section>
{/if}
