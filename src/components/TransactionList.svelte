<script lang="ts">
  import { transactions, TransactionStatus } from "../store/transactions";
  import type { Transaction } from "../store/transactions";
  import TransactionDetail from './TransactionDetail.svelte';
  import SearchBar from './SearchBar.svelte';
  import Filter from './Filter.svelte'

  let isDetailModalOpen: boolean = false;
  let selectedTransaction: Transaction | null = null;
  let searchQuery: string = '';
  let selectedStatuses: TransactionStatus[] = Object.values(TransactionStatus);
  let filteredTransactions = $transactions;

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
        filterTransactions()
    };

    const updateStatusCheckbox = (statuses: TransactionStatus[]) => {
        selectedStatuses = statuses;
        filterTransactions();
    }

    const filterTransactions = () => {
        filteredTransactions = $transactions.filter((transaction: Transaction) => {
        const query = searchQuery.toLowerCase();
        const isStatusMatch = selectedStatuses.includes(transaction.status);
        const isMatch = (
            (transaction.transaction_id.toString().toLowerCase().includes(query) ||
            transaction.sender_whatsapp.toLowerCase().includes(query) ||
            transaction.receiver_whatsapp.toLowerCase().includes(query)) &&
            isStatusMatch
        );
        return isMatch;
        });
  } 
</script>

<SearchBar
    {searchQuery}
    updateSearchQuery={updateSearchQuery}
/>
<Filter 
    {selectedStatuses} 
    updateStatusCheckbox={updateStatusCheckbox}
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
  
