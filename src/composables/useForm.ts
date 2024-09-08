import { computed } from 'vue';
import { useFormStore } from '@/stores/useFormStore'; // Asegúrate de usar la ruta correcta

export function useForm() {
  const userStore = useFormStore();

  // Expose store actions
  const getQuestionsP = userStore.fetchQuestion;
  const getForm = computed(() => userStore.forms);

  return {
    getQuestionsP,
    getForm,
  };
}