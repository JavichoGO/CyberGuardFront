<script setup lang="ts">
import appInput from '@/utils/appInput.vue';
import { useUser } from '@/composables/useLogin';
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router';

const toast = useToast()
const route = useRoute();
const { passwordModel, fetchUpdatePassword } = useUser();

const sucessAction = async () => {
  debugger;
  passwordModel.value.documentNumber = route.params.documentNumber;
  passwordModel.value.token = route.params.token;
  await fetchUpdatePassword();
  toast.success('Se actualizó la contraseña correctamente.');
}
</script>


<template>
    <main class="flex items-center justify-center h-screen bg-gray-100">
        <div class="w-full max-w-lg  bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-6 text-gray-700">Reestablecer contraseña</h2>
            <div class="mb-6">
              <app-input
              v-model="passwordModel.newPassword"
              id="password"
              name="password"
              type="text"
              label="Contraseña"
              placeholder="Nueva contraseña"
            />
              </div>
              <div class="">
                <app-input
                v-model="passwordModel.repeatPassword"
                name="repeat-password"
                type="text"
                label="Repetir contraseña"
                placeholder="Repetir contraseña"
              />
              </div>
              <button
              @click="sucessAction"
              class="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
              Recuperar contraseña
          </button>
        </div>
    </main>
</template>