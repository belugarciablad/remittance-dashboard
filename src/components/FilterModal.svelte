<script lang="ts">
    import { t } from 'svelte-i18n';
    import { getTranslationKey } from '../util/translations-maps.util';
    import { DateRangesEnum } from '../types/date-ranges-type';
    import { PaymentMethod, TransactionStatus } from '../types/transaction-model.type';
    import { screen } from '../store/screen-size.store';

    export let isOpen: boolean = true;
    export let dateRangeFilter: DateRangesEnum = DateRangesEnum.All;
    export let selectedPaymentMethods: PaymentMethod[] = [];
    export let selectedStatuses: TransactionStatus[] = [];

    export let removeAllFilters: () => void;
    export let applyModalFilters: (daterange?: DateRangesEnum, paymentMethods?: PaymentMethod[]) => void;
    export let closeFilterModal: () => void;

    $: isDesktop = screen.isDesktop();

    const dateRanges = Object.values(DateRangesEnum);
    const paymentMethods = Object.values(PaymentMethod);

    const handleDateRangeChange = (value: DateRangesEnum) => {
        dateRangeFilter = value;
    };

    const togglePaymentMethod = (paymentMethod: PaymentMethod) => {
        selectedPaymentMethods = isPaymentMethodSelected(paymentMethod)
            ? selectedPaymentMethods.filter((pm) => pm !== paymentMethod)
            : [...selectedPaymentMethods, paymentMethod];
    };

    const applyFilters = () => {
        applyModalFilters(dateRangeFilter, selectedPaymentMethods);
        closeFilterModal();
    };

    const isPaymentMethodSelected = (paymentMethod: PaymentMethod) => {
        return selectedPaymentMethods.includes(paymentMethod);
    };

    const handleRemoveAllFilters = () => {
        removeAllFilters();
        closeFilterModal();
    };
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div 
    class="fixed inset-0 bg-black bg-opacity-50 z-20" 
    on:click={closeFilterModal}
    on:keydown={(e) => {
        if (e.key === 'Escape') {
            closeFilterModal();
        }
    }}
    role="dialog" 
    aria-modal="true" >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
        class={`${isOpen ? 'fixed' : 'absolute'} ${isDesktop ? 'right-0 top-0 bottom-0 w-1/3 rounded-l-2xl' : 'bottom-0 left-0 right-0 h-[80vh] rounded-t-2xl'} bg-white p-4 shadow-xl z-30 transition-transform overflow-y-auto`}
        role="dialog"
        aria-modal="true"
        on:click|stopPropagation
    >
        <div class="mb-4 flex justify-between items-center">
            <h2 class="text-lg font-semibold">{$t('filter.title')}</h2>
            <button on:click={closeFilterModal} class="text-gray-500">×</button>
        </div>
        <div class="applied-filters">
            {#if dateRangeFilter || selectedPaymentMethods.length > 0 || selectedStatuses.length > 0}
                <div class="applied-filters bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 class="text-md font-semibold text-gray-800">{$t('filter.title.appliedFilters')}</h3>
                    <div class="flex flex-wrap gap-x-2 gap-y-4">
                        <div class="text-gray-600">
                            <span class="inline-block bg-orange-200 text-orange-800 rounded-full px-2 py-1 text-sm mr-2 mt-2">{$t(getTranslationKey.dateRange(dateRangeFilter))}</span>
                            {#each selectedPaymentMethods as paymentMethod}
                            <span class="inline-block bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-sm mr-2 mt-2">
                                {$t(getTranslationKey.paymentMethod(paymentMethod))}
                            </span>
                            {/each}
                            {#each selectedStatuses as status}
                            <span class="inline-block bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-sm mr-2 mt-2">
                                {$t(getTranslationKey.transactionStatus(status))}
                            </span>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <div class="date-filter mb-4 mt-4">
            <h3 class="text-md font-semibold">{$t('filter.title.dateRange')}</h3>
            <select
                bind:value={dateRangeFilter}
                on:change={(e) =>
                handleDateRangeChange((e?.target as HTMLSelectElement).value as DateRangesEnum)}
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-base
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            >
                {#each dateRanges as daterange}
                <option value={daterange}>
                    {$t(getTranslationKey.dateRange(daterange))}
                </option>
                {/each}
            </select>
        </div>
        <div class="payment-method-filter mb-4">
            <h3 class="text-md font-semibold">{$t('filter.title.paymentMethod')}</h3>
            <div class="grid grid-cols-1 gap-2 mt-2">
                {#each paymentMethods as paymentMethod}
                    <label class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                            type="checkbox"
                            value={paymentMethod}
                            checked={isPaymentMethodSelected(paymentMethod)}
                            on:change={() => togglePaymentMethod(paymentMethod)}
                            class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span class="text-gray-700">
                            {$t(getTranslationKey.paymentMethod(paymentMethod))}
                        </span>
                    </label>
                {/each}
            </div>
        </div>

        <div class="buttons-container flex justify-between">
            <button
                on:click={() => {
                handleRemoveAllFilters();
                }}
                class="w-full px-3 py-2 text-sm text-gray-600 bg-gray-200 hover:bg-gray-400 rounded-md shadow-sm transition-colors duration-200 ease-in-out"
            >
                {$t('filter.clear')}
            </button>
            <button
                on:click={() => {
                applyFilters();
                }}
                class="w-full px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors duration-200 ease-in-out"
            >
                {$t('filter.apply')}
            </button>
        </div>
    </div>
</div>
