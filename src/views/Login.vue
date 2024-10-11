<script setup lang="ts">
import appInput from '@/utils/appInput.vue';
import { useUser } from '@/composables/useLogin';
import  { storeToRefs } from 'pinia';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { onUnmounted } from 'vue';

const toast = useToast()
const router = useRouter();
const { modelLogin, fetchLogin, roleUser } = useUser();

const successUser = async () => {
  const responseLogin = await fetchLogin();
  console.log(responseLogin);
  if (responseLogin.message) {
    toast.error(responseLogin.message);

  } else {
    if (roleUser.value == 'ROLE_USER') {
    router.push({ name: 'respuest' });
  } else {
    router.push({ name: 'gestors-user' });
  }
  }
}

onUnmounted(() => {
  modelLogin.value.documentNumber = null;
  modelLogin.value.password = null;
})
</script>

<template>
  <main class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-lg  bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-700">Iniciar sesión para continuar</h2>
            <div class="mb-4">
              <app-input
              v-model="modelLogin.documentNumber"
              id="document"
              name="document"
              type="text"
              label="Número de DNI"
              placeholder="Ingrese DNI"
            />
            </div>
            <div class="mt-6">
              <app-input
              v-model="modelLogin.password"
              id="password"
              name="password"
              type="text"
              label="Contraseña"
              placeholder="Ingresa su contraseña"
            />
            </div>
            <button
                @click="successUser"
                class="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Iniciar sesión
            </button>
            <div class="mb-6 mt-2">
              <router-link
                :to="{ name: 'view-password' }"
                class="text-gray-600 hover:text-indigo-800 font-medium text-lg"
              >
                ¿Olvidaste tu contraseña?
              </router-link>
          </div>
    </div>
    <div>
      
    </div>
  </main>
</template>
