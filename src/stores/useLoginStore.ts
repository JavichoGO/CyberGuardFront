import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export const useLogin = defineStore('user', {
  state: () => ({
    modelLogin: {
      documentNumber: null,
      password: null
    },
    identification: null,
    roleUser: null,
    users: [],
    fullName: '',
  }),
  actions: {
   async fetchLogin() {
      const response = await getLogin(this.modelLogin);
      sessionStorage.setItem('token-user', response.token);
      sessionStorage.setItem('full-name', response.fullName);
      sessionStorage.setItem('user-role', response.roles);
      this.identification = response.username;
      this.roleUser = response.roles;
      // this.fullName = response.fullName;
      // const response2 = await axiosInstance.get('user/list');
      // this.users = response2.data;
    }
  }
});