<script lang="ts">
  import Locale from './components/Locale.svelte';
  import Menu from './components/Menu.svelte';
  import TransactionList from './components/TransactionList.svelte';
  import { t } from 'svelte-i18n';
  import { i18nStore } from './store/i18n.store';

  let isLocaleLoaded = false;
  $: $i18nStore && (isLocaleLoaded = true);
</script>

{#if isLocaleLoaded}
  <div class="h-full min-h-screen bg-gray-100 flex flex-col touch-pan-y">
    <header class="bg-blue-600 text-white p-4 flex-shrink-0 flex items-center justify-between">
      <h1 class="text-xl font-bold">{$t('header.remittance-dashboard')}</h1>
      <Menu />
    </header>

    <main class="flex-1 p-6 overflow-y-auto overscroll-contain">
      <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">{$t('dashboard.transactions')}</h2>

        <TransactionList />
      </div>
    </main>
    <footer class="bg-blue-600 text-white p-4 text-center flex-shrink-0">
      <p>{$t('footer.rights')}</p>
    </footer>
  </div>
{:else}
  <div class="flex items-center justify-center h-screen">
    <img src="./assets/logo.svg" alt="Felix Loader" class="w-24 h-24 animate-spin" />
  </div>
{/if}
