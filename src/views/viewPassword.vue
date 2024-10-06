<script setup lang="ts">
import appInput from '@/utils/appInput.vue';
import { useUser } from '@/composables/useLogin';
import  { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast()
const {  fetchResetPassword, emailRecoveryComputed } = useUser();

const actionResetPassword = async () => {
  await fetchResetPassword();
  toast.success('Se envio un correo para actualizar su contraseña.');
}
</script>

<template>
  <main class="flex items-center justify-center h-screen">
    <div class="w-full max-w-lg  bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-700">Olvidé mi contraseña</h2>
            <div class="mb-4">
              <app-input
              v-model="emailRecoveryComputed.emailRecovery"
              id="emailRecovery"
              name="emailRecovery"
              type="email"
              required
              label="Ingresar email"
            />
            </div>
            <div class="flex items-center">
                <button
                @click="router.push({ name: 'home' });"
                class="w-full mt-4 bg-red-500  text-white py-2 px-4 rounded-md shadow-sm focus:outline-none"
            >
                Cancelar
            </button>
            <button
                @click="actionResetPassword"
                class="w-full ml-4 mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none"
            >
                Restablecer contraseña
            </button>
            </div>
    </div>
  </main>
</template>
