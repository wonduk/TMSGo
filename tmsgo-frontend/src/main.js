//main.js
import { createApp } from "vue";
import App from "./App.vue";
// import { router } from "./router/index.js";
import axios from "axios";

const app = createApp(App);
// Axios 전역 설정
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = '//localhost:8088'; // API 서버 URL 설정

// app.use(router);
app.mount("#app");


