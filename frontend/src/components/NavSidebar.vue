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
        <router-link to="/dispatch/assign" class="submenu-item">배정</router-link>
        <router-link to="/dispatch/route" class="submenu-item">배차</router-link>
        <router-link to="/dispatch/monitoring" class="submenu-item">모니터링</router-link>
      </div>
    </div>
    <router-link to="/dispatch/customer-service" class="submenu-item">고객 서비스</router-link>
    <router-link to="/dispatch/billing" class="submenu-item">정산</router-link>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 현재 열려 있는 메뉴 상태 관리
const openMenu = ref<string | null>(null);

// 메뉴 열고 닫는 함수
const toggleMenu = (menu: string) => {
  openMenu.value = openMenu.value === menu ? null : menu;
};
</script>