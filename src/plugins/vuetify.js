// src/plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa los estilos de Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Importa el conjunto de íconos

// Crea una instancia de Vuetify
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // Usa el conjunto de íconos Material Design Icons
    aliases,
    sets: {
      mdi,
    },
  },
});

export default vuetify;