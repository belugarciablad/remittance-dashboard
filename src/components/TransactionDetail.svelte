<script lang="ts">
  import { t } from 'svelte-i18n';
  import type { Transaction } from '../types/transaction-model.type';
  import { formatPhoneNumber } from '../util/format.util';
  import { getColorByStatus } from '../util/status-color-util';
  import { Download, Repeat } from 'lucide-svelte';
  import { downloadDetail, repeatTransaction } from '../util/transaction-detail.util';

  export let isDetailModalOpen = false;
  export let selectedTransaction: Transaction | null = null;
  export let closeModal: () => void;
</script>

{#if isDetailModalOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    role="dialog"
    aria-labelledby="modal-title"
    aria-modal="true"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-96 relative flex flex-col justify-center items-center"
    >
      <!-- Close Button -->
      <button
        class="absolute top-3 right-3 text-red-600 hover:text-red-800 text-xl font-bold"
        on:click={closeModal}
        name="close"
        aria-label="Close modal"
      >
        ✖
      </button>

      {#if selectedTransaction}
        <div class="text-gray-700 space-y-2 self-start flex flex-col w-full mt-8">
          <div class="transaction-detail-header flex justify-between w-full">
            <h3 id="modal-title" class="text-xl font-semibold mb-4 text-gray-800">
              #{selectedTransaction.transaction_id}
            </h3>
            <p class="text-sm font-medium">
              <span
                class="w-20 h-8 text-sm rounded-md flex items-center justify-center {getColorByStatus(
                  selectedTransaction.status
                )}"
              >
                {selectedTransaction.status}
              </span>
            </p>
          </div>
          <p><strong>{$t('transaction.date')}:</strong> {selectedTransaction.date}</p>
          <p>
            <strong>{$t('transaction.detail.sender')}</strong>
            {formatPhoneNumber(selectedTransaction.sender_whatsapp)}
          </p>
          <p>
            <strong>{$t('transaction.detail.receiver')}</strong>
            {formatPhoneNumber(selectedTransaction.receiver_whatsapp)}
          </p>
          <p><strong>{$t('transaction.detail.method')}</strong> {selectedTransaction.payment_method}</p>
          <p><strong>{$t('transaction.detail.amount_sent')}</strong>
             {selectedTransaction.amount_sent}
             {selectedTransaction.currency_sent}
          </p>
          <p><strong>{$t('transaction.detail.amount_received')}</strong>
              {selectedTransaction.amount_received}
              {selectedTransaction.currency_received}
          </p>
          <p><strong>{$t('transaction.detail.exchange')}</strong> {selectedTransaction.exchange_rate}</p>
        </div>
        <div class="buttons flex justify-between w-full">
          <button
            class="mt-4 w-30 justify-center align-items px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600 transition"
            on:click={() => downloadDetail(selectedTransaction)}
          >
            <Download class="w-3 h-3 mr-2 inline" />
            {$t('transaction.detail.download')}
          </button>

          <button
            class="mt-4 w-30 justify-center align-items px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-orange-600 transition"
            on:click={repeatTransaction}
          >
            <Repeat class="w-3 h-3 mr-2 inline" />
            {$t('transaction.detail.repeat')}
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}
