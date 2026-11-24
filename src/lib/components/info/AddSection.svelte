<script lang="ts">
  import * as m from "$paraglide/messages";
  let { onclick }: { onclick: () => void } = $props();
</script>

<button
  type="button"
  {onclick}
  class="group text-muted-foreground hover:text-foreground flex w-full cursor-pointer items-center gap-4 px-4 py-2 text-xs"
>
  <span
    class="group-hover:border-rosa-background flex-1 border-t border-dashed group-hover:border-solid"
  ></span>
  + {m.info_edit_add_section()}
  <span
    class="group-hover:border-rosa-background flex-1 border-t border-dashed group-hover:border-solid"
  ></span>
</button>
