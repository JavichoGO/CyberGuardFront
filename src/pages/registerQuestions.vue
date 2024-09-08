<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import  { useQuestion } from '../composables/useQuestion';
import  { useQuestionStore } from '../stores/useQuestionStore';
import { ref, onMounted, onUnmounted } from 'vue';
import { useToast } from "vue-toastification";
import appSelect from '@/utils/appSelect.vue';
import appInput from '@/utils/appInput.vue';
import Modal from '../utils/appModal.vue';
import { getFunction, getCategory } from '@/utils/globalVariables';

const toast = useToast()
const showModal = ref(false);
const router = useRouter();
const route = useRoute();
const userId = route.params.id;
const { modelQuestion, fetchRegisterQuestion, getFunctions, getCategories } = useQuestion();
const { getCatalog, setFunction } = useQuestionStore();

onMounted(async () => {
  await getCatalog();
})


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
</script>

<template>
    <main class="flex items-center justify-center h-screen">
        <div class="w-1/3 mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 class="text-2xl font-bold mb-4">  {{ userId ? 'Actualizar' : 'Registrar nueva' }}  pregunta</h1>
              <div class="flex justify-between">
                <div class="mb-7 w-64">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Función NIST</label>
                  <app-select :options="getFunctions" :model-value="modelQuestion.functionQuestions" v-model="modelQuestion.functionQuestions" @update:modelValue="setFunction($event)" />
                </div>
                <div class="mb-7 ml-3 w-64">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <app-select :options="getCategories" :disabled="!modelQuestion.functionQuestions" :model-value="modelQuestion.categoryQuestions" v-model="modelQuestion.categoryQuestions" />
                  </div>
              </div>
              <div class="mb-7">
                <app-input
                  v-model="modelQuestion.nameQuestions"
                  id="question"
                  name="question"
                  type="text"
                  label="Pregunta"
                  required
                  placeholder="Ingrese la pregunta"
                />
              </div>
              <div class="mb-7" v-for="(item, index) in modelQuestion.options" :key="index">
                <app-input
                v-model="item.optionName"
									type="text"
									:label="item.label"
									placeholder="Ingresar alternativa"
									required
									id="name-password"
								/>
              </div>
                <div class="flex items-center">
                  <button
                  @click="router.push({ name: 'gestors-question' });"
                class="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
                <button
                  type="button"
                  @click="showModal = true"
                  class="w-full ml-3 py-2 px-4 bg-blue-500  text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {{ userId ? 'Actualizar' : 'Registrar' }}
                </button>
                </div>
              
          </div>
          <Modal
            :isOpen="showModal"
            title="Confirmación"
            message="¿Desea registrar la nueva pregunta?"
            @update:isOpen="showModal = $event"
            @confirm="saveQuestion"
          />
          <!-- @update:isOpen="showModal = $event"
          @confirm="saveUsers" -->
    </main>
  </template>
