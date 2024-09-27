import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export const useLogin = defineStore('user', {
  state: () => ({
    modelLogin: {
      documentNumber: null,
      password: null
    },
    showSidebar: false,
    identification: null,
    roleUser: null,
    users: [],
    fullName: '',
    recoveryPassword: {
      emailRecovery: null,
    },
    password: {
      token: '',
      documentNumber: null,
      newPassword: null,
      repeatPassword: null,
    },
  }),
  actions: {
   async fetchLogin() {
      const response = await getLogin(this.modelLogin);
      sessionStorage.setItem('token-user', response.token);
      sessionStorage.setItem('full-name', response.fullName);
      sessionStorage.setItem('user-role', response.roles);
      sessionStorage.setItem('identification', response.username);
      this.identification = response.username;
      this.roleUser = response.roles;
      // this.fullName = response.fullName;
      // const response2 = await axiosInstance.get('user/list');
      // this.users = response2.data;
    },

    async fetchResetPassword() {
      const response2 = await axiosInstance.post('user/recovery', { 
        email: this.recoveryPassword.emailRecovery,
      });
      console.log(response2)
    },
    async fetchUpdatePassword() {
      const response2 = await axiosInstance.post('user/generateNewPasswordRecovery', { 
        password: this.password.newPassword,
        passwordTwo: this.password.repeatPassword,
        identification: this.password.documentNumber,
        token: Number(this.password.token),
      });
    }
  }
});