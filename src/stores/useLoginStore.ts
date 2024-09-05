import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export const useLogin = defineStore('user', {
  state: () => ({
    modelLogin: {
      documentNumber: null,
      password: null
    },
    users: [],
  }),
  actions: {
   async fetchLogin() {
      const response = await getLogin(this.modelLogin);
      sessionStorage.setItem('token-user', response.token);
      console.log(response);
      const response2 = await axiosInstance.get('user/list');
      this.users = response2.data;
      console.log(response2);
    }
  }
});