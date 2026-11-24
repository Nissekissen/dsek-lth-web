<script lang="ts">
  import InfoPageEditor from "$lib/components/info/InfoPageEditor.svelte";
  import apiNames from "$lib/utils/apiNames";
  import { isAuthorized } from "$lib/utils/authorization";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<!-- Keyed so the editor state is reset when another page is opened. -->
{#key data.page.id}
  <InfoPageEditor
    page={data.page}
    sections={data.sections}
    canEdit={isAuthorized(apiNames.INFO_PAGE.UPDATE, data.user)}
    canDelete={isAuthorized(apiNames.INFO_PAGE.DELETE, data.user)}
  />
{/key}
