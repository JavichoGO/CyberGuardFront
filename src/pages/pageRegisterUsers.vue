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
const emailTouched = ref(false);

const today = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
});


const saveUsers = async () => {
  try {
    if (userId) {
      // Intentar actualizar usuario si `userId` existe
      await fetchUpdateUser(userId);
    } else {
      // Intentar registrar usuario nuevo
      await fetchRegisterUser();
    }

    if (response.value === 201) {
      const message = userId ? 'actualizó' : 'registró';
      toast.success(`Se ${message} correctamente.`);
      router.push({ name: 'gestors-user' });
    } else {
      // Guardar el mensaje de error del backend en `errorMessage`
      errorMessage.value = getCustomErrorMessage(messageStatus.value);
    }
  } catch (error) {
    // Revisar si el error proviene del backend y contiene un mensaje
    if (error.response && error.response.data && error.response.data.message) {
      // Aplicar el mensaje personalizado si está disponible
      errorMessage.value = getCustomErrorMessage(error.response.data.message);
    } else {
      errorMessage.value = 'Ocurrió un error inesperado.';
    }
    console.error(error);
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

  if (computedMessage.value || computedMessageDni.value || computedMessagePosition.value || computedMessagePassword.value || computedMessageDateOfBirth.value || computedMessageEmail.value) {
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
const errorMessagesMap = {
  "Dni ya esa en uso": "El número de C. I.  ya está registrado. Por favor, ingrese uno diferente.",
  "Email ya en uso": "El correo electrónico ya está registrado. Por favor, ingrese uno diferente.",
  // Puedes agregar más mensajes según los errores que devuelva el backend
};

const getCustomErrorMessage = (backendMessage) => {
  return errorMessagesMap[backendMessage] || "Ocurrió un error inesperado. Por favor, intente de nuevo.";
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
  emailTouched.value = true; // Asegurarnos de activar la validación del email

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

    const computedMessageEmail = computed(() => {

  // Si el email está definido, verificar su longitud y formato
  if (modelUser.value.email && emailTouched.value) {
    if (modelUser.value.email.length > 50) {
      return 'El email no debe ser mayor a 50 caracteres';
    }
    
    // Expresión regular para validar el formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(modelUser.value.email)) {
      return 'Debe ingresar un correo electrónico válido (ejemplo: usuario@dominio.com)';
    }
  }

  return ''; // Si el email es válido, no hay mensaje de error
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
         !computedMessageEmail.value &&
         modelUser.value.nameAll &&
         modelUser.value.identification &&
         modelUser.value.position &&
         modelUser.value.dateOfBirth &&
         modelUser.value.email &&
         modelUser.value.password;
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">{{ userId ? 'Actualizar' : 'Registrar nuevo' }} usuario</h1>
      
      <!-- Mensaje de error general del backend -->
      <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ errorMessage }}
      </div>

      <!-- Campo: Nombre completo -->
      <div class="mb-4">
        <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
        <app-input
          v-model="modelUser.nameAll"
          id="fullName"
          required
          name="fullName"
          type="text"
          placeholder="Ingrese nombre completo"
          class="mt-1"
        />
        <p v-if="computedMessage" class="text-red-500 mt-1">{{ computedMessage }}</p>
      </div>

      <!-- Campo: Número de Carné de Identidad -->
      <div class="mb-4">
        <label for="document" class="block text-sm font-medium text-gray-700 mb-1">Número de Carné de Identidad (usuario)</label>
        <app-input
          v-model="modelUser.identification"
          id="document"
          required
          name="document"
          type="text"
          placeholder="Ingrese número de Carné de Identidad"
          @input="handleIdentificationInput"
          class="mt-1"
        />
        <p v-if="computedMessageDni" class="text-red-500 mt-1">{{ computedMessageDni }}</p>
      </div>

      <!-- Campo: Cargo -->
      <div class="mb-4">
        <label for="position" class="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
        <app-input
          v-model="modelUser.position"
          id="position"
          name="position"
          type="text"
          placeholder="Ingrese el cargo"
          required
          class="mt-1"
        />
        <p v-if="computedMessagePosition" class="text-red-500 mt-1">{{ computedMessagePosition }}</p>
      </div>

      <!-- Campo: Fecha de Nacimiento -->
      <div class="mb-4">
        <label for="date-picker" class="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
        <input
          type="date"
          id="date-picker"
          v-model="modelUser.dateOfBirth"
          :max="today"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <p v-if="computedMessageDateOfBirth" class="text-red-500 mt-1">{{ computedMessageDateOfBirth }}</p>
      </div>

      <!-- Campo: Correo Electrónico -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electronico</label>
        <app-input
          v-model="modelUser.email"
          id="email"
          name="email"
          type="email"
          placeholder="Ingrese el correo"
          required
          @blur="emailTouched.value = true"
          class="mt-1"
        />
        <p v-if="computedMessageEmail" class="text-red-500 mt-1">{{ computedMessageEmail }}</p>
      </div>

      <!-- Campo: Contraseña -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        <app-input
          v-model="modelUser.password"
          id="password"
          name="password"
          type="password"
          placeholder="Ingrese la contraseña"
          required
          class="mt-1"
        />
        <p v-if="computedMessagePassword" class="text-red-500 mt-1">{{ computedMessagePassword }}</p>
      </div>

      <!-- Botones: Cancelar y Registrar -->
      <div class="flex flex-wrap items-center justify-between mt-6">
        <button
          @click="router.push({ name: 'gestors-user' })"
          class="flex-grow w-full md:w-auto mb-2 md:mb-0 py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:mr-2"
        >
          Cancelar
        </button>
        <button
          @click="openModal"
          class="flex-grow w-full md:w-auto py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {{ userId ? 'Actualizar' : 'Registrar' }}
        </button>
      </div>
    </div>

    <!-- Modal de Confirmación -->
    <Modal
      :isOpen="showModal"
      title="Confirmación"
      :message="textModal"
      @update:isOpen="showModal = $event"
      @confirm="saveUsers"
    />
  </div>
</template>
