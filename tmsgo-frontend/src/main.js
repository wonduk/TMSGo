//main.js
import { createApp } from "vue";
import App from "./App.vue";
// import { router } from "./router/index.js";
import cmm from "./js/common.js"
// import axios from "axios";

const app = createApp(App);
// Axios 전역 설정
// app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serveUrl = process.env.VUE_APP_IP;

// app.use(router);
app.mixin(cmm)
app.mount("#app");


