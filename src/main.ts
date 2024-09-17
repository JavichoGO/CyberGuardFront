import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// import vuetify from './plugins/'; // Importa la instancia de Vuetify


import './index.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(vuetify);

app.mount('#app')
app.use(Toast);
