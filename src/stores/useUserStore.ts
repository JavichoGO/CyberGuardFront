import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

export const storeUsers = defineStore('userStore', {
  state: () => ({
    users: [],
    usersOrigin: [],
    modelUser: {
      nameAll: null,
      identification: null,
      position: '',
      dateOfBirth: null,
      email: null,
      id: null,
      password: null,
    },
    status: null,
    statusText: null,
    modelQuestion: {
    }
  }),
  actions: {
    async getHttpUser() {
      debugger;
      try {
        const response2 = await axiosInstance.get('user/list');
        this.usersOrigin = response2?.data.map((row: any, index: number) => {
          return {
              ...row,
              number: index + 1,
          };
        });
        this.users = response2?.data.map((row: any, index: number) => {
          return {
              ...row,
              number: index + 1,
          };
        });
        } catch {
          console.log('error');
        }
      },
  
      async registerUser(userId: any) {
        const response =  userId ? await axiosInstance.put('user/update',this.modelUser) : await axiosInstance.post('user/create',this.modelUser);
        this.status = response.status;
        this.statusText = response.statusText;
        console.log(response);
      },
  
      async actionUpdateUser() {
        const response = await axiosInstance.put('user/update',this.modelUser);
        // this.status = response.status;
        // this.statusText = response.statusText;
        console.log(response);
      },
  
      async actionDeleteUser(id: any) {
        const response = await axiosInstance.post('user/delete', {
          idPerson: id,
        });
        // this.status = response.status;
        // this.statusText = response.statusText;
        console.log(response);
      },
  
      setUser(item: any) {
        this.modelUser.nameAll = item.nameAll;
        this.modelUser.position = item.position;
        this.modelUser.dateOfBirth = item.dateOfBirth;
        this.modelUser.email = item.email;
        this.modelUser.password = item.password;
        this.modelUser.identification = item.identification;
        this.modelUser.id = item.id;
      },
  
      filteredUsers(value: any) {
        if (value.trim() === '') {
          this.users = this.usersOrigin;
        } else { 
          this.users = this.users.filter(item =>
            item.nameAll.toLowerCase().includes(value) ||
            item.identification.toString().includes(value)
          );
        }
      }
  }
});