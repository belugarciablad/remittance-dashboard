<script lang="ts">
  import { screen } from '../store/screen-size.store';
  import { TransactionStatus } from '../types/transaction-model.type';
  import { DateRangesEnum } from '../types/date-ranges-type';
  import { getTranslationKey } from '../util/translations-maps.util';
  import { t } from 'svelte-i18n';
  export let selectedStatuses: TransactionStatus[] = [];
  export let dateRangeFilter: DateRangesEnum;
  export let updateStatusCheckbox: (statuses: TransactionStatus[]) => void;
  export let updateDateRangeFilter: (daterange: DateRangesEnum) => void;

  const availableStatuses = Object.values(TransactionStatus);
  const dateRanges = Object.values(DateRangesEnum);

  const isStatusSelected = (status: TransactionStatus) => selectedStatuses.includes(status);

  const toggleStatus = (status: TransactionStatus) => {
    selectedStatuses = isStatusSelected(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    updateStatusCheckbox(selectedStatuses);
  };

  const handleDateRangeChange = (range: DateRangesEnum) => {
    dateRangeFilter = range;
    updateDateRangeFilter(range);
  };

  const isRadioButtonSelected = (range: DateRangesEnum) => dateRangeFilter === range;

  // Reactive variable to check if we're on mobile
  $: isDesktop = screen.isDesktop();
</script>

<div class="filters mb-4 flex flex-col sm:flex-row justify-center sm:gap-40">
  <div class="status-filter mb-4 sm:mb-0">
    <div class="grid grid-cols-2 gap-2 sm:flex sm:space-x-5">
      {#each availableStatuses as status}
        <label class="inline-flex items-center space-x-1">
          <input
            type="checkbox"
            checked={isStatusSelected(status)}
            on:change={() => toggleStatus(status)}
            class="hidden peer"
          />
          <span
            class="w-24 md:w-32 h-8 text-sm border-2 border-gray-200 rounded-md flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white transition-colors"
          >
            {$t(getTranslationKey.transactionStatus(status))}
          </span>
        </label>
      {/each}
    </div>
  </div>

  <div class="date-filter">
    {#if isDesktop}
      <div class="flex space-x-5">
        {#each dateRanges as daterange}
          <label>
            <input
              type="radio"
              name="dateRange"
              value={daterange}
              bind:group={dateRangeFilter}
              on:change={() => handleDateRangeChange(daterange)}
              checked={isRadioButtonSelected(daterange)}
            />
            <span class="text-gray-700">{$t(getTranslationKey.dateRange(daterange))}</span>
          </label>
        {/each}
      </div>
    {:else}
      <select
        bind:value={dateRangeFilter}
        on:change={(e) =>
          handleDateRangeChange((e?.target as HTMLSelectElement).value as DateRangesEnum)}
        class="w-full p-2 border-2 border-gray-200 rounded-md"
      >
        {#each dateRanges as daterange}
          <option value={daterange}>
            {$t(getTranslationKey.dateRange(daterange))}
          </option>
        {/each}
      </select>
    {/if}
  </div>
</div>
