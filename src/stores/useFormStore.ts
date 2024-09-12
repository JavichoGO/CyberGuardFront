import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export const useFormStore = defineStore('user', {
  state: () => ({
    forms: [],
  }),
  actions: {
   async fetchQuestion() {
      const response = await axiosInstance.post('question-user/find', {
        identification: '1234567',
      });
      this.forms = response.data.data;
      console.log(response);
    }
  }
});