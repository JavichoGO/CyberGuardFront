import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export interface Password {
  token: string | string[];
  documentNumber: string | string[] | null; // Puede ser string o null
  newPassword: string | null;     // Puede ser string o null
  repeatPassword: string | null;  // Puede ser string o null
}

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
    } as Password,
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
      return response;
    },

    async fetchResetPassword() {
      const response2 = await axiosInstance.post('user/recovery', { 
        email: this.recoveryPassword.emailRecovery,
      });
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