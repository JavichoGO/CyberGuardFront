<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useUser } from '@/composables/useUsers';
import appInput from '@/utils/appInput.vue';
import Modal from '../utils/appModal.vue';
import { ref, onUnmounted } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast()
const router = useRouter();
const route = useRoute();
const userId = route.params.id;
console.log(userId)

const showModal = ref(false);
const textModal = ref('');
const { modelUser, fetchRegisterUser, fetchUpdateUser, response, messageStatus } = useUser();

const saveUsers = async () => {
  await fetchRegisterUser(userId);
  if (response.value == 201) {
    const message = userId ? 'actualizó' : 'registró';
    toast.success(`Se ${message} correctamente.`);
    router.push({ name: 'gestors-user' })
  } else {
    toast.error(messageStatus.value)
  }
};

onUnmounted(() => {
  modelUser.value.nameAll = null;
  modelUser.value.identification = null;
  modelUser.value.position = null;
  modelUser.value.dateOfBirth = null;
  modelUser.value.email = null;
  modelUser.value.password = null;
});

const openModal = () => {
  showModal.value = true;
  textModal.value = userId ? 'Desea actualizar los datos del usuario ?' : '¿Desea registrar al nuevo usuario?';
}
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="w-1/3 mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 class="text-2xl font-bold mb-4">Registrar nuevo usuario</h1>
              <div class="mb-4">
                <app-input
                  v-model="modelUser.nameAll"
                  id="fullName"
                  required
                  name="fullName"
                  type="text"
                  label="Nombre completo"
                  placeholder="Ingrese nombre completo"
                />
              </div>
              <div class="mb-4">
                <app-input
                  v-model="modelUser.identification"
                  id="document"
                  required
                  name="document"
                  type="number"
                  label="Número de DNI (usuario)"
                  placeholder="Ingrese número de DNI"
                />
              </div>
              <div class="mb-2">
                <app-input
                  v-model="modelUser.position"
                  id="position"
                  name="position"
                  type="text"
                  label="Cargo"
                  required
                  placeholder="Ingrese el cargo"
                />
                </div>
                <div class="mb-4">
                  
                  <label for="email" class="block text-xs font-medium text-gray-700">Fecha de nacimiento</label>
                  <input
                    type="date"
                    id="date-picker"
                    v-model="modelUser.dateOfBirth"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div class="mb-4">
                  <app-input
                  v-model="modelUser.email"
                  id="email"
                  name="email"
                  type="email"
                  required
                  label="Correo electronico"
                  placeholder="Ingrese el correo"
                />
                </div>
                <div class="mb-4">
                  <app-input
                    v-model="modelUser.password"
                    id="password"
                    name="password"
                    type="text"
                    label="Contraseña"
                    required
                    placeholder="Ingrese la contraseña"
                  />
                </div>
                <div class="flex items-center">
                  <button
                  @click="router.push({ name: 'gestors-user' });"
                class="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
                  <button
                  @click="openModal"
                  class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-3"
                >
                  Registrar
                </button>
                </div>
          </div>
          <Modal
            :isOpen="showModal"
            title="Confirmación"
            :message="textModal"
            @update:isOpen="showModal = $event"
            @confirm="saveUsers"
          />
    </div>
  </template>
