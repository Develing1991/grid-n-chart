import io from "socket.io-client";
export default {
  install(app, _options) {
    const socket = io("http://localhost:4000");
    app.config.globalProperties.$socket = socket;
    app.provide("socket", socket);
  },
};
