import { computed } from 'vue';
import { useFormStore } from '@/stores/useFormStore'; // Asegúrate de usar la ruta correcta

export function useForm() {
  const userStore = useFormStore();

  // Expose store actions
  const fetchQuestions = userStore.getQuestionIdentification;
  const getIdentify = computed(() => userStore.questionsIdentify);
  const getDetected = computed(() => userStore.questionDetect);
  const getProtect = computed(() => userStore.questionProtect);
  const getRecover = computed(() => userStore.questionRecover);
  const getRespond = computed(() => userStore.questionRespond);
  const getForm = computed(() => userStore.forms);

  return {
    getDetected,
    getProtect,
    getRecover,
    getRespond,
    fetchQuestions,
    getIdentify,
    getForm,
  };
}