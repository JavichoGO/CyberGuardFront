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

interface Function {
  average: number;
  categoryDescription: string;
  desired: number;
  idFunction: number;
}


fullName.value = sessionStorage.getItem('full-name');
const dataMetrics = ref<any>([]);
    const chartData = ref({
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

onMounted(async () => {
  const response = await fetchSearchMetric();
  dataMetrics.value = response.data;

  if (response && response.data.function.length > 0) {
    dataMetrics.value = response.data.function;
    chartData.value.labels = response.data.function.map((item: Function) => item.categoryDescription);
    chartData.value.datasets[0].data = response.data.function.map((item: Function) => item.average);
    chartData.value.datasets[1].data = response.data.function.map((item: Function) => item.desired || 0);

    createChart(); // Crear el gráfico
  }
});


const valueMetric = ref<boolean | null>(false);
const modelMetric = ref<number | null>(1);

const searchMetrics = async () => {
  // Limpiar los datos anteriores
  chartData.value.labels = [];
  chartData.value.datasets[0].data = [];
  chartData.value.datasets[1].data = [];
  
  // Destruir el gráfico previo si existe
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

    showMetric.value = true; // Mostrar el gráfico
    createChart(); // Crear el gráfico con los nuevos datos
  } else {
    // Mostrar el mensaje de que no hay datos y ocultar el gráfico
    showMetric.value = false;
    textNothing.value = response.message === "Sin datos para mostrar" 
      ? "El encuestado seleccionado aún no ha enviado el cuestionario" 
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
      dataMetrics.value = response.data.function;
      chartData.value.labels = response.data.function.map((item: Function) => item.categoryDescription);
      chartData.value.datasets[0].data = response.data.function.map((item: Function) => item.average);
      chartData.value.datasets[1].data = response.data.function.map((item: Function) => item.desired || 0);
      
      createChart(); // Crear el gráfico con las métricas generales
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Metricas por usuario</label>
            <appSelect :options="users" :show-user="true" @update:modelValue="setUser($event)" />
        </div>
        <div class="w-1/4 ml-5" v-if="valueMetric">
            <button @click="searchMetrics" class="bg-blue-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none mt-5">
                Buscar
              </button>
        </div>
      </div>
      </div>
    <div class="flex items-center justify-center">
      <div class="flex w-1/2" v-if="showMetric">
        <canvas id="myRadar" class="radar-chart"></canvas>
      </div>
      <div v-else class="flex justify-center">
        <h2 class="text-2xl ml-9 mt-4 text-center">
          {{  textNothing }}
      </h2>
      </div>
    </div>
    <div class="flex justify-center" v-if="showMetric">
      <button @click="printMetric" class="bg-blue-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Descargar
      </button>
      <button @click="generateContramedidasPDF" class="bg-green-500 text-right text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-4">
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