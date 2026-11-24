<script lang="ts">
  import * as m from "$paraglide/messages";
  let {
    value = $bindable(),
    editing = false,
    placeholder = m.info_edit_heading_placeholder(),
  }: {
    value?: string;
    editing?: boolean;
    placeholder?: string;
  } = $props();
</script>

{#if editing}
  <span
    role="textbox"
    tabindex="0"
    aria-label={placeholder}
    aria-multiline="false"
    contenteditable="plaintext-only"
    bind:textContent={value}
    data-placeholder={placeholder}
    onkeydown={(e) => {
      if (e.key === "Enter") e.preventDefault();
    }}
    class="outline-rosa-background/50 inline-block min-w-[1ch] cursor-text outline outline-dashed empty:before:content-[attr(data-placeholder)]"
  ></span>
{:else}
  {value}
{/if}
