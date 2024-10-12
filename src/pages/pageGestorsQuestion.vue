<template>
    <div class="mt-10">
        <h1 class="text-4xl font-bold text-gray-900 text-center">Gestión de preguntas</h1>
        <div class="flex justify-end px-8 mt-3">
            <button @click="router.push({ name: 'register-question' })" class="bg-blue-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Nueva pregunta
              </button>
        </div>
        <div class="mb-4 flex items-center px-9">
            <div class="w-1/3">
                <app-input
                v-model="searchQuery"
                type="text"
                label="Ingrese valor"
                maxLength="50"
                id="name-input"
                @keyup.enter="searchQuestion"
              />
            </div>
            <div class="w-1/4 ml-5">
                <button @click="searchQuestion" class="bg-blue-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Buscar
                  </button>
            </div>
          </div>
        <div class="mt-8 mx-9">
          <table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-md">
  <thead class="bg-gray-50">
    <tr>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nro.</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Función NIST</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">Categoria</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-md truncate">Pregunta</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="item in questions" :key="item.id" class="hover:bg-gray-100">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.number }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.functionQuestionsDescription }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" :title="item.categoryQuestionsDescription">{{ item.categoryQuestionsDescription }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-2xl truncate" :title="item.nameQuestions">{{ item.nameQuestions }}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button class="text-blue-500 hover:text-blue-700" @click="editQuestion(item)">
          <PencilIcon class="h-6 w-6" />
        </button>
        <button class="text-red-500 hover:text-red-700 ml-4" @click="openDialog(item.idQuestion)">
          <TrashIcon class="h-6 w-6" />
        </button>
      </td>
    </tr>
  </tbody>
</table>
        </div>   
        <Modal
        :isOpen="showModal"
        title="Confirmación"
        message="¿Desea eliminar la pregunta?"
        @update:isOpen="showModal = $event"
        @confirm="deleteQuestion"
      />
    </div>
    <!-- @confirm="saveQuestion" -->
</template>

<script setup>
import appInput from '../utils/appInput.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useQuestion } from '@/composables/useQuestion';
import { useQuestionStore } from '../stores/useQuestionStore';
import Modal from '../utils/appModal.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast()
const { getQuestions, filteredQuestion, setQuestion } = useQuestionStore();
const { questions, fetchDeleteQuestion, messageText } = useQuestion();

const searchQuery = ref(null);
const showModal = ref(false);
const idQuestion = ref(null);

onMounted(async () => {
  await getQuestions();
})

const openDialog = (id) => {
  showModal.value = true;
  idQuestion.value = id;
}

const editQuestion = (item) => {
  setQuestion(item);
  router.push({ name: 'register-question', params: { id: item.idQuestion } })
}

const deleteQuestion = async () => {
  await fetchDeleteQuestion(idQuestion.value);
  toast.success(messageText.value);
  await getQuestions();
}

const searchQuestion = () => {
  const query = searchQuery.value.toLowerCase();
  filteredQuestion(query)
}
</script>