<script setup lang="ts">
import Modal from '../utils/appModal.vue';
import { onMounted, ref } from 'vue';
import { useForm } from '../composables/useForm';
import { useRouter } from 'vue-router';

const { getQuestions, getForm } = useForm();
const router = useRouter();


const showModal = ref(false);

const postForm = async () => {
    router.push({ name: 'answer-question' });
    await getQuestions();
}

const openDialog = () => {
    showModal.value = true;
}
</script>


<template>
    <div class="mt-12">
        <h1 class="text-4xl font-bold text-gray-900 text-center mb-10 mt-10">Cuestionario PWC</h1>
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
        <Modal
            :isOpen="showModal"
            title=""
            message="Deseas iniciar el test ?"
            @update:isOpen="showModal = $event"
            @confirm="postForm"
          />
    </div>
</template>