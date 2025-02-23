<script lang="ts">
  import Locale from './components/Locale.svelte';
  import TransactionList from './components/TransactionList.svelte';
  import { locale, t } from 'svelte-i18n';
  import { i18nStore } from './store/i18n'

  let isLocaleLoaded = false;
  $: $i18nStore && (isLocaleLoaded = true);
</script>

{#if isLocaleLoaded }
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-3xl font-bold">{$t('header.remittance-dashboard')}</h1>
      <Locale/>
    </header>

    <main class="flex-grow p-6">
      <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">{$t('dashboard.transactions')}</h2>

        <TransactionList />
      </div>
    </main>
    <footer class="bg-blue-600 text-white p-4 text-center">
      <p>{$t('footer.rights')}</p>
    </footer>
  </div>
{:else}
  <img src="./assets/logo.svg" alt="Felix Loader">
{/if}
