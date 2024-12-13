<script setup>
import appInput from '../utils/appInput.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch, computed } from 'vue';
import { useQuestion } from '@/composables/useQuestion';
import { useQuestionStore } from '../stores/useQuestionStore';
import Modal from '../utils/appModal.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const { getQuestions, filteredQuestion, setQuestion } = useQuestionStore();
const { fetchDeleteQuestion, messageText } = useQuestion();

const searchQuery = ref(null);
const showModal = ref(false);
const idQuestion = ref(null);
const replied = ref(false); // Variable para almacenar si la pregunta ya ha sido respondida.

const questions = computed(() => useQuestionStore().questions);

onMounted(async () => {
  await getQuestions();
});

watch(searchQuery, (newValue) => {
  filteredQuestion(newValue || '');
});

const openDialog = (id, questionReplied) => {
  showModal.value = true;
  idQuestion.value = id;
  replied.value = questionReplied; // Almacenar si la pregunta ha sido respondida para ajustar el mensaje
};

const editQuestion = (item) => {
  setQuestion(item);
  router.push({ name: 'register-question', params: { id: item.idQuestion } });
};

watch(searchQuery, (newValue) => {
  filteredQuestion(newValue);
});

const deleteQuestion = async () => {
  await fetchDeleteQuestion(idQuestion.value);
  toast.success('Se eliminó la pregunta correctamente.');
  await getQuestions();
};

const searchQuestion = () => {
  const query = searchQuery.value && searchQuery.value.toLowerCase();
  filteredQuestion(query);
};
</script>

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
          label="Ingrese la Función, Categoría o Pregunta"
          maxLength="50"
          id="name-input"
        />
      </div>
    </div>
    <div class="mt-8 mx-9">
      <table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-md">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nro.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Función NIST</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Pregunta</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in questions" :key="item.id" class="hover:bg-gray-100">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.number }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.functionQuestionsDescription }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[12rem] truncate" :title="item.categoryQuestionsDescription">{{ item.categoryQuestionsDescription }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[30rem] truncate" :title="item.nameQuestions">{{ item.nameQuestions }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button class="text-blue-500 hover:text-blue-700" @click="editQuestion(item)">
                <PencilIcon class="h-6 w-6" />
              </button>
              <button class="text-red-500 hover:text-red-700 ml-4" @click="openDialog(item.idQuestion, item.replied)">
                <TrashIcon class="h-6 w-6" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>   
    <Modal
      :isOpen="showModal"
      :title="'Confirmación'"
      :message="replied ? '¿Desea eliminar la pregunta? La pregunta ha sido respondido por lo menos por 1 usuario, desea eliminarla de todos modos?' : '¿Desea eliminar la pregunta?'"
      @update:isOpen="showModal = $event"
      @confirm="deleteQuestion"
    />
  </div>
</template>

