import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

// import "./assets/main.css";
import socket from "./plugins/socket";

const app = createApp(App);
app.use(socket);

// app.use(socket);
app.use(createPinia());

app.mount("#app");
