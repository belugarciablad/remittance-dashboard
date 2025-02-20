<script lang="ts">
    import type {TransactionStatus} from '../store/transactions'
    export let selectedStatuses: string[] = [];
    export let updateStatusCheckbox: (statuses: string[]) => void; 
  
    const isSelected = (status: string) => selectedStatuses.includes(status);
  
    const toggleStatus = (status: string) => {
      if (selectedStatuses.includes(status)) {
        selectedStatuses = selectedStatuses.filter(s => s !== status);
      } else {
        selectedStatuses = [...selectedStatuses, status];
      }
      updateStatusCheckbox(selectedStatuses);
    };
  </script>
  
  <div class="flex space-x-4">
    <label>
      <input 
        type="checkbox" 
        checked={isSelected('Completed')}
        on:change={() => toggleStatus('Completed')} />
      Completed
    </label>
  
    <label>
      <input 
        type="checkbox" 
        checked={isSelected('Pending')}
        on:change={() => toggleStatus('Pending')} />
      Pending
    </label>
  
    <label>
      <input 
        type="checkbox" 
        checked={isSelected('In Progress')}
        on:change={() => toggleStatus('In Progress')} />
      In progress
    </label>

    <label>
        <input 
          type="checkbox" 
          checked={isSelected('Failed')}
          on:change={() => toggleStatus('Failed')} />
        Failed
      </label>
  </div>
  