import { computed } from 'vue';
import { useFormStore } from '@/stores/useFormStore'; // Asegúrate de usar la ruta correcta

export function useForm() {
  const userStore = useFormStore();

  // Expose store actions
  const getQuestions = userStore.fetchQuestion;
  const getIdentify = computed(() => userStore.questionsIdentify);
  const getForm = computed(() => userStore.forms);

  return {
    getQuestions,
    getIdentify,
    getForm,
  };
}