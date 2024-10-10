<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from '../composables/useForm';
import { useRouter, useRoute } from 'vue-router';
import { useFormStore } from '../stores/useFormStore';
import  { storeToRefs } from 'pinia';
import Modal from '../utils/appModal.vue';

const { fetchQuestions, getShowFinished, fetchUpdate } = useForm();
const store = useFormStore();
const router = useRouter();
const route = useRoute();

const showValidCompleted = ref(false);

const validationPage = ref(route.query.isSolution)


const showModal = ref(false);

const postForm = async () => {
    await fetchUpdate();
    await fetchQuestions();
    router.push({ name: 'answer-question' });
}

const openDialog = () => {
    if (getShowFinished.value) { 
        showValidCompleted.value = true;
    } else {
        showModal.value = true;
    }
}

const resetQuestionFunction = () => {
    postForm();
}

onMounted(async () => {
  await fetchQuestions();
})
</script>


<template>
    <div class="mt-2">
        <h1 class="text-4xl font-bold text-gray-900 text-center mb-10 mt-10">Cuestionario PWC</h1>
        <div v-if="validationPage">
            <h2 class="text-2xl text-center">
                MUCHAS GRACIAS POR REALIZAR LA ENCUESTA !
            </h2>
            <div class="flex justify-center mt-5">
                <button
                @click="router.push({ name: 'metrics-management' });"
                class=" bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
            >
              VER MÉTRICAS
            </button>
            </div> 
        </div>
        <div v-else>
            <h2 class="text-2xl text-center text-justify mx-auto" style="max-width: 800px;">
        Este formulario está diseñado para determinar el grado de madurez de las Cajas Municipales de Ahorro y Crédito (CMAC) en el Perú a través de su punto de vista como integrante de la empresa auditora PWC.<br><br>
        Por favor, tenga en cuenta que las preguntas están dirigidas únicamente a recoger su opinión personal y aseguramos la completa confidencialidad de sus respuestas. Los datos recopilados se utilizarán exclusivamente con fines académicos.
    </h2>
             <div class="flex justify-end mt-5">
                


                <button
                @click="openDialog"
                class="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
            >
             Iniciar test
            </button>
            </div> 
        </div>
        <Modal
            :isOpen="showModal"
            title=""
            message="Deseas iniciar el test ?"
            @update:isOpen="showModal = $event"
            @confirm="postForm"
          />
          <Modal
          :isOpen="showValidCompleted"
          title="Desea realizar nuevamente el cuestionario ?"
          message="Se eliminará la encuesta realizada previamente"
          @update:isOpen="showValidCompleted = $event"
          @confirm="resetQuestionFunction"
        />
    </div>
</template>