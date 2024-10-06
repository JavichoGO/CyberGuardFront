import axios from 'axios';

const API_URL = 'https://cyberguard.up.railway.app/'; // Reemplaza con tu URL de API

export const getLogin = async (data: any) => {
  try {
    const body = {
      identification: data.documentNumber,
        password: data.password,
    };
    const response = await axios.post(`${API_URL}login`, body);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const axiosInstance = axios.create({
    baseURL: API_URL, // URL base para tus solicitudes
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Configurar un interceptor para añadir el Bearer Token a cada solicitud
axiosInstance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token-user'); // Obtener el token de almacenamiento local u otro lugar seguro
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }, error => {
    return Promise.reject(error);
  });
