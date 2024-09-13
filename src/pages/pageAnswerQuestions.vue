<script setup lang="ts">
import { useForm } from '../composables/useForm';

const { getIdentify, getForm } = useForm();
</script>

<template>
  <!-- {{ getIdentify }} -->
    <div v-for="(item, index) in getIdentify" :key="index">
        {{ index + 1 }}.  {{ item.categoryQuestionsDescription }}
        <div>
         <label v-for="option in item.optionsList" :key="option.value" class="flex items-center space-x-2 cursor-pointer">
             <input
               type="radio"
               :value="option.value"
               class="form-radio text-blue-500"
             />
             <span class="text-gray-700">{{ option.nameOption }}</span>
           </label>
        </div>
     </div>
     <button
         class="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
     >
     Siguiente
     </button>
</template>