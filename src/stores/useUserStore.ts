import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { getLogin, axiosInstance } from '@/api/servicesGlobal'; // Asegúrate de usar la ruta correcta

interface MyItem {
  number: number;
  nameAll: string;
  identification: string;
  id: string;
  surveyAnswered:boolean;
}


export const storeUsers = defineStore('userStore', {
  state: () => ({
    users: [] as MyItem[], // Almacena la lista actual de usuarios (filtrada)
    usersOld: [] as MyItem[], // Almacena la lista original sin filtrar
    
    modelUser: {
      nameAll: null,
      identification: null,
      position: '',
      dateOfBirth: null,
      email: null,
      id: null,
      password: null,
    },
    status: 0 as number,
    statusText: '' as string,
    modelQuestion: {
    }
  }),
  actions: {
    async getHttpUser() {
      try {
        const response = await axiosInstance.get('user/list');
        this.usersOld = response?.data.map((row: any, index: number) => ({
          ...row,
          number: index + 1,
          surveyAnswered: row.surveyAnswered || false, // Asegurarse de incluir surveyAnswered
        }));
        this.users = [...this.usersOld]; // Copiar los usuarios originales a la lista de visualización
      } catch {
        console.log('Error al obtener usuarios.');
      }
    },
    
      async registerUser(userId: any) {
        const response =  userId ? await axiosInstance.put('user/update',this.modelUser) : await axiosInstance.post('user/create',this.modelUser);
        this.status = response.status;
        this.statusText = response.statusText;
      },
  
      async actionUpdateUser() {
        const response = await axiosInstance.put('user/update',this.modelUser);
        this.status = response.status;
        this.statusText = response.statusText;
      },
  
      async actionDeleteUser(id: any) {
        const response = await axiosInstance.post('user/delete', {
          idPerson: id,
        });
        this.status = response.status;
        this.statusText = response.statusText;
      },

      async actionSearchMetric() {
        const response = await axiosInstance.get(`user/graphics/2`);
        if (response.data) {
          return response.data;
        }
        return [];
      },

      async fetchSearchMetricUser(documentNunber: number | null) {
        const response = await axiosInstance.get(`user/graphics-identification/${documentNunber}`);
        if (response.data) {
          return response.data;
        }
        return [];
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
  
      filteredUsers(value: string) {
        if (value.trim() === '') {
          this.users = [...this.usersOld]; // Restaurar la lista completa si no hay búsqueda
        } else {
          const query = value.toLowerCase().trim();
          this.users = this.usersOld.filter(
            (item: any) =>
              item.nameAll.toLowerCase().includes(query) ||
              item.identification.toString().includes(query)
          );
        }
      }      
  }
});