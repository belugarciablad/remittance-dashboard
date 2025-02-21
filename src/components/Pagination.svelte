<script lang="ts">
    export let currentPage: number;
    export let totalPages: number;
    export let goToPage: (page: number) => void;
</script>
  
<div class="flex space-x-2 justify-center">
    <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
    <span>Página {currentPage} de {totalPages}</span>
    <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
</div>
  