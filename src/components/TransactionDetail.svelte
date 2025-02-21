<script lang="ts">
    import type { Transaction } from "../types/transaction-model";
    export let isDetailModalOpen = false;
    export let selectedTransaction: Transaction | null = null;
    export let closeModal: () => void;
  
  </script>
  <div>
    {#if isDetailModalOpen}     
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 class="text-xl font-semibold mb-4">Transaction Details</h3>
            {#if selectedTransaction}
            <p><strong>Payment ID:</strong> {selectedTransaction.transaction_id}</p>
            <p><strong>Date:</strong> {selectedTransaction.date}</p>
            <p><strong>Sender:</strong> {selectedTransaction.sender_whatsapp}</p>
            <p><strong>Receiver:</strong> {selectedTransaction.receiver_whatsapp}</p>
            <p><strong>Method:</strong> {selectedTransaction.payment_method}</p>
            <p><strong>Amount Sent:</strong> {selectedTransaction.amount_sent}</p>
            <p><strong>Amount Received:</strong> {selectedTransaction.amount_received}</p>
            <p><strong>Currency:</strong> {selectedTransaction.amount}</p>
            <p><strong>Exchange:</strong> {selectedTransaction.exchange_rate}</p>
            <p><strong>Status Tracking:</strong> {selectedTransaction.status}</p>
            {/if}
            <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" on:click={closeModal}>Close</button>
        </div>
    </div>
    {/if}
  </div>
    