<script setup lang="ts">
import appInput from '@/utils/appInput.vue';
import { useUser } from '@/composables/useLogin';
// import  { useLogin } from '../stores/useLoginStore';
import  { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { onUnmounted } from 'vue';

const router = useRouter();
const { modelLogin, fetchLogin, roleUser, showSidebar } = useUser();

const successUser = async () => {
  await fetchLogin();
  debugger;
  if (roleUser.value == 'ROLE_USER') {
    router.push({ name: 'respuest' });
  } else {
    router.push({ name: 'gestors-user' });
  }
  showSidebar.value = true;
}

onUnmounted(() => {
  modelLogin.value.documentNumber = null;
  modelLogin.value.password = null;
})
</script>

<template>
  <main class="flex items-center justify-center h-screen">
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
