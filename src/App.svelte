<script lang="ts">
  import TransactionList from './components/TransactionList.svelte';
</script>

<!-- Main container for the dashboard -->
<div class="min-h-screen bg-gray-100 flex flex-col">

  <!-- Header -->
  <header class="bg-blue-600 text-white p-4">
    <h1 class="text-3xl font-bold">Dashboard de Remesas</h1>
  </header>

  <!-- Main content area -->
  <main class="flex-grow p-6">
    <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">Transacciones</h2>
      
      <!-- Transaction List -->
      <TransactionList />
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-blue-600 text-white p-4 text-center">
    <p> 2025 Remittance Dashboard. Todos los derechos reservados.</p>
  </footer>

</div>
