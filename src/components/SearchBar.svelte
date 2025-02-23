<script lang="ts">
  import { t } from 'svelte-i18n';
  export let searchQuery: string = '';
  export let updateSearchQuery: (query: string) => void;
</script>

<div class="mb-4">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder={$t('search.placeholder')}
    class="px-4 py-2 border border-gray-300 rounded-lg w-full"
    on:input={() => updateSearchQuery(searchQuery)}
  />
</div>
