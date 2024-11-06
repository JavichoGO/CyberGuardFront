import { computed } from 'vue';
import { storeUsers } from '@/stores/useUserStore'; // Asegúrate de usar la ruta correcta

export function useUser() {
  const userStore = storeUsers();

  // Computed properties to expose store state
  const users = computed(() => userStore.users);
  const modelUser = computed(() => userStore.modelUser);
  const response = computed(() => userStore.status);
  const messageStatus = computed(() => userStore.statusText);

  // Expose store actions
  const fetchUsers = userStore.getHttpUser;
  const fetchRegisterUser = userStore.registerUser;
  const fetchUpdateUser = userStore.actionUpdateUser;
  const fetchDeleteU = userStore.actionDeleteUser;
  const fetchSearchMetric = userStore.actionSearchMetric;
  const fetchSearchMetricUser = userStore.fetchSearchMetricUser;
  return {
    modelUser,
    users,
    response,
    messageStatus,
    fetchSearchMetricUser,
    fetchUsers,
    fetchRegisterUser,
    fetchUpdateUser,
    fetchDeleteU,
    fetchSearchMetric,
  };
}