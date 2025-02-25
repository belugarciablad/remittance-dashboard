<script lang="ts">
  import { t } from 'svelte-i18n';
  import { screen } from '../store/screen-size.store';
  export const itemsPerPage: Number = 5;
  const isDesktop = screen.isDesktop();
</script>

{#if isDesktop}
  <table
    class="min-w-full table-auto border-collapse animate-pulse"
    role="grid"
    aria-label="Transactions - Skeleton"
  >
    <thead>
      <tr class="bg-gray-200">
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </th>
        <th class="px-8 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-32 bg-gray-300 rounded"></div>
        </th>
        <th class="px-8 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-32 bg-gray-300 rounded"></div>
        </th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </th>
        <th class="px-2 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-16 bg-gray-300 rounded"></div>
        </th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">
          <div class="h-4 w-32 bg-gray-300 rounded"></div>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each Array(itemsPerPage) as _}
        <tr class="odd:bg-white even:bg-gray-50">
          <td class="px-4 py-2 border">
            <div class="h-4 w-24 bg-gray-300 rounded"></div>
          </td>
          <td class="px-8 py-2 border">
            <div class="h-4 w-32 bg-gray-300 rounded"></div>
          </td>
          <td class="px-8 py-2 border">
            <div class="h-4 w-32 bg-gray-300 rounded"></div>
          </td>
          <td class="px-4 py-2 border">
            <div class="h-4 w-24 bg-gray-300 rounded"></div>
          </td>
          <td class="px-4 py-2 border">
            <div class="h-4 w-24 bg-gray-300 rounded"></div>
          </td>
          <td class="px-2 py-2 border">
            <div class="h-4 w-16 bg-gray-300 rounded"></div>
          </td>
          <td class="px-4 py-2 border">
            <div class="h-4 w-24 bg-gray-300 rounded"></div>
          </td>
          <td class="px-4 py-2 border">
            <div class="h-4 w-24 bg-gray-300 rounded"></div>
          </td>
          <td class="px-4 py-2 border">
            <div class="h-4 w-32 bg-gray-300 rounded"></div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  {#each Array(itemsPerPage) as _}
    <div class="w-full bg-gray-100 shadow-md rounded-lg p-4 mb-4 animate-pulse">
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center space-x-2">
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div class="h-4 w-20 bg-gray-300 rounded"></div>
      </div>

      <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <span class="font-semibold">{$t('transaction.detail.sender')}</span>
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div>
          <span class="font-semibold">Receiver:</span>
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div>
          <span class="font-semibold">Amount Sent:</span>
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div>
          <span class="font-semibold">Amount Received:</span>
          <div class="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div>
          <span class="font-semibold">Exchange Rate:</span>
          <div class="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
        <div>
          <span class="font-semibold">Payment Method:</span>
          <div class="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
        <div class="col-span-2">
          <span class="font-semibold">Date:</span>
          <div class="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  {/each}
{/if}
