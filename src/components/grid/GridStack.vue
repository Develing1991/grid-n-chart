<template>
  <button type="button" @click="addNewWidget()">Add Widget</button> {{ info }}
  <!-- <div class="grid-stack">
    <div
      v-for="item in items"
      :key="item.id"
      class="grid-stack-item"
      :id="item.id"
      :gs-x="item.x"
      :gs-y="item.y"
      :gs-w="item.w"
      :gs-h="item.h"
    >
      <div class="grid-stack-item-content">{{ item.content }}</div>
    </div>
  </div> -->
  <div class="grid-stack"></div>
</template>

<script setup>
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  fetchData: {
    type: Array,
    default: () => [],
  },
});

let count = ref(0);
let info = ref("");
let grid = null; // DO NOT use ref(null) as proxies GS will break all logic when comparing structures... see https://github.com/gridstack/gridstack.js/issues/2115
const items = ref([
  //   { x: 0, y: 0, w: 1, h: 1, id: 1, content: "test" },
  //   { x: 1, y: 0, w: 1, h: 1 },
  //   { x: 2, y: 0, w: 1, h: 1 },
  //   { x: 3, y: 0, w: 1, h: 1 },
]);

onMounted(() => {
  grid = GridStack.init({
    // DO NOT user grid.value = GridStack.init(), see above
    float: true,
    cellHeight: "200px",
    minRow: 1,
  });

  grid.on("dragstop", function (event, element) {
    const node = element.gridstackNode;
    info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`;
  });
});

watch(
  () => props.fetchData,
  (ndwValue) => {
    // items.value = ndwValue.map((item, index) => {
    items.value = ndwValue.map((item, index) => {
      return {
        x: index,
        y: 0,
        w: 1,
        h: 1,
        id: index + 1,
        content: item,
      };
    });
    // grid.addWidget(test);
    // console.log(test);
    grid.load(items.value);
  }
);
const addNewWidget = () => {
  const node = items[count.value];
  //   || {
  //     x: Math.round(12 * Math.random()),
  //     y: Math.round(5 * Math.random()),
  //     w: Math.round(1 + 3 * Math.random()),
  //     h: Math.round(1 + 3 * Math.random()),
  //   };
  count.value++;
  node.id = String(count.value);
  node.content = props.fetchData[count.value];
  grid.addWidget(node);
  console.log(node);
  //   grid.addWidget(`<h1>fdsfdsdfs</h1>`);
};
</script>

<style lang="scss" scoped></style>
