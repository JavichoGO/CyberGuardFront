<script setup lang="ts">
import { useRouter, useRoute} from 'vue-router';
import Modal from '../utils/appModal.vue';
import { useForm } from '../composables/useForm';
import { useFormStore } from '../stores/useFormStore';
import { ref } from 'vue';

const { getIdentify, getForm, getDetected, getProtect, getRecover, getRespond } = useForm();

const router = useRouter();

const { fetchSaveQuestion } = useFormStore();
const formularioActual = ref(1);

const changePage = (numero: number) => {
  formularioActual.value = numero;
};

const showModal = ref(false);


const saveQuestions = () => {
  showModal.value = true;
  console.log('respuesta');
}

const save = async () => {
  await fetchSaveQuestion();
  router.push({ name: 'respuest', query: { isSolution: true } });
}

const responses = ref(new Array(getIdentify.length).fill(null));
</script>

<template>
  <div>
    <div v-if="formularioActual === 1">
      <div class="text-2xl font-bold mb-6">{{getIdentify[0].functionQuestionsDescription }} </div>
      <div v-for="(item, indexHeader) in getIdentify" :key="indexHeader" class="mb-4">
        {{ indexHeader + 1 }}.  {{ item.nameQuestion }}
        <div>
        <label v-for="(option, index) in item.optionsList" :key="index" class="flex items-center space-x-2 cursor-pointer">
            <input
              :name="'option-' + indexHeader"
              type="radio"
              :value="option.id"
              v-model="getIdentify[indexHeader].optionValue"
              class="form-radio text-blue-500"
            />
            <span :for="`option-${index}`" class="text-gray-700">{{ option.nameOption }}</span>
          </label>
        </div>
    </div>
    <div class="flex justify-end mt-5">
      <button
        @click=" router.push({ name: 'respuest' })"
        class="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Cancelar
      </button>
    <button
    @click="changePage(2)"
        class="bg-blue-500 ml-2 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
    >
    Siguiente
    </button>
    </div>
    </div>
    <div v-if="formularioActual === 2">
      <div class="text-2xl font-bold mb-6">{{getDetected[0].functionQuestionsDescription }} </div>
      <div v-for="(item, indexHeader) in getDetected" :key="indexHeader" class="mb-4">
        {{ indexHeader + 1 }}.  {{ item.nameQuestion }}
        <div>
        <label v-for="(option, index) in item.optionsList" :key="index" class="flex items-center space-x-2 cursor-pointer">
            <input
            :name="'option-' + indexHeader"
            type="radio"
            :value="option.id"
            v-model="getDetected[indexHeader].optionValue"
              class="form-radio text-blue-500"
            />
            <span class="text-gray-700">{{ option.nameOption }}</span>
          </label>
        </div>
    </div>
    <div class="flex justify-end mt-5">
      <button
      @click="changePage(1)"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancelar
    </button>
  <button
  @click="changePage(3)"
      class="bg-blue-500 ml-2 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
  >
  Siguiente
  </button>
    </div>
    </div>
    <div v-if="formularioActual === 3">
      <div class="text-2xl font-bold mb-6">{{getProtect[0].functionQuestionsDescription }} </div>
      <div v-for="(item, indexHeader)  in getProtect" :key="indexHeader" class="mb-4">
        {{ indexHeader + 1 }}.  {{ item.nameQuestion }}
        <div>
        <label v-for="option in item.optionsList" :key="option.value" class="flex items-center space-x-2 cursor-pointer">
            <input
            :name="'option-' + indexHeader"
            type="radio"
            :value="option.id"
            v-model="getProtect[indexHeader].optionValue"
              class="form-radio text-blue-500"
            />
            <span class="text-gray-700">{{ option.nameOption }}</span>
          </label>
        </div>
    </div>
    <div class="flex justify-end mt-5">
      <button
      @click="changePage(2)"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancelar
    </button>
  <button
  @click="changePage(4)"
      class="bg-blue-500 ml-2 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
  >
  Siguiente
  </button>
    </div>
    </div>
    <div v-if="formularioActual === 4">
      <div class="text-2xl font-bold mb-6">{{getRecover[0].functionQuestionsDescription }} </div>
      <div v-for="(item, indexHeader) in getRecover" :key="indexHeader" class="mb-4">
        {{ indexHeader + 1 }}.  {{ item.nameQuestion }}
        <div>
        <label v-for="option in item.optionsList" :key="option.value" class="flex items-center space-x-2 cursor-pointer">
            <input
            :name="'option-' + indexHeader"
            type="radio"
            :value="option.id"
            v-model="getRecover[indexHeader].optionValue"
              class="form-radio text-blue-500"
            />
            <span class="text-gray-700">{{ option.nameOption }}</span>
          </label>
        </div>
    </div>
    <div class="flex justify-end mt-5">
      <button
      @click="changePage(3)"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancelar
    </button>
  <button
  @click="changePage(5)"
      class="bg-blue-500 ml-2 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
  >
  Siguiente
  </button>
    </div>
    </div>
    <div v-if="formularioActual === 5">
      <div class="text-2xl font-bold mb-6">{{getRespond[0].functionQuestionsDescription }} </div>
      <div v-for="(item, indexHeader) in getRespond" :key="indexHeader" class="mb-4">
        {{ indexHeader + 1 }}.  {{ item.categoryQuestionsDescription }}
        <div>
        <label v-for="option in item.optionsList" :key="option.value" class="flex items-center space-x-2 cursor-pointer">
            <input
            :name="'option-' + indexHeader"
            type="radio"
            :value="option.id"
            v-model="getRespond[indexHeader].optionValue"
              class="form-radio text-blue-500"
            />
            <span class="text-gray-700">{{ option.nameOption }}</span>
          </label>
        </div>
    </div>
    <div class="flex justify-end mt-5">
      <button
      @click="changePage(4)"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancelar
    </button>
  <button
  @click="saveQuestions"
      class="bg-blue-500 ml-2 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
  >
  Siguiente
  </button>
    </div>
    </div>
    <Modal
    :isOpen="showModal"
    title="Registro cuestionario"
    message="Desea enviar el cuestionario ?"
    @update:isOpen="showModal = $event"
    @confirm="save"
  />
  </div>
</template>