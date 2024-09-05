<template>
  <div class="flex items-center space-x-2">
    <label for="date-picker" class="text-gray-700">Selecciona una fecha:</label>
    <input
      type="date"
      id="date-picker"
      v-model="selectedDate"
      class="bg-white border border-gray-300 rounded-lg shadow-sm p-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      placeholder="Selecciona una fecha"
    />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const selectedDate = ref(null);
    return { selectedDate };
  }
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>