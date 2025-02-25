<script lang="ts">
  import {
    transactions,
    fetchTransactions,
    transactionsLoading,
  } from '../store/transactions.store';
  import type { Transaction } from '../types/transaction-model.type';
  import { TransactionStatus, PaymentMethod } from '../types/transaction-model.type';
  import { currentPage, itemsPerPage } from '../store/table-pagination-config.store';
  import { DateRangesEnum } from '../types/date-ranges-type';
  import { getColorByStatus } from '../util/status-color.util';
  import { formatPhoneNumber, formatCurrency } from '../util/format.util';
  import TransactionDetail from './TransactionDetail.svelte';
  import Filter from './Filter.svelte';
  import Pagination from './Pagination.svelte';
  import Skeleton from './Skeleton.svelte';
  import {
    Clipboard,
    ArrowDownUp,
    ArrowDown10,
    ArrowDown01,
    CalendarArrowUp,
    CalendarArrowDown,
    ArrowDownAZ,
    ArrowDownZA,
  } from 'lucide-svelte';
  import { screen } from '../store/screen-size.store';
  import { filterDate } from '../util/date.util';
  import { onMount, tick } from 'svelte';
  import { t } from 'svelte-i18n';
  import { getTranslationKey } from '../util/translations-maps.util';
  import { writable } from 'svelte/store';

  $: isLoading = $transactionsLoading;
  $: filteredTransactions = $transactions;
  $: totalPages = Math.max(1, Math.ceil(filteredTransactions?.length / itemsPerPage)) || 1;
  const scrollY = writable(0);

  const MOBILE_BATCH_SIZE = 10;
  let mobileDisplayedItems = MOBILE_BATCH_SIZE;
  let isLoadingMore = false;

  onMount(() => {
    fetchTransactions();
    const updateScroll = () => {
      scrollY.set(window.scrollY);
      handleScroll();
    };
    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  });

  $: {
    if (screen.isDesktop()) {
      const start = ($currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      paginatedTransactions = filteredTransactions?.slice(start, end);

      if ($currentPage > totalPages) {
        $currentPage = totalPages;
      }
    } else {
      paginatedTransactions = filteredTransactions?.slice(0, mobileDisplayedItems);
    }
  }

  let isDetailModalOpen: boolean = false;
  let selectedTransaction: Transaction | null = null;
  let searchQuery: string = '';
  let dateRangeFilter = DateRangesEnum.All;
  let selectedStatuses: TransactionStatus[] = [];
  let selectedPaymentMethods: PaymentMethod[] = [];
  let paginatedTransactions: Transaction[] = [];
  const isDesktop = screen.isDesktop();
  let sortColumn: string = 'transaction_id';
  let sortDirection: 'asc' | 'desc' = 'asc';

  const handleScroll = async () => {
    if (!screen.isDesktop()) {
      const buffer = 100;
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY + buffer) >=
        document.documentElement.scrollHeight;

      if (
        bottom &&
        !isLoadingMore &&
        filteredTransactions &&
        mobileDisplayedItems < filteredTransactions.length
      ) {
        isLoadingMore = true;

        await new Promise((resolve) => setTimeout(resolve, 500));

        mobileDisplayedItems = Math.min(
          mobileDisplayedItems + MOBILE_BATCH_SIZE,
          filteredTransactions.length
        );
        isLoadingMore = false;
        await tick();
      }
    }
  };

  const openDetailModal = (transaction: Transaction) => {
    isDetailModalOpen = true;
    selectedTransaction = transaction;
  };

  const closeDetailModal = () => {
    isDetailModalOpen = false;
    selectedTransaction = null;
  };

  const updateSearchQuery = (query: string) => {
    searchQuery = query;
    applyAllFilters();
  };

  const updateStatusCheckbox = (statuses: TransactionStatus[]) => {
    selectedStatuses = statuses;
    applyAllFilters();
  };

  const applyModalFilters = (dateRange?: DateRangesEnum, paymentMethods?: PaymentMethod[]) => {
    dateRangeFilter = dateRange ?? DateRangesEnum.All;
    selectedPaymentMethods = paymentMethods ?? [];
    applyAllFilters();
  };

  const applyAllFilters = () => {
    $currentPage = 1;
    mobileDisplayedItems = MOBILE_BATCH_SIZE; // Reset mobile items
    filteredTransactions = $transactions.filter((transaction: Transaction) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        transaction.transaction_id.toString().toLowerCase().includes(query) ||
        transaction.sender_whatsapp.toLowerCase().includes(query) ||
        transaction.receiver_whatsapp.toLowerCase().includes(query);

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(transaction.status);

      const matchesPaymentMethod =
        selectedPaymentMethods.length === 0 ||
        selectedPaymentMethods.includes(transaction.payment_method);

      const transactionDate = new Date(transaction.date);
      const matchesDate = filterDate(transactionDate, dateRangeFilter);

      return matchesSearch && matchesStatus && matchesDate && matchesPaymentMethod;
    });

    filteredTransactions.sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortDirection = 'asc';
    }
    applyAllFilters();
  };

  const removeAllFilters = () => {
    $currentPage = 1;
    filteredTransactions = $transactions;
    searchQuery = '';
    dateRangeFilter = DateRangesEnum.All;
    selectedPaymentMethods = [];
    selectedStatuses = [];
  };

  const copyToClipboard = (event: Event, text: string) => {
    event.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  const goToPage = (page: number) => {
    $currentPage = page;
  };
</script>

<Filter
  {searchQuery}
  {selectedStatuses}
  {selectedPaymentMethods}
  {dateRangeFilter}
  {updateSearchQuery}
  {updateStatusCheckbox}
  {applyModalFilters}
  {removeAllFilters}
/>
<TransactionDetail {isDetailModalOpen} {selectedTransaction} closeModal={closeDetailModal} />
{#if !isLoading}
  {#if isDesktop}
    <table class="min-w-full table-auto border-collapse" role="grid" aria-label={$t('list.title')}>
      <thead>
        <tr class="bg-gray-200">
          <th
            class="text-xs px-4 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('transaction_id')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.table.id')}</span>
              {#if sortColumn === 'transaction_id'}
                {#if sortDirection === 'asc'}
                  <ArrowDown10 size={12} class="ml-1" />
                {:else}
                  <ArrowDown01 size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
          <th
            class="text-xs px-8 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('sender_whatsapp')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.table.sender')}</span>
              {#if sortColumn === 'sender_whatsapp'}
                {#if sortDirection === 'asc'}
                  <ArrowDown10 size={12} class="ml-1" />
                {:else}
                  <ArrowDown01 size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
          <th
            class="text-xs px-8 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('receiver_whatsapp')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.table.receiver')}</span>
              {#if sortColumn === 'receiver_whatsapp'}
                {#if sortDirection === 'asc'}
                  <ArrowDown10 size={12} class="ml-1" />
                {:else}
                  <ArrowDown01 size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
          <th
            class="text-xs px-4 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('amount_sent')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.amount_sent')}</span>
              {#if sortColumn === 'amount_sent'}
                {#if sortDirection === 'asc'}
                  <ArrowDown10 size={12} class="ml-1" />
                {:else}
                  <ArrowDown01 size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
          <th
            class="text-xs px-4 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('amount_received')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.amount_received')}</span>
              {#if sortColumn === 'amount_received'}
                {#if sortDirection === 'asc'}
                  <ArrowDown10 size={12} class="ml-1" />
                {:else}
                  <ArrowDown01 size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
          <th
            class="text-xs px-2 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('exchange_rate')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.exchange_rate')}</span>
              {#if sortColumn === 'exchange_rate'}
                {#if sortDirection === 'asc'}
                  <ArrowDown10 size={12} class="ml-1" />
                {:else}
                  <ArrowDown01 size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
          <th
            class="text-xs px-4 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('status')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.table.status')}</span>
              {#if sortColumn === 'status'}
                {#if sortDirection === 'asc'}
                  <ArrowDownAZ size={12} class="ml-1" />
                {:else}
                  <ArrowDownZA size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
          <th
            class="text-xs px-4 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('payment_method')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.payment_method')}</span>
              {#if sortColumn === 'payment_method'}
                {#if sortDirection === 'asc'}
                  <ArrowDownAZ size={12} class="ml-1" />
                {:else}
                  <ArrowDownZA size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
          <th
            class="text-xs px-4 py-2 border text-center"
            role="columnheader"
            scope="col"
            on:click={() => toggleSort('date')}
          >
            <span class="flex items-center justify-center">
              <span>{$t('transaction.date')}</span>
              {#if sortColumn === 'date'}
                {#if sortDirection === 'asc'}
                  <CalendarArrowUp size={12} class="ml-1" />
                {:else}
                  <CalendarArrowDown size={12} class="ml-1" />
                {/if}
              {:else}
                <ArrowDownUp size={12} class="ml-1" />
              {/if}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each paginatedTransactions as transaction (transaction.transaction_id)}
          <tr
            class="odd:bg-white even:bg-gray-50"
            on:click={() => openDetailModal(transaction)}
            tabindex="0"
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDetailModal(transaction);
              }
            }}
            aria-label="Transaction {transaction.transaction_id}"
          >
            <td class="px-4 py-2 border text-center" role="gridcell">
              <div class="flex items-center justify-center space-x-2">
                <button
                  on:click={(event) => copyToClipboard(event, transaction.transaction_id)}
                  class="p-1 text-gray-500 hover:text-gray-700"
                  aria-label="Copy Transaction ID {transaction.transaction_id}"
                >
                  <Clipboard class="w-5 h-5" aria-hidden="true" />
                </button>
                <span class="text-sm font-medium">{transaction.transaction_id}</span>
              </div>
            </td>
            <td class="px-8 py-2 border text-sm text-center" role="gridcell"
              >{formatPhoneNumber(transaction.sender_whatsapp)}</td
            >
            <td class="px-8 py-2 border text-sm text-center" role="gridcell"
              >{formatPhoneNumber(transaction.receiver_whatsapp)}</td
            >
            <td class="px-4 py-2 border text-center" role="gridcell"
              >{formatCurrency(transaction.amount_sent, transaction.currency_sent)}</td
            >
            <td class="px-4 py-2 border text-center" role="gridcell"
              >{formatCurrency(transaction.amount_received, transaction.currency_received)}</td
            >
            <td class="px-2 py-2 border text-center" role="gridcell">{transaction.exchange_rate}</td>
            <td class="px-4 py-2 border text-center" role="gridcell">
              <span
                class="w-20 h-8 text-sm rounded-md flex items-center justify-center {getColorByStatus(
                  transaction.status
                )}"
                role="status"
                aria-label="Transaction status: {transaction.status}"
              >
                {$t(getTranslationKey.transactionStatus(transaction.status))}
              </span>
            </td>
            <td class="px-4 py-2 border text-center" role="gridcell">
              {$t(getTranslationKey.paymentMethod(transaction.payment_method))}
            </td>
            <td class="px-4 py-2 border text-center" role="gridcell"
              >{new Date(transaction.date).toLocaleString()}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    {#each paginatedTransactions as transaction (transaction.transaction_id)}
      <div
        class="w-full text-left bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
        on:click={() => openDetailModal(transaction)}
        aria-label="Transaction card"
        role="button"
        tabindex="0"
        on:keydown={(event) => event.key === 'Enter' && openDetailModal(transaction)}
      >
        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center space-x-2">
            <button
              on:click={(event) => copyToClipboard(event, transaction.transaction_id)}
              class="p-1 text-gray-500 hover:text-gray-700"
              aria-label="Copy Transaction ID"
            >
              <Clipboard class="w-5 h-5" />
            </button>
            <span class="text-sm font-medium">{transaction.transaction_id}</span>
          </div>
          <span
            class="px-3 py-1 text-xs rounded-md font-semibold {getColorByStatus(
              transaction.status
            )}"
          >
            {$t(getTranslationKey.transactionStatus(transaction.status))}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div>
            <span class="font-semibold">{$t('transaction.table.sender')}:</span>
            {formatPhoneNumber(transaction.sender_whatsapp)}
          </div>
          <div>
            <span class="font-semibold">{$t('transaction.table.receiver')}:</span>
            {formatPhoneNumber(transaction.receiver_whatsapp)}
          </div>
          <div>
            <span class="font-semibold">{$t('transaction.amount_sent')}:</span>
            {formatCurrency(transaction.amount_sent, transaction.currency_sent)}
          </div>
          <div>
            <span class="font-semibold">{$t('transaction.amount_received')}:</span>
            {formatCurrency(transaction.amount_received, transaction.currency_received)}
          </div>
          <div>
            <span class="font-semibold">{$t('transaction.exchange_rate')}:</span>
            {transaction.exchange_rate}
          </div>
          <div>
            <span class="font-semibold">{$t('transaction.payment_method')}:</span>
            {$t(getTranslationKey.paymentMethod(transaction.payment_method))}
          </div>
          <div class="col-span-2">
            <span class="font-semibold">{$t('transaction.date')}:</span>
            {new Date(transaction.date).toLocaleString()}
          </div>
        </div>
      </div>
    {/each}
  {/if}
{:else}
  <Skeleton {itemsPerPage} />
{/if}

{#if !isDesktop}
  {#if isLoadingMore}
    <div class="flex justify-center p-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  {:else if $scrollY !== 0}
    <button
      on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-110"
      aria-label={$t('common.scroll_to_top')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  {/if}
{/if}

{#if isDesktop}
  <Pagination {totalPages} {goToPage} />
{/if}
