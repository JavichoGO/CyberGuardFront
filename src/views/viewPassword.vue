<script setup lang="ts">
import appInput from '@/utils/appInput.vue';
import { useUser } from '@/composables/useLogin';
// import  { useLogin } from '../stores/useLoginStore';
import  { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const { modelLogin, fetchLogin } = useUser();

const actionResetPassword = async () => {
//   await fetchLogin();
//   router.push({ name: 'gestors-user' });
}
</script>

<template>
  <main class="flex items-center justify-center h-screen">
    <div class="w-full max-w-lg  bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-700">Olvidé mi contraseña</h2>
            <div class="mb-4">
              <app-input
              v-model="modelLogin.documentNumber"
              id="document"
              name="document"
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
