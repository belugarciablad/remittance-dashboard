<script lang="ts">
  import { t } from 'svelte-i18n';
  import { currentPage } from '../store/table-pagination-config.store';
  export let totalPages: number;
  export let goToPage: (page: number) => void;
</script>

<div class="flex items-center justify-center space-x-2 mt-4">
  <button
    on:click={() => goToPage($currentPage - 1)}
    disabled={$currentPage === 1}
    class="px-3 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 transition"
  >
    {$t('pagination.prev')}
  </button>

  <span class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
    {$t('pagination.page')} <strong class="text-gray-900">{$currentPage}</strong>
    {$t('transaction.of')}
    <strong class="text-gray-900">{totalPages}</strong>
  </span>

  <button
    on:click={() => goToPage($currentPage + 1)}
    disabled={$currentPage === totalPages}
    class="px-3 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 transition"
  >
    {$t('pagination.next')}
  </button>
</div>
