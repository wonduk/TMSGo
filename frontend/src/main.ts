import "./assets/main.css"
import "./assets/common.css"
import { useUserStore } from './stores/userStore.ts'
import { createPinia } from 'pinia'
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia()
const app = createApp(App);

// Axios 전역 설정 (타입 정의 추가)
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $serveUrl: string;
    }
}

app.config.globalProperties.$serveUrl = import.meta.env.VITE_APP_IP as string;

app.use(pinia);
app.use(router);
const userStore = useUserStore()

app.mount("#app");
