<script lang="ts">
  import { transactions, TransactionStatus } from "../store/transactions";
  import type { Transaction } from "../store/transactions";
  import { DateRangesEnum } from '../types/date-ranges-type';
  import { getStartOfWeek, filterDate } from '../util/date-util';
  import TransactionDetail from './TransactionDetail.svelte';
  import SearchBar from './SearchBar.svelte';
  import Filter from './Filter.svelte'

  let isDetailModalOpen: boolean = false;
  let selectedTransaction: Transaction | null = null;
  let searchQuery: string = '';
  let selectedStatuses: TransactionStatus[] = [];
  let filteredTransactions = $transactions;

  let dateRangeFilter = DateRangesEnum.All

    const openDetailModal = (transaction: Transaction) => {
        isDetailModalOpen = true;
        selectedTransaction = transaction;
    }
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
    }

    const updateDateRangeFilter = (dateRange) => {
        dateRangeFilter = dateRange;
        applyAllFilters();
    }

    const applyAllFilters = () => {
        filteredTransactions = $transactions.filter((transaction: Transaction) => {
            const query = searchQuery.toLowerCase();
            const matchesSearch = searchQuery === '' || (
                transaction.transaction_id.toString().toLowerCase().includes(query) ||
                transaction.sender_whatsapp.toLowerCase().includes(query) ||
                transaction.receiver_whatsapp.toLowerCase().includes(query)
            );

            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(transaction.status);

            const transactionDate = new Date(transaction.date);
            const matchesDate = filterDate(transactionDate, dateRangeFilter);

            return matchesSearch && matchesStatus && matchesDate;
        });
    };
  
    const removeAllFilters = () => {
        filteredTransactions = $transactions;
        searchQuery = '';
        dateRangeFilter = DateRangesEnum.All;
        selectedStatuses = [];
    }

</script>

<div class="flex w-full justify-between items-start gap-3">
    <div class="flex-grow">
        <SearchBar
            {searchQuery}
            updateSearchQuery={updateSearchQuery}
        />
    </div>
    <button 
        on:click={removeAllFilters}
        class="px-3 py-1.5 h-10 w-auto text-sm text-gray-600 hover:text-white bg-gray-200 hover:bg-gray-400 border border-gray-300 rounded-md shadow-sm transition-colors duration-200 ease-in-out"
        aria-label="Clear all filters">
        Clear filters
    </button>
</div>

<Filter 
    {selectedStatuses} 
    {dateRangeFilter}
    updateStatusCheckbox={updateStatusCheckbox}
    updateDateRangeFilter={updateDateRangeFilter}
/>

<table class="min-w-full table-auto border-collapse">
<thead>
    <tr class="bg-gray-200">
    <th class="px-4 py-2 border text-left">Transaction ID</th>
    <th class="px-4 py-2 border text-left">Sender</th>
    <th class="px-4 py-2 border text-left">Receiver</th>
    <th class="px-4 py-2 border text-left">Amount Sent (USD)</th>
    <th class="px-4 py-2 border text-left">Amount Received</th>
    <th class="px-4 py-2 border text-left">Exchange Rate</th>
    <th class="px-4 py-2 border text-left">Status</th>
    <th class="px-4 py-2 border text-left">Payment Method</th>
    <th class="px-4 py-2 border text-left">Date</th>
    </tr>
</thead>
<tbody>
    {#each filteredTransactions as transaction (transaction.transaction_id)}
    <tr class="odd:bg-white even:bg-gray-50" on:click={() => openDetailModal(transaction)}>
        <td class="px-4 py-2 border">{transaction.transaction_id}</td>
        <td class="px-4 py-2 border">{transaction.sender_whatsapp}</td>
        <td class="px-4 py-2 border">{transaction.receiver_whatsapp}</td>
        <td class="px-4 py-2 border">{transaction.amount_sent}</td>
        <td class="px-4 py-2 border">{transaction.amount_received}</td>
        <td class="px-4 py-2 border">{transaction.exchange_rate}</td>
        <td class="px-4 py-2 border">{transaction.status}</td>
        <td class="px-4 py-2 border">{transaction.payment_method}</td>
        <td class="px-4 py-2 border">{new Date(transaction.date).toLocaleString()}</td>
    </tr>
    {/each}
</tbody>
</table>

<TransactionDetail 
    {isDetailModalOpen} 
    {selectedTransaction}
    closeModal={closeDetailModal}
/>
  
