<!-- src/components/Input.vue -->
<template>
    <div class="relative">
      <input
        :type="type"
        :id="id"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
      />
      <label v-if="label" :for="id" class="absolute top-label left-0 px-2 py-1 text-gray-600 transition-transform transform -translate-y-1 scale-75 origin-top-left">
        {{ label }}
      </label>
      <p v-if="error" class="text-red-600 text-sm mt-1">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    id: String,
    name: String,
    placeholder: String,
    label: String,
    error: String,
    disabled: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const inputClasses = computed(() => [
    'w-full p-2 border rounded-md shadow-sm',
    'focus:outline-none focus:ring-2 focus:ring-blue-500',
    props.error ? 'border-red-500' : 'border-gray-300',
    props.disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'
  ]);
  
  const onFocus = () => {
    if (props.error) {
      // Optional: Clear error on focus
    }
  };
  
  const onBlur = () => {
    if (!props.modelValue) {
      // Optional: Show label or error handling
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here if needed */
  .top-label {
    top: -16px;
  }
  </style>