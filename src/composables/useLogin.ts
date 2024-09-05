import { computed } from 'vue';
import { useLogin } from '@/stores/useLoginStore'; // Asegúrate de usar la ruta correcta
import { getLogin } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export function useUser() {
  const userStore = useLogin();

  // Computed properties to expose store state
  const modelLogin = computed(() => userStore.modelLogin);
  const users = computed(() => userStore.users);

  // Expose store actions
  const fetchLogin = userStore.fetchLogin;

  return {
    modelLogin,
    users,
    fetchLogin
  };
}