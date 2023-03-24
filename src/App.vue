<template>
  <div>{{ fetchData }}</div>
  <div>
    <ChartView :fetchData="fetchData" />
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import ChartView from "./components/ChartView.vue";
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

<style lang="scss" scoped></style>
