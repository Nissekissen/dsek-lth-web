<script lang="ts">
  import EditableText from "$lib/components/info/EditableText.svelte";
  import EditableBody from "$lib/components/info/EditableBody.svelte";
  import EditableImage from "$lib/components/info/EditableImage.svelte";
  import type { InfoSection } from "$lib/info/sections";

  const HERO_IMAGE = "https://files.dsek.se/files/public/photos/hero2.webp";

  let {
    section = $bindable(),
    editing = false,
  }: { section: InfoSection; editing: boolean } = $props();

  // Image styles without an image fall back to a plain text block.
  const style = $derived(
    !editing && section.style.startsWith("image-") && !section.image
      ? "text"
      : section.style,
  );
</script>

{#snippet picture(klass: string)}
  <EditableImage
    bind:image={section.image}
    bind:imageAlt={section.imageAlt}
    {editing}
    class={klass}
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
        <EditableText
          bind:value={section.heading}
          {editing}
          placeholder="Skriv något"
        />
      </h1>
      <EditableBody
        bind:value={section.body}
        {editing}
        class="prose-invert mt-6 max-w-prose text-lg text-white/90"
      />
    </div>
  </header>
{:else if style === "category"}
  <div class="mx-auto max-w-6xl px-4 pt-20 pb-2">
    <h2 class="text-center text-3xl font-bold uppercase sm:text-4xl">
      <EditableText
        bind:value={section.heading}
        {editing}
        placeholder="Skriv något"
      />
    </h2>
    <!-- <EditableBody bind:value={section.body} {editing} class="mt-4" /> -->
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
      {#if section.heading || editing}
        <h3 class="mb-3">
          <EditableText
            bind:value={section.heading}
            {editing}
            placeholder="Skriv något"
          />
        </h3>
      {/if}
      <EditableBody bind:value={section.body} {editing} />
    </div>
  </section>
{:else if style === "image-center"}
  <section class="mx-auto max-w-6xl px-4 py-10">
    {@render picture("mx-auto aspect-21/9 max-w-[62rem]")}
    <div class="mx-auto mt-6 max-w-prose">
      {#if section.heading || editing}
        <h3 class="mb-3 text-center">
          <EditableText
            bind:value={section.heading}
            {editing}
            placeholder="Skriv något"
          />
        </h3>
      {/if}
      <EditableBody bind:value={section.body} {editing} />
    </div>
  </section>
{:else if style === "footer"}
  <footer class="mt-20 px-4 py-16 text-center">
    <div class="mx-auto max-w-prose">
      {#if section.heading || editing}
        <h2 class="text-3xl font-bold uppercase sm:text-4xl">
          <EditableText
            bind:value={section.heading}
            {editing}
            placeholder="Skriv något"
          />
        </h2>
      {/if}
      <EditableBody bind:value={section.body} {editing} class="mt-4" />
    </div>
  </footer>
{:else}
  <section class="mx-auto w-fit max-w-6xl px-4 py-8">
    {#if section.heading || editing}
      <h3 class="mb-3 text-center">
        <EditableText
          bind:value={section.heading}
          {editing}
          placeholder="Skriv något"
        />
      </h3>
    {/if}
    <EditableBody bind:value={section.body} {editing} />
  </section>
{/if}
