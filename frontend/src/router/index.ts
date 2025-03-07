import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; // 타입만 import

import MainView from "../views/main/MainView.vue";
import AboutView from "../views/main/AboutView.vue";
import AssignView from "../views/dispatch/AssignView.vue"
import CustomerServiceView from "../views/dispatch/CustomerServiceView.vue"
import DriverView from "../views/dispatch/DriverView.vue"
import RouteView from "../views/dispatch/RouteView.vue"
import VehicleView from "../views/dispatch/VehicleView.vue"
import UserInfoView from "../views/user/UserInfoView.vue"


// 라우트 정의
const routes: Array<RouteRecordRaw> = [
  { path: "/", component: MainView },
  { path: "/about", component: AboutView },
  { path: "/dispatch/assign", component: AssignView },
  { path: "/dispatch/customer-service", component: CustomerServiceView },
  { path: "/dispatch/driver", component: DriverView },
  { path: "/dispatch/route", component: RouteView },
  { path: "/dispatch/vehicle", component: VehicleView },
  { path: "/user/info", component: UserInfoView },
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
