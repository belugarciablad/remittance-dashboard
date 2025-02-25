<script lang="ts">
  import { locale, locales, t } from 'svelte-i18n';
  import { Languages } from 'lucide-svelte';

  let selectElement: HTMLSelectElement;
</script>

<div class="relative inline-flex items-center">
  <button
    on:click={() => selectElement.click()}
    class="absolute left-2 z-10 text-gray-500 hover:text-gray-700 transition-colors"
    aria-label={$t('locale.select')}
  >
    <Languages size={20} />
  </button>
  <select
    bind:this={selectElement}
    bind:value={$locale}
    name={$t('locale.select')}
    class="appearance-none w-full pl-10 pr-8 py-2 bg-white border border-gray-300 rounded-lg
               text-gray-700 font-medium cursor-pointer hover:border-gray-400
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition-colors"
  >
    {#each $locales as locale}
      <option value={locale} class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-base">
        {locale.toUpperCase()}
      </option>
    {/each}
  </select>
  <div class="absolute right-2 pointer-events-none">
    <svg
      class="h-5 w-5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</div>
