<!-- src/components/Select.vue -->
<template>
    <div class="relative inline-block w-full">
      <select
        :value="modelValue"
        @change="handleChange"
        class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option v-for="option in options" :key="option.value" :value="option.id">
          {{ option.description }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  function handleChange(event) {
    emit('update:modelValue', event.target.value);
  }
  </script>
  
  <style scoped>
  /* Puedes agregar estilos adicionales aquí si es necesario */
  </style>