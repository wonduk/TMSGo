import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; // 타입만 import

import MainView from "../views/main/MainView.vue";

// 라우트 정의
const routes: Array<RouteRecordRaw> = [
  { path: "/", component: MainView }
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
