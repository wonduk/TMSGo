<template>
  <nav class="nav-sidebar">
    <!-- 기본 메뉴 -->
    <router-link to="/" class="menu-item">🏠 홈</router-link>
    <router-link to="/about" class="menu-item">ℹ️ 소개</router-link>
    <router-link to="/dashboard" class="menu-item">📊 대시보드</router-link>

    <!-- 2뎁스 메뉴 -->
    <div class="menu-group">
      <button class="menu-item dropdown-btn" @click="toggleMenu('dispatch')">
        🚛 운송 관리
        <span v-if="openMenu === 'dispatch'">▲</span>
        <span v-else>▼</span>
      </button>
      <div v-if="openMenu === 'dispatch'" class="submenu">
        <div>
          <router-link v-for="menu in menuData" :key="menu.id" :class="menu.cssClass" class="submenu-item" :to="menu.path">
              {{ menu.name }}
          </router-link>
        </div>
      </div>
    </div>
    <router-link to="/dispatch/customer-service" class="submenu-item">고객 서비스</router-link>
    <router-link to="/dispatch/billing" class="submenu-item">정산</router-link>
  </nav>
</template>

<script setup lang="ts">
import { cmmAxios } from "../common/ts/cmmAxios";
import { ref, onMounted } from "vue";

// 메뉴 데이터 타입 정의
export interface Menu {
  id: number;
  name: string;
  path: string;
  menuCode: string;
  cssClass: string;
}

const { sendRequest, isLoading } = cmmAxios();
const menuData = ref<Menu>(null);
const openMenu = ref<string | null>(null); // 현재 열려 있는 메뉴 상태 관리

// 메뉴 열고 닫는 함수
const toggleMenu = (menu: string) => {
  openMenu.value = openMenu.value === menu ? null : menu;
};

// ✅ API 요청 함수
const fn_getMenu = async () => {
  const response = await sendRequest({
    url: "/api/menus",
    method: "GET",
  });

  if (response) {
    menuData.value = response;
    console.log("응답 데이터:", response);
  } else {
    console.error("데이터 요청 실패");
  }
};

onMounted(() => {
  fn_getMenu();
});
</script>