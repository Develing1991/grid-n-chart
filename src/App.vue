<template>
  <div>{{ fetchData }}</div>
  <div>
    <ChartView :fetchData="fetchData" />
    <GridStack :fetchData="fetchData"></GridStack>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import ChartView from "./components/ChartView.vue";
import GridStack from "./components/grid/GridStack.vue";
const fetchData = ref([]);
const socket = inject("socket");

onMounted(() => {
  socket.emit("listenData", (_data) => {
    // console.log(data);
    console.log("listenData start");
  });
}),
  socket.on("send", (data) => {
    // console.log(data);
    fetchData.value = data;
  });
</script>

<style lang="scss" scoped>
canvas {
  max-width: 50vw;
  max-height: 50vh;
}
</style>
