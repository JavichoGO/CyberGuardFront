<script setup lang="ts">
import { onMounted, ref , watch } from 'vue';
import jsPDF from 'jspdf';
import appSelect from '../utils/appSelect.vue';
import { storeUsers } from '../stores/useUserStore';
import { useUser } from '@/composables/useUsers';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

const printArea = ref(null);
const roleCode = ref<string | null>('');

roleCode.value = sessionStorage.getItem('user-role');
const { getHttpUser } = storeUsers();
const { users, fetchSearchMetric, fetchSearchMetricUser } = useUser();
const showMetric = ref<boolean | null>(true);
const fullName = ref<string | null>('');
const documentNumberUser = ref<number | null>(null);
const textNothing = ref<string | null>(null);
const desiredValues = ref<Record<number, number>>({});

// Función para actualizar los valores de "desired"
const updateDesiredValues = (data: any) => {
  data.forEach((item: Function) => {
    if (typeof desiredValues.value[item.idFunction] === 'undefined') {
      // Solo inicializamos si no hay valor almacenado
      desiredValues.value[item.idFunction] = item.desired || 0;
    }
    item.desired = desiredValues.value[item.idFunction];
  });
};

interface Function {
  average: number;
  categoryDescription: string;
  functionDescription:string;
  desired: number;
  idFunction: number;
}


fullName.value = sessionStorage.getItem('full-name');
const dataMetrics = ref<any>([]);
  const chartData = ref<{
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    data: number[];
  }[];
}>({
  labels: [],
  datasets: [
    {
      label: 'Madurez Actual',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      data: [],
    },
    {
      label: 'Madurez Deseada',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      data: [],
    },
  ],
});


    Chart.register(...registerables);

    let myChart: Chart | null = null; // Definir myChart como Chart o null

const createChart = () => {
  const chartElement = document.getElementById('myRadar') as HTMLCanvasElement;

  if (myChart) {
    myChart.destroy(); // Destruir el gráfico previo si existe
  }

  if (chartElement) {
    myChart = new Chart(chartElement, config);
  }
};

// Función para inicializar o actualizar los valores de "desired"
const initializeDesiredValues = (data: any) => {
  data.forEach((item: Function, index: number) => {
    // Solo inicializar si no existe un valor previo almacenado
    if (!(item.idFunction in desiredValues.value)) {
      desiredValues.value[item.idFunction] = index === 0 ? 3 : 4;
    }
  });
};

// Modificar el método `updateChartData` para ordenar los datos según el orden deseado
const updateChartData = (data: any, useCategoryDescription: boolean) => {
  // Ordenar los datos en base al idFunction en el orden deseado
  const order = [1, 5, 12, 15, 20];
  const orderedData = order.map((id) => data.find((item: Function) => item.idFunction === id)).filter(Boolean);

  initializeDesiredValues(orderedData); // Inicializar los valores de "desired" si es necesario

  // Actualizar los datos del gráfico
  chartData.value.labels = orderedData.map((item: Function) =>
    useCategoryDescription ? item.categoryDescription || 'N/A' : item.functionDescription || 'N/A'
  );
  chartData.value.datasets[0].data = orderedData.map((item: Function) => item.average);
  chartData.value.datasets[1].data = orderedData.map((item: Function) => desiredValues.value[item.idFunction]);
  createChart(); // Crear o actualizar el gráfico
};

onMounted(async () => {
  if (roleCode.value === 'ROLE_ADMIN') {
    if (modelMetric.value === 1) {
      // Servicio de métricas generales
      const response = await fetchSearchMetric();
      if (response && response.data.function.length > 0) {
        dataMetrics.value = response.data.function.map((item: any) => ({
          ...item,
          desired: desiredValues.value[item.idFunction] ?? (item.desired ?? 0),
        }));
        updateChartData(dataMetrics.value, true); // Usa categoryDescription para el gráfico
      }
    } else if (modelMetric.value === 2) {
      // Servicio de métricas por usuario
      const response = await fetchSearchMetricUser(documentNumberUser.value);
      if (response && response.data.function.length > 0) {
        dataMetrics.value = response.data.function.map((item: any) => ({
          ...item,
          desired: desiredValues.value[item.idFunction] ?? (item.desired ?? 0),
        }));
        updateChartData(dataMetrics.value, false); // Usa functionDescription para el gráfico
      }
    }
  } else if (roleCode.value === 'ROLE_USER') {
    // Cargar automáticamente la gráfica o mensaje para el usuario con rol "USER"
    documentNumberUser.value = parseInt(sessionStorage.getItem('identification') || '0');
    if (documentNumberUser.value) {
      const response = await fetchSearchMetricUser(documentNumberUser.value);
      if (response && response.data && response.data.function && response.data.function.length > 0) {
        dataMetrics.value = response.data.function.map((item: any) => ({
          ...item,
          desired: desiredValues.value[item.idFunction] ?? (item.desired ?? 0),
        }));
        updateChartData(dataMetrics.value, false);
        showMetric.value = true;
      } else {
        // Si no hay datos, mostrar el mensaje adecuado
        showMetric.value = false; // Asegurarse de ocultar la gráfica si no hay datos
        textNothing.value = response.message === "Sin datos para mostrar"
          ? "Debe completar la encuesta previamente"
          : response.message || "No hay datos disponibles"; // Mostrar el mensaje específico
      }
    } else {
      // En caso de que no se pueda obtener el código del usuario
      showMetric.value = false;
      textNothing.value = "No se pudo obtener el código de usuario para mostrar los datos.";
    }
  }
});




