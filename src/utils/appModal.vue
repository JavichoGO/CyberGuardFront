<!-- src/components/Modal.vue -->
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      class="fixed inset-0 bg-gray-900 opacity-50"
      @click="closeModal"
    ></div>
    <div
      class="bg-white p-6 rounded-lg shadow-lg z-10 w-1/3"
    >
      <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          @click="confirm"
        >
          Sí
        </button>
        <button
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          @click="closeModal"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  title: String,
  message: String,
});

const emit = defineEmits(['update:isOpen', 'confirm']);

const closeModal = () => {
  emit('update:isOpen', false);
};

const confirm = () => {
  emit('confirm');
  closeModal();
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>