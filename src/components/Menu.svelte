<script lang="ts">
  import { t } from 'svelte-i18n';
  import Locale from './Locale.svelte';
  import { Home, Users, ChartColumn, Menu } from 'lucide-svelte';
  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  };
</script>

<div class="relative">
  <button
    on:click={toggleMenu}
    class="p-2 hover:bg-blue-700 rounded-lg transition-colors duration-200"
    aria-expanded={isOpen}
    aria-label={$t('menu.toggle')}
  >
    <Menu size={24} />
  </button>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
      role="menu"
      tabindex="0"
      on:click={toggleMenu}
      on:keydown={(e) => e.key === 'Enter' && toggleMenu()}
    >
      <a
        href="/"
        class="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-100 transition-colors duration-200"
        role="menuitem"
      >
        <Home class="w-5 h-5 mr-3" />
        <span>{$t('menu.home')}</span>
      </a>
      <a
        href="/contacts"
        class="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-100 transition-colors duration-200"
        role="menuitem"
      >
        <Users class="w-5 h-5 mr-3" />
        <span>{$t('menu.contacts')}</span>
      </a>
      <a
        href="/metrics"
        class="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-100 transition-colors duration-200"
        role="menuitem"
      >
        <ChartColumn class="w-5 h-5 mr-3" />
        <span>{$t('menu.metrics')}</span>
      </a>
      <div class="px-4 py-2 border-t">
        <Locale onclose={() => isOpen = false} />
      </div>
    </div>
  {/if}
</div>

