<script>
  import { t } from 'svelte-i18n';
  import InboxIcon from 'lucide-svelte/icons/inbox';
  import { screen } from '../store/screen-size.store';

  let isDesktop = screen.isDesktop();
</script>

<div class="flex flex-col items-center justify-center p-4 sm:p-8 text-center">
  <div class="w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6 text-gray-400">
    <InboxIcon size={isDesktop ? 96 : 64} strokeWidth={1.5} />
  </div>

  <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
    {$t('transaction.empty.title')}
  </h3>

  <p class="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-sm">
    {$t('transaction.empty.description')}
  </p>
</div>
