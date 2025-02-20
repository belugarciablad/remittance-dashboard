<script lang="ts">
    import {TransactionStatus} from '../store/transactions'
    export let selectedStatuses: string[] = [];
    export let updateStatusCheckbox: (statuses: string[]) => void; 

    const availableStatuses = ['All', ...Object.values(TransactionStatus)];
  
    const isSelected = (status: string) => (status === "All") ? areAllSelected() : selectedStatuses.includes(status);

  
    const toggleStatus = (status: string) => {
        if (status === 'All') {
            selectedStatuses = areAllSelected() ? [] : availableStatuses.slice(1);
        } else {
            selectedStatuses = isSelected(status) ? selectedStatuses.filter(s => s !== status) : [...selectedStatuses, status]
        }
        updateStatusCheckbox(selectedStatuses);
    };

    const areAllSelected = () =>  selectedStatuses.length === availableStatuses.length - 1;
</script>
  
<div class="flex space-x-4">
    {#each availableStatuses as status}
      <label>
        <input 
          type="checkbox" 
          checked={isSelected(status)}
          on:change={() => toggleStatus(status)} />
        {status}
      </label>
    {/each}
</div>
  