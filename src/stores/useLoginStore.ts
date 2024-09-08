import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta
const router = useRouter();

export const useLogin = defineStore('user', {
  state: () => ({
    modelLogin: {
      documentNumber: null,
      password: null
    },
    identification: null,
    roleUser: null,
    users: [],
  }),
  actions: {
   async fetchLogin() {
      const response = await getLogin(this.modelLogin);
      sessionStorage.setItem('token-user', response.token);
      console.log(response);
      debugger;
      this.identification = response.username;
      this.roleUser = response.roles;
      // const response2 = await axiosInstance.get('user/list');
      // this.users = response2.data;
    }
  }
});