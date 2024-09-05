<script setup lagn="ts">
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';
import { months, numbers, transparentize, CHART_COLORS } from '../utils/utils';

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = months({count: 7});
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: numbers(NUMBER_CFG),
      borderColor: CHART_COLORS.red,
      backgroundColor: transparentize(CHART_COLORS.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: numbers(NUMBER_CFG),
      borderColor: CHART_COLORS.blue,
      backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
    }
  ]
};

const config = {
  type: 'radar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Radar Chart'
      }
    }
  },
};

onMounted(() => {
    const myChart = new Chart(
        document.getElementById('myRadar'),
        config
    );
})
</script>


<template>
    <canvas id="myRadar"></canvas>
</template>