const valueMetric = ref<boolean | null>(false);
const modelMetric = ref<number | null>(1);

const searchMetrics = async () => {
  chartData.value.labels = [];
  chartData.value.datasets[0].data = [];
  chartData.value.datasets[1].data = [];
  if (myChart) {
    myChart.destroy();
    myChart = null;
  }



  // Realizar la búsqueda de métricas del usuario
  const response = await fetchSearchMetricUser(documentNumberUser.value);
  
  if (response && response.data && response.data.function && response.data.function.length > 0) {
    // Actualizar los datos del gráfico con los nuevos datos del usuario
    dataMetrics.value = response.data.function;
    chartData.value.labels = response.data.function.map((item: Function) => item.categoryDescription);
    chartData.value.datasets[0].data = response.data.function.map((item: Function) => item.average);
    chartData.value.datasets[1].data = response.data.function.map((item: Function) => item.desired || 0);
    const useCategoryDescription = roleCode.value === 'ROLE_ADMIN' && modelMetric.value === 1;
    updateChartData(dataMetrics.value, useCategoryDescription);
    showMetric.value = true; // Mostrar el gráfico

  } else {
    // Mostrar el mensaje de que no hay datos y ocultar el gráfico
    showMetric.value = false;
    textNothing.value = response.message === "Sin datos para mostrar" 
      ? "El encuestado seleccionado aún no ha completado el cuestionario" 
      : response.message;

    // Destruir el gráfico si no hay datos
  }
};


const optionsMetrics = [
  {
    id: 1,
    description: 'Métricas generales',
  },
  {
    id: 2,
    description: 'Métricas por usuario',
  },
]

const setMetric = async (value: any) => {
  showMetric.value = true;
  textNothing.value = null;
  modelMetric.value = value;

  // Limpiar los datos previos del gráfico
  chartData.value.labels = [];
  chartData.value.datasets[0].data = [];
  chartData.value.datasets[1].data = [];

  if (myChart) {
    myChart.destroy(); // Destruir el gráfico previo si existe
    myChart = null;
  }
  if (value == 1) {
    // Métricas generales
    valueMetric.value = false;
    const response = await fetchSearchMetric();
    if (response && response.data.function.length > 0) {
      dataMetrics.value = response.data.function.map((item: any) => ({
        ...item,
        desired: desiredValues.value[item.idFunction] ?? (item.desired ?? 0)
      }));
      updateChartData(dataMetrics.value, true);
    }
  } else if (value == 2) {
    // Métricas por usuario
    await getHttpUser();
    showMetric.value = false;
    valueMetric.value = true;
  }
};

const setUser = async (value: number) => {
  documentNumberUser.value = value;
}

const printMetric = () => {
  const doc = new jsPDF();
  const canvas = document.getElementById('myRadar') as HTMLCanvasElement;
  if (canvas) {
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
    doc.save('metricas.pdf');
  } else {
    console.error('No se pudo encontrar el elemento del gráfico para imprimir.');
  }
}

const generateContramedidasPDF = () => {
  const link = document.createElement('a');
  link.href = '/disenocontramedidas.pdf';
  link.download = 'disenocontramedidas.pdf';
  link.click();
}

const config: any = {
  type: 'radar',
  data: chartData.value,
  options: {
    scale: {
      r: {
        min: 0, // Valor mínimo de la escala
        max: 5, // Valor máximo de la escala
        ticks: {
          stepSize: 1, // Espaciado entre los ticks
        },
      }
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Métricas'
      }
    }
  },
};
</script>

<template>
  <div class="mt-10" id="content-to-print">
    <h1 class="text-4xl font-bold text-gray-900 text-center mb-7">Gestión de métricas</h1>

    <div class="mb-4 flex px-9 flex-col">
      <div class="w-1/2" v-if="roleCode !== 'ROLE_USER'">
        <appSelect :options="optionsMetrics" :model-value="modelMetric" @update:modelValue="setMetric($event)" />
      </div>
      <div class="flex mt-4" v-if="valueMetric">
        <div class="w-1/3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Métricas por usuario</label>
          <appSelect :options="users" :show-user="true" @update:modelValue="setUser($event)" />
        </div>
        <div class="w-1/4 ml-5" v-if="valueMetric">
          <button @click="searchMetrics" class="bg-blue-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none mt-5">
            Buscar
          </button>
        </div>
      </div>
    </div>

    <!-- Gráfico o mensaje "Sin datos para mostrar" -->
    <div class="flex items-center justify-center flex-grow w-full mt-10">
      <div class="flex justify-center w-full" v-if="showMetric">
        <canvas id="myRadar" class="radar-chart"></canvas>
      </div>
      <div v-else class="flex justify-center">
        <h2 class="text-2xl ml-9 mt-4 text-center">{{ textNothing }}</h2>
      </div>
    </div>

<!-- Botones de acciones, visibles solo si showMetric es true -->
<div class="flex justify-center mt-5" v-if="showMetric">
  <button @click="printMetric" class="bg-blue-500 text-center text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
          :class="{ 'ml-4': roleCode !== 'ROLE_USER' }">
    Descargar
  </button>
  <button v-if="roleCode !== 'ROLE_USER'" @click="generateContramedidasPDF" class="bg-green-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-green-700 ml-4">
    Generar contramedidas
  </button>
</div>

  </div>
</template>



<style>

.radar-chart {
  width: 490px !important; /* Ancho fijo */
  height: 510px !important; /* Alto fijo */
}
</style>