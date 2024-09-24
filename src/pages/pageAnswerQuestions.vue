<script setup lang="ts">
import { useRouter, useRoute} from 'vue-router';
import { onMounted, ref } from 'vue';
import Modal from '../utils/appModal.vue';
import { useForm } from '../composables/useForm';
import { useFormStore } from '../stores/useFormStore';

const { getIdentify, getForm, getDetected, getProtect, getRecover, getRespond } = useForm();

const router = useRouter();

const { fetchSaveQuestion } = useFormStore();
const formularioActual = ref(1);

// onMounted(async () => {
//   await fetchQuestions();
// })

const validArray = (code: string) => {
  if (code == 'identify') {
    const validForm = getIdentify.value.every((row: any) => row.optionValue);
    return validForm;
  } else if (code == 'detected') {
    const validForm = getDetected.value.every((row: any) => row.optionValue);
    return validForm;
  } else if (code == 'protect') {
    const validForm = getProtect.value.every((row: any) => row.optionValue);
    return validForm;
  } else if (code == 'recover') {
    const validForm = getRecover.value.every((row: any)  => row.optionValue);
    return validForm;
  }
}

const changePage = (numero: number, code?: string | null | undefined) => {
  const responseValid = validArray(code);
  if (responseValid) {
    formularioActual.value = numero;
  } else {
    showRequestComplete.value = true;
  }
};

const showModal = ref(false);
const showRequestComplete = ref(false);


const saveQuestions = () => {
  const validForm = getRespond.value.every((row: any) => row.optionValue);
  if (validForm) {
    showModal.value = true;
  } else {
    showRequestComplete.value = true;
  }
}

const save = async () => {
  await fetchSaveQuestion();
  router.push({ name: 'respuest', query: { isSolution: true } });
}
</script>

<template>
  <div>
    <div v-if="formularioActual === 1">
      <div class="text-2xl font-bold mb-6">{{getIdentify[0] && getIdentify[0].functionQuestionsDescription }} </div>
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
    @click="changePage(2, 'identify')"
        class="bg-blue-500 ml-2 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
    >
    Siguiente
    </button>
    </div>
    </div>
    <div v-if="formularioActual === 2">
      <div class="text-2xl font-bold mb-6">{{getDetected[0] && getDetected[0].functionQuestionsDescription }} </div>
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
      @click="changePage(1, '')"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancelar
    </button>
  <button
  @click="changePage(3, 'detected')"
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
      @click="changePage(2, '')"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancelar
    </button>
  <button
  @click="changePage(4, 'protect')"
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
      @click="changePage(3, '')"
      class="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Cancelar
    </button>
  <button
  @click="changePage(5, 'recover')"
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
  <Modal
  :isOpen="showRequestComplete"
  title="Registrar preguntas"
  message="Para continuar a la siguiente modulo debe completar todas preguntas"
  @confirm="showRequestComplete = false"
  :show-close="false"
/>
  </div>
</template>