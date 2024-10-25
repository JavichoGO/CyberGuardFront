<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useUser } from '@/composables/useUsers';
import Modal from '../utils/appModal.vue';
import { ref, onUnmounted, computed } from 'vue';
import { useToast } from "vue-toastification";
import appInput from '@/utils/appInput.vue';

const toast = useToast()
const router = useRouter();
const route = useRoute();
const userId = route.params.id;

const showModal = ref(false);
const textModal = ref('');
const { modelUser, fetchRegisterUser, fetchUpdateUser, response, messageStatus } = useUser();
const errorMessage = ref('');


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
  if (!modelUser.value.nameAll || !modelUser.value.identification || !modelUser.value.position || !modelUser.value.dateOfBirth || !modelUser.value.email || !modelUser.value.password) {  
    toast.warning('Debe completar todos los campos obligatorios');
    return;
  }

  if (computedMessage.value || computedMessageDni.value || computedMessagePosition.value || computedMessagePassword.value || computedMessageDateOfBirth.value) {
    toast.warning('Debe completar los campos correctamente');
    return;
  }

  showModal.value = true;
  textModal.value = userId ? '¿Desea actualizar los datos del usuario ?' : '¿Desea registrar al nuevo usuario?';
}


// Nueva función para manejar la entrada de identificación
const handleIdentificationInput = (event) => {
  const target = event.target;
  target.value = target.value.replace(/\D/g, ''); // Remover todos los caracteres que no sean dígitos
  modelUser.value.identification = target.value;
};

const computedMessageDateOfBirth = computed(() => {

  const birthDate = new Date(modelUser.value.dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Calcular si el usuario ya cumplió 18 años considerando mes y día
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    if (age - 1 < 18) {
      return 'Debe tener al menos 18 años de edad';
    }
  } else if (age < 18) {
    return 'Debe tener al menos 18 años de edad';
  }

  return ''; // Si cumple la edad mínima, no hay mensaje de error
});


const computedMessage = computed(() => {
      if (modelUser.value.nameAll && modelUser.value.nameAll.length > 50) {
        return 'El nombre completo no debe ser mayor a 50 caracteres';
      }
      return '';
    });

    const computedMessageDni = computed(() => {
      if (modelUser.value.identification && modelUser.value.identification.length > 20) {
        return 'La identificación no debe ser mayor a 20 caracteres';
      }
      return '';
    });

    const computedMessagePosition = computed(() => {
      if (modelUser.value.position && modelUser.value.position.length > 50) {
        return 'El cargo no debe ser mayor a 50 caracteres';
      }
      return '';
    });

    const computedMessagePassword = computed(() => {
      if (modelUser.value.password && modelUser.value.password.length > 50) {
        return 'La contraseña no debe ser mayor a 50 caracteres';
      }
      return '';
    });


// Nueva computada para validar si todos los mensajes de error están vacíos
const isFormValid = computed(() => {
  return !computedMessage.value &&
         !computedMessageDni.value &&
         !computedMessagePosition.value &&
         !computedMessagePassword.value &&
         !computedMessageDateOfBirth.value &&
         modelUser.value.nameAll &&
         modelUser.value.identification &&
         modelUser.value.position &&
         modelUser.value.dateOfBirth &&
         modelUser.value.email &&
         modelUser.value.password;
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-1/3 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4">{{ userId ? 'Actualizar' : 'Registrar nuevo' }} usuario</h1>
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
        <p v-if="computedMessage" class="text-red-500 mt-1">{{ computedMessage }}</p>
      </div>
      <div class="mb-4">
        <app-input
          v-model="modelUser.identification"
          id="document"
          required
          name="document"
          type="text"
          label="Número de Carné de Identidad (usuario)"
          placeholder="Ingrese número de Carné de Identidad"
          @input="handleIdentificationInput"
        />
        <p v-if="computedMessageDni" class="text-red-500 mt-1">{{ computedMessageDni }}</p>
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
        <p v-if="computedMessagePosition" class="text-red-500 mt-1">{{ computedMessagePosition }}</p>
      </div>
      <div class="mb-4">
  <label for="date-picker" class="block text-xs font-medium text-gray-700">Fecha de nacimiento</label>
  <input
    type="date"
    id="date-picker"
    v-model="modelUser.dateOfBirth"
    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />
  <p v-if="computedMessageDateOfBirth" class="text-red-500 mt-1">{{ computedMessageDateOfBirth }}</p>
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
        <p v-if="computedMessagePassword" class="text-red-500 mt-1">{{ computedMessagePassword }}</p>
      </div>
      <div class="flex items-center">
        <button
          @click="router.push({ name: 'gestors-user' })"
          class="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancelar
        </button>
        <button
          @click="openModal"
          class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-3"
        >
          {{ userId ? 'Actualizar' : 'Registrar' }}
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
