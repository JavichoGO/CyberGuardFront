<script setup lang="ts">
import appInput from '../utils/appInput.vue';
import { useUser } from '@/composables/useUsers';
import { storeUsers } from '../stores/useUserStore';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch, computed } from 'vue';
import Modal from '@/utils/appModal.vue';
import { useToast } from "vue-toastification";

const toast = useToast()
const router = useRouter();
const showModal = ref(false);
const idUser = ref(null);
const { getHttpUser, setUser, filteredUsers, actionDeleteUser } = storeUsers();
const { users, fetchUsers } = useUser();
const searchQuery = ref<string | null>('');
const user = computed(() => useUser().users);
const surveyAnswered = ref(false);
const modalTitle = ref<string>('Confirmación');
const modalMessage = ref<string>('¿Desea eliminar el usuario?');



onMounted(async () => {
  await getHttpUser();
})

watch(searchQuery, (newValue) => {
  filteredUsers(newValue || '');
});

const deleteUser = async () => {
  await actionDeleteUser(idUser.value);
  await getHttpUser();
  toast.success('Se eliminó el usuario correctamente.');
}

const editUser = (item: any) => {
  setUser(item);
  router.push({ name: 'register-user', params: { id: item.id } })
}

const openDialog = (id: any, userSurveyAnswered: boolean) => {
  showModal.value = true;
  idUser.value = id;
  surveyAnswered.value = userSurveyAnswered;

  // Actualizar el título y el mensaje del modal
  if (userSurveyAnswered) {
    modalTitle.value = 'Confirmación';
    modalMessage.value = '¿Desea eliminar al usuario? El usuario ha respondido la encuesta previamente. Se eliminará también la encuesta realizada.';
  } else {
    modalTitle.value = 'Confirmación';
    modalMessage.value = '¿Desea eliminar el usuario?';
  }
};

</script>

<template>
    <div class="mt-10">
        <h1 class="text-4xl font-bold text-gray-900 text-center">Gestión de usuarios</h1>
        <div class="flex justify-end px-8 mt-3">
            <button @click="router.push({ name: 'register-user' })" class="bg-blue-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Nuevo usuario
              </button>
        </div>
        <div class="mb-4 flex items-center px-9">
            <div class="w-1/3">
                <app-input
                v-model="searchQuery"
                type="text"
                label="Ingrese Nombre o DNI"
                required
                id="name-input"
                maxLength="50"
              />
            </div>
          </div>
        <div class="mt-8 mx-9">
           <table class="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-md">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nro.</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre completo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nro. Doc. Id.</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in users" :key="index" class="hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.number || 0 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{{ item.nameAll }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.identification }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-blue-500 hover:text-blue-700" @click="editUser(item)">
                  <PencilIcon class="h-6 w-6" />
                </button>
                <button class="text-red-500 hover:text-red-700 ml-4" @click="openDialog(item.id, item.surveyAnswered)">
                <TrashIcon class="h-6 w-6" />
              </button>
              </td>
            </tr>
          </tbody>
        </table>
        </div> 
        <Modal
  :isOpen="showModal"
  :title="modalTitle"
  :message="modalMessage"
  @update:isOpen="showModal = $event"
  @confirm="deleteUser"
/>
    </div>
</template>