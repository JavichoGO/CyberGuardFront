<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from '../composables/useForm';
import { useRouter, useRoute } from 'vue-router';
import { useFormStore } from '../stores/useFormStore';
import  { storeToRefs } from 'pinia';
import Modal from '../utils/appModal.vue';

const { fetchQuestions } = useForm();
const store = useFormStore();
// const { fetchQuestion } = storeToRefs(store);
const router = useRouter();
const route = useRoute();

const validationPage = ref(route.query.isSolution)
console.log(validationPage);


const showModal = ref(false);

const postForm = async () => {
    router.push({ name: 'answer-question' });
    await fetchQuestions();
}

const openDialog = () => {
    showModal.value = true;
}
</script>


<template>
    <div class="mt-2">
        <h1 class="text-4xl font-bold text-gray-900 text-center mb-10 mt-10">Cuestionario PWC</h1>
        <div v-if="validationPage">
            <h2 class="text-2xl text-center">
                MUCHAS GRACIAS POR REALIZAR LA ENCUESTA !
            </h2>
            <div class="flex justify-end mt-5">
                <button
                @click="router.push({ name: 'metrics-management' });"
                class="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
            >
              VER MÉTRICAS
            </button>
            </div> 
        </div>
        <div v-else>
            <h2 class="text-2xl text-center">
                Este formulario está diseñado para determinar el grado de madurez de las Cajas Municipales de Ahorro y Crédito (CMAC) en el Perú a través de su punto de vista como integrante de la empresa auditora PWC.
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
    </div>
</template>