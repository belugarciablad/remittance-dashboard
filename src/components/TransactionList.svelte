<script lang="ts">
  import { transactions } from "../store/transactions";
  import type { Transaction } from "../store/transactions";
</script>

  
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
    {#each $transactions as transaction (transaction.transaction_id)}
    <tr class="odd:bg-white even:bg-gray-50">
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
  
