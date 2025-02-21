<script lang="ts">
    import {TransactionStatus} from "../types/transaction-model";
    import {DateRangesEnum} from '../types/date-ranges-type';

    export let selectedStatuses: string[] = [];
    export let dateRangeFilter;
    export let updateStatusCheckbox: (statuses: string[]) => void;
    export let updateDateRangeFilter: (daterange: DateRangesEnum) => void;

    const availableStatuses = Object.values(TransactionStatus);
    const dateRanges = Object.values(DateRangesEnum);
  
    const isStatusSelected = (status: string) => selectedStatuses.includes(status);

  
    const toggleStatus = (status: string) => {
        selectedStatuses = isStatusSelected(status) 
            ? selectedStatuses.filter(s => s !== status) 
            : [...selectedStatuses, status];
        updateStatusCheckbox(selectedStatuses);
    };

    const handleDateRangeChange = (range) => {
        dateRangeFilter = range;
        console.log(range)
        updateDateRangeFilter(range);
    }

    const isRadioButtonSelected = (range) => dateRangeFilter === range; 
   
</script>

<div class="filters mb-4 flex justify-center gap-40">
    <div class="status-filter">
        <div class="flex space-x-5">
            {#each availableStatuses as status}
              <label class="inline-flex items-center space-x-1">
                <input 
                  type="checkbox" 
                  checked={isStatusSelected(status)}
                  on:change={() => toggleStatus(status)} 
                  class="hidden peer"
                  />
                  <span class="w-20 h-8 text-sm border-2 border-gray-200 rounded-md flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white transition-colors">
                    {status}
                  </span>
              </label>
            {/each}
        </div>
    </div>
    <div class="date-filter">
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
                    <span class="text-gray-700">{daterange}</span>
              </label>            
            {/each}
        </div>
    </div>
</div>

  