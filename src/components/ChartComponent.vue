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
  type: 'bar',
  data: data,
  options: {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      }
    }
  },
};

onMounted(() => {
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
})
</script>


<template>
    <canvas id="myChart"></canvas>
</template>