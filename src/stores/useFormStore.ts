import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export const useFormStore = defineStore('user', {
  state: () => ({
    forms: [],
    questionsIdentify: null,
  }),
  actions: {
   async fetchQuestion() {
    debugger;
      const response = await axiosInstance.post('question-user/find', {
        identification: '1234567',
      });
      this.forms = response.data.data.questions;
      this.questionsIdentify = response.data.data.questions.IDENTIFY;
      console.log(response);
    }
  }
});