<template>
  <div>{{ data }}</div>
  <div>
    <button @click="aaa">button</button>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
const data = ref({});
const socket = inject("socket");

onMounted(() => {
  socket.emit("listenData", (_data) => {
    // console.log(data);
    console.log("listenData start");
  });
}),
  socket.on("send", (data) => {
    console.log(data);
  });
</script>

<style lang="scss" scoped></style>
