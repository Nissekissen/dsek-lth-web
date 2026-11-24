<script lang="ts">
  let {
    value = $bindable(),
    editing = false,
    placeholder,
  }: {
    value?: string;
    editing?: boolean;
    placeholder: string;
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
    class="outline-rosa-background/50 outline outline-dashed empty:before:content-[attr(data-placeholder)]"
  ></span>
{:else}
  {value}
{/if}
