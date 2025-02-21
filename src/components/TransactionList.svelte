<script lang="ts">
  import { transactions } from '../store/transactions.store';
  import type { Transaction } from '../types/transaction-model.type';
  import { TransactionStatus } from '../types/transaction-model.type';
  import { currentPage, itemsPerPage } from '../store/table-pagination-config.store';
  import { DateRangesEnum } from '../types/date-ranges-type';
  import { getColorByStatus } from '../util/status-color-util';
  import { formatPhoneNumber } from '../util/format.util';
  import TransactionDetail from './TransactionDetail.svelte';
  import SearchBar from './SearchBar.svelte';
  import Filter from './Filter.svelte';
  import Pagination from './Pagination.svelte';
  import { Clipboard } from 'lucide-svelte';
  import { screen } from '../store/screen-size.store';
  import { filterDate } from '../util/date-util';

  let isDetailModalOpen: boolean = false;
  let selectedTransaction: Transaction | null = null;
  let searchQuery: string = '';
  let selectedStatuses: TransactionStatus[] = [];
  let filteredTransactions = $transactions;
  let paginatedTransactions: Transaction[] = [];
  const isDesktop = screen.isDesktop();

  $: totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));

  let dateRangeFilter = DateRangesEnum.All;

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

  const updateDateRangeFilter = (dateRange: DateRangesEnum) => {
    dateRangeFilter = dateRange;
    applyAllFilters();
  };

  const applyAllFilters = () => {
    $currentPage = 1;
    filteredTransactions = $transactions.filter((transaction: Transaction) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        transaction.transaction_id.toString().toLowerCase().includes(query) ||
        transaction.sender_whatsapp.toLowerCase().includes(query) ||
        transaction.receiver_whatsapp.toLowerCase().includes(query);

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(transaction.status);

      const transactionDate = new Date(transaction.date);
      const matchesDate = filterDate(transactionDate, dateRangeFilter);

      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const removeAllFilters = () => {
    $currentPage = 1;
    filteredTransactions = $transactions;
    searchQuery = '';
    dateRangeFilter = DateRangesEnum.All;
    selectedStatuses = [];
  };

  const copyToClipboard = (event: Event, text: string) => {
    event.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  const goToPage = (page: number) => {
    $currentPage = page;
  };

  $: {
    const start = ($currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    paginatedTransactions = filteredTransactions.slice(start, end);

    if ($currentPage > totalPages) {
      $currentPage = totalPages;
    }
  }
</script>

<div class="flex w-full justify-between items-start gap-3">
  <div class="flex-grow">
    <SearchBar {searchQuery} {updateSearchQuery} />
  </div>
  <button
    on:click={removeAllFilters}
    class="px-3 py-1.5 h-10 w-auto text-sm text-gray-600 hover:text-white bg-gray-200 hover:bg-gray-400 border border-gray-300 rounded-md shadow-sm transition-colors duration-200 ease-in-out"
    aria-label="Clear all filters"
  >
    Clear filters
  </button>
</div>

<Filter {selectedStatuses} {dateRangeFilter} {updateStatusCheckbox} {updateDateRangeFilter} />

<TransactionDetail {isDetailModalOpen} {selectedTransaction} closeModal={closeDetailModal} />
{#if isDesktop}
  <table class="min-w-full table-auto border-collapse" role="grid" aria-label="Transactions">
    <thead>
      <tr class="bg-gray-200">
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">Transaction ID</th>
        <th class="px-8 py-2 border text-left" role="columnheader" scope="col">Sender</th>
        <th class="px-8 py-2 border text-left" role="columnheader" scope="col">Receiver</th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">Amount Sent (USD)</th
        >
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">Amount Received</th>
        <th class="px-2 py-2 border text-left" role="columnheader" scope="col">Exchange Rate</th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">Status</th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">Payment Method</th>
        <th class="px-4 py-2 border text-left" role="columnheader" scope="col">Date</th>
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
          <td class="px-4 py-2 border" role="gridcell">
            <div class="flex items-center space-x-2">
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
          <td class="px-8 py-2 border text-sm" role="gridcell"
            >{formatPhoneNumber(transaction.sender_whatsapp)}</td
          >
          <td class="px-8 py-2 border text-sm" role="gridcell"
            >{formatPhoneNumber(transaction.receiver_whatsapp)}</td
          >
          <td class="px-4 py-2 border" role="gridcell">{transaction.amount_sent}</td>
          <td class="px-4 py-2 border" role="gridcell">{transaction.amount_received}</td>
          <td class="px-2 py-2 border" role="gridcell">{transaction.exchange_rate}</td>
          <td class="px-4 py-2 border" role="gridcell">
            <span
              class="w-20 h-8 text-sm rounded-md flex items-center justify-center {getColorByStatus(
                transaction.status
              )}"
              role="status"
              aria-label="Transaction status: {transaction.status}"
            >
              {transaction.status}
            </span>
          </td>
          <td class="px-4 py-2 border" role="gridcell">{transaction.payment_method}</td>
          <td class="px-4 py-2 border" role="gridcell"
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
          class="px-3 py-1 text-xs rounded-md font-semibold {getColorByStatus(transaction.status)}"
        >
          {transaction.status}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <span class="font-semibold">Sender:</span>
          {formatPhoneNumber(transaction.sender_whatsapp)}
        </div>
        <div>
          <span class="font-semibold">Receiver:</span>
          {formatPhoneNumber(transaction.receiver_whatsapp)}
        </div>
        <div>
          <span class="font-semibold">Amount Sent:</span>
          {transaction.amount_sent}
        </div>
        <div>
          <span class="font-semibold">Amount Received:</span>
          {transaction.amount_received}
        </div>
        <div>
          <span class="font-semibold">Exchange Rate:</span>
          {transaction.exchange_rate}
        </div>
        <div>
          <span class="font-semibold">Payment Method:</span>
          {transaction.payment_method}
        </div>
        <div class="col-span-2">
          <span class="font-semibold">Date:</span>
          {new Date(transaction.date).toLocaleString()}
        </div>
      </div>
    </div>
  {/each}
{/if}

<Pagination {totalPages} {goToPage} />
