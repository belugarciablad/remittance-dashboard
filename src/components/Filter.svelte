<script lang="ts">
    import {TransactionStatus} from '../store/transactions';
    import {DateRangesEnum} from '../types/date-ranges-type';

    export let selectedStatuses: string[] = [];
    export let dateRangeFilter;
    export let updateStatusCheckbox: (statuses: string[]) => void;
    export let updateDateRangeFilter: (daterange: DateRangesEnum) => void;

    const availableStatuses = ['All', ...Object.values(TransactionStatus)];
    const dateRanges = Object.values(DateRangesEnum);
  
    const isStatusSelected = (status: string) => (status === "All") ? areAllStatusesSelected() : selectedStatuses.includes(status);

  
    const toggleStatus = (status: string) => {
        if (status === 'All') {
            selectedStatuses = areAllStatusesSelected() ? [] : availableStatuses.slice(1);
        } else {
            selectedStatuses = isStatusSelected(status) ? selectedStatuses.filter(s => s !== status) : [...selectedStatuses, status]
        }
        updateStatusCheckbox(selectedStatuses);
    };

    const areAllStatusesSelected = () =>  selectedStatuses.length === availableStatuses.length - 1;

    //radio button
    const handleDateRangeChange = (range) => {
        dateRangeFilter = range;
        console.log(range)
        updateDateRangeFilter(range);
    }

    const isRadioButtonSelected = (range) => dateRangeFilter === range; 
   
</script>

<div class="filters mb-4 flex justify-center gap-40">
    <div class="status-filter">
        <h3 class="flex justify-center">Status</h3>
        <div class="flex space-x-5">
            {#each availableStatuses as status}
              <label class="inline-flex items-center space-x-1">
                <input 
                  type="checkbox" 
                  checked={isStatusSelected(status)}
                  on:change={() => toggleStatus(status)} 
                  class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded-lg"
                  />
                  <span class="text-gray-700">{status}</span>
              </label>
            {/each}
        </div>
    </div>
    <div class="date-filter">
        <h3 class="flex justify-center">Date Range</h3>
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

  