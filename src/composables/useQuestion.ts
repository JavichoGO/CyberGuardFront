import { computed } from 'vue';
import { useQuestionStore } from '@/stores/useQuestionStore'; 

export function useQuestion() {
    const useQuestion = useQuestionStore();
    const modelQuestion = computed(() => useQuestion.modelQuestion);
    const questions = computed(() => useQuestion.questions);
    const questionsOld = computed(() => useQuestion.questionsOld);
    const fetchRegisterQuestion = useQuestion.registerQuestion;
    const fetchDeleteQuestion = useQuestion.actionDeleteQuestion;
    const messageText = computed(() => useQuestion.statusText);
    const getFunctions = computed(() => useQuestion.functions);
    const getCategories = computed(() => useQuestion.categories);

  return {
    modelQuestion,
    questions,
    fetchRegisterQuestion,
    fetchDeleteQuestion,
    messageText,
    questionsOld,
    getCategories,
    getFunctions,
  };
}