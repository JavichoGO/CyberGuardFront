<script setup lang="ts">
import appSelect from '../utils/appSelect.vue';
import ChartComponent from '../components/ChartComponent.vue';
import HexagonalComponent from '../components/HexagonalComponent.vue';
</script>

<template>
  <div class="mt-10">
    <h1 class="text-4xl font-bold text-gray-900 text-center mb-7">Gestión de métricas</h1>
    <div class="mb-4 flex items-center px-9">
      <div class="w-1/3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Value</label>
          <appSelect :options="[]" />
      </div>
      <div class="w-1/4 ml-5">
          <button class="bg-blue-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none mt-5">
              Buscar
            </button>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div class="flex w-1/3">
        <ChartComponent />
      </div>
      <div class="flex w-1/3">
        <HexagonalComponent />
      </div>
    </div>
    <div class="flex justify-center mt-9">
      <button class="bg-blue-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Descargar
      </button>
    </div>
  </div>
</template>