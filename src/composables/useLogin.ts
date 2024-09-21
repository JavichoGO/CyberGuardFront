import { computed } from 'vue';
import { useLogin } from '@/stores/useLoginStore'; // Asegúrate de usar la ruta correcta
import { getLogin } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export function useUser() {
  const userStore = useLogin();

  // Computed properties to expose store state
  const modelLogin = computed(() => userStore.modelLogin);
  const users = computed(() => userStore.users);
  const identification = computed(() => userStore.identification);
  const roleUser = computed(() => userStore.roleUser);
  const fullName = computed(() => userStore.fullName);
  const showSidebar = computed(() => userStore.showSidebar);
  const emailRecoveryComputed = computed(() => userStore.recoveryPassword);

  // Expose store actions
  const fetchLogin = userStore.fetchLogin;
  const fetchResetPassword = userStore.fetchResetPassword;

  return {
    emailRecoveryComputed,
    fetchResetPassword,
    showSidebar,
    identification,
    modelLogin,
    users,
    fullName,
    fetchLogin,
    roleUser,
  };
}