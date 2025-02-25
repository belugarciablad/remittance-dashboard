<script lang="ts">
  import { Filter as FilterIcon } from 'lucide-svelte';
  import { TransactionStatus, PaymentMethod } from '../types/transaction-model.type';
  import { DateRangesEnum } from '../types/date-ranges-type';
  import { getTranslationKey } from '../util/translations-maps.util';
  import { t } from 'svelte-i18n';
  import FilterModal from './FilterModal.svelte';
  import SearchBar from './SearchBar.svelte';

  export let searchQuery: string = '';
  export let updateSearchQuery: (query: string) => void;
  export let selectedStatuses: TransactionStatus[] = [];
  export let selectedPaymentMethods: PaymentMethod[] = [];
  export let dateRangeFilter: DateRangesEnum = DateRangesEnum.All;
  export let updateStatusCheckbox: (statuses: TransactionStatus[]) => void;
  export let removeAllFilters: () => void;
  export let applyModalFilters: (
    daterange?: DateRangesEnum,
    paymentMethods?: PaymentMethod[]
  ) => void;

  let isFilterModalOpen = false;

  const availableStatuses = Object.values(TransactionStatus);

  const isStatusSelected = (status: TransactionStatus) => selectedStatuses.includes(status);

  const toggleStatus = (status: TransactionStatus) => {
    selectedStatuses = isStatusSelected(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    updateStatusCheckbox(selectedStatuses);
  };

  const openFilterModal = () => {
    isFilterModalOpen = true;
  };

  const closeFilterModal = () => {
    isFilterModalOpen = false;
  };
</script>

<div class="filters mb-4 flex flex-col lg:flex-row justify-center lg:gap-40">
  <div class="first-row flex items-start justify-center w-full gap-2">
    <div class="flex-grow">
      <SearchBar {searchQuery} {updateSearchQuery} />
    </div>
    <button
      on:click={openFilterModal}
      class="px-3 py-1.5 h-10 w-auto text-sm text-gray-600 hover:text-white bg-gray-200 hover:bg-gray-400 border border-gray-300 rounded-md shadow-sm transition-colors duration-200 ease-in-out"
      aria-label="Toggle filters"
    >
      <div class="flex items-center gap-2">
        <FilterIcon size={16} />
      </div>
    </button>
  </div>

  <div class="status-filter mb-4 sm:mb-0">
    <div class="flex sm:flex sm:space-x-5 items-center justify-center">
      {#each availableStatuses as status}
        <label class="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isStatusSelected(status)}
            on:change={() => toggleStatus(status)}
            class="hidden peer"
          />
          <span
            class="w-20 md:w-32 h-8 text-xs border-2 border-gray-200 rounded-md flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white transition-colors"
          >
            {$t(getTranslationKey.transactionStatus(status))}
          </span>
        </label>
      {/each}
    </div>
  </div>

  {#if isFilterModalOpen}
    <FilterModal
      {selectedPaymentMethods}
      {dateRangeFilter}
      {selectedStatuses}
      {removeAllFilters}
      {applyModalFilters}
      {closeFilterModal}
    />
  {/if}
</div>
