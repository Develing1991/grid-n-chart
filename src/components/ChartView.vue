<template>
  <Line :data="data" :options="options" />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ref, watch, computed } from "vue";
import { Line } from "vue-chartjs";
import * as chartConfig from "./chartConfig.js";
const props = defineProps({
  fetchData: {
    type: Array,
    default: () => [],
  },
});
const data = ref(chartConfig.data);
const options = ref(chartConfig.options);
// const chartData = computed(() => {

//   return data.value;
// });
watch(
  () => props.fetchData,
  (newValue) => {
    data.value = {
      labels: chartConfig.data.labels,
      datasets: [
        {
          ...chartConfig.data.datasets,
          data: newValue,
        },
      ],
    };
    console.log(newValue);
  }
);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
</script>

<style lang="scss" scoped></style>
