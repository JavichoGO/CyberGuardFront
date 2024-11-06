<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import  { useQuestion } from '../composables/useQuestion';
import  { useQuestionStore } from '../stores/useQuestionStore';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useToast } from "vue-toastification";
import appSelect from '@/utils/appSelect.vue';
import appInput from '@/utils/appInput.vue';
import Modal from '../utils/appModal.vue';

const toast = useToast()
const showModal = ref(false);
const router = useRouter();
const route = useRoute();
const userId = route.params.id;
const { modelQuestion, fetchRegisterQuestion, getFunctions, getCategories } = useQuestion();
const { getCatalog, setFunction } = useQuestionStore();
const disabledCategory = ref(true);
const textModal = ref('');

onMounted(async () => {
  await getCatalog();
  if (userId) {
    disabledCategory.value = false;
  }
})
const setModelFunction = (value: number) => {
  modelQuestion.value.functionQuestions = value;
  disabledCategory.value = false;
  modelQuestion.value.categoryQuestions = null;
  setFunction(value);
}

onUnmounted(() => {
  modelQuestion.value.nameQuestions = null;
  modelQuestion.value.functionQuestions = null;
  modelQuestion.value.categoryQuestions = null;
  modelQuestion.value.options = [
    {
      label: 'Alternativa 1 (1 punto)',
      optionValue: 1,
      optionName: null,
  },
  {
      label: 'Alternativa 2 (2 punto)',
      optionValue: 2,
      optionName: null,
  },
  {
      label: 'Alternativa 3 (3 punto)',
      optionValue: 3,
      optionName: null,
  },
  {
      label: 'Alternativa 4 (4 punto)',
      optionValue: 4,
      optionName: null,
  },
  {
      label: 'Alternativa 5 (5 punto)',
      optionValue: 5,
      optionName: null,
  },
  ];
});

const saveQuestion = async () => {
  await fetchRegisterQuestion(userId);
  const message = userId ? 'actualizó' : 'registró';
  toast.success(`Se ${message} correctamente.`);
  router.push({ name: 'gestors-question' })
}

const openModal = () => {

  const validOptions = modelQuestion.value.options && modelQuestion.value.options.every(p => p.optionName != null && p.optionName.length > 0);
  if (!modelQuestion.value.functionQuestions || !modelQuestion.value.categoryQuestions || !modelQuestion.value.nameQuestions || !validOptions) {
    toast.warning('Debe completar todos los campos obligatorios');
    return;
  }

  // Verificar si hay errores de validación
  if (computedMessageQuestion.value || modelQuestion.value.options.some(p => p.optionName && p.optionName.length > 100)) {
    toast.warning('Debe completar los campos correctamente');
    return;
  }
  showModal.value = true;
  textModal.value = userId ? '¿Desea actualizar los datos de la pregunta ?' : '¿Desea registrar la nueva pregunta?';
}

const computedMessageQuestion = computed(() => {
      if (modelQuestion.value.nameQuestions && modelQuestion.value.nameQuestions.length > 200)
       {
        return 'La Pregunta no debe ser mayor a 200 caracteres';
      }
      return '';
    });

</script>

<template>
  <main class="flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">{{ userId ? 'Actualizar' : 'Registrar nueva' }} pregunta</h1>

      <!-- Select de Función NIST -->
      <div class="flex flex-wrap justify-between mb-4">
        <div class="w-full md:w-1/2 mb-4 md:mb-0 pr-2">
          <label for="function-nist" class="block text-sm font-medium text-gray-700 mb-1">Función NIST</label>
          <app-select id="function-nist" :options="getFunctions" :model-value="modelQuestion.functionQuestions" @update:modelValue="setModelFunction($event)" />
        </div>
        <div class="w-full md:w-1/2 pl-2">
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <app-select id="category" :options="getCategories" :disabled="disabledCategory" :model-value="modelQuestion.categoryQuestions" @update:modelValue="modelQuestion.categoryQuestions = $event" />
        </div>
      </div>

      <!-- Campo: Pregunta -->
      <div class="mb-4">
        <label for="question" class="block text-sm font-medium text-gray-700 mb-1">Pregunta</label>
        <app-input
          v-model="modelQuestion.nameQuestions"
          id="question"
          name="question"
          type="text"
          placeholder="Ingrese la pregunta"
          required
          class="mt-1"
        />
        <p v-if="computedMessageQuestion" class="text-red-500 mt-1">{{ computedMessageQuestion }}</p>
      </div>

      <!-- Campos: Opciones de Respuesta -->
      <div class="mb-4" v-for="(item, index) in modelQuestion.options" :key="index">
        <label :for="'option-' + index" class="block text-sm font-medium text-gray-700 mb-1">{{ item.label }}</label>
        <app-input
          v-model="item.optionName"
          type="text"
          :id="'option-' + index"
          placeholder="Ingresar alternativa"
          required
          class="mt-1"
        />
        <p class="text-red-500 mt-1">{{ item.optionName && item.optionName.length > 100 ? 'No debe ser mayor a 100 caracteres' : '' }}</p>
      </div>

      <!-- Botones: Cancelar y Registrar -->
      <div class="flex flex-wrap items-center justify-between mt-6">
        <button
          @click="router.push({ name: 'gestors-question' })"
          class="flex-grow w-full md:w-auto mb-2 md:mb-0 py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:mr-2"
        >
          Cancelar
        </button>
        <button
          type="button"
          @click="openModal"
          class="flex-grow w-full md:w-auto py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {{ userId ? 'Actualizar' : 'Registrar' }}
        </button>
      </div>
    </div>

    <!-- Modal de Confirmación -->
    <Modal
      :isOpen="showModal"
      title="Confirmación"
      :message="textModal"
      @update:isOpen="showModal = $event"
      @confirm="saveQuestion"
    />
  </main>
</template>

