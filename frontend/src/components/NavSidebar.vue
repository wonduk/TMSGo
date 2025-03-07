<template>
  <nav class="nav-sidebar">
    <!-- 기본 메뉴 -->
    <router-link v-for="menu in mainMenu" :key="menu.id" :class="menu.cssClass" class="menu-item" :to="menu.path">
      {{ menu.name }}
    </router-link>

    <!-- 2뎁스 메뉴: 운송 관리 -->
    <div class="menu-group" v-if="isAuthenticated">
      <button class="menu-item dropdown-btn" @click="toggleMenu('dispatch')">
        🚛 운송 관리
        <span v-if="openMenu === 'dispatch'">▲</span>
        <span v-else>▼</span>
      </button>
      <div v-if="openMenu === 'dispatch'" class="submenu">
        <div>
          <router-link v-for="menu in dlvMenu" :key="menu.id" :class="menu.cssClass" class="submenu-item"
            :to="menu.path">
            {{ menu.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- 2뎁스 메뉴: 사용자 관리 -->
    <div class="menu-group" v-if="isAuthenticated">
      <button class="menu-item dropdown-btn" @click="toggleMenu('user')">
        🙍‍♂️ 사용자관리
        <span v-if="openMenu === 'user'">▲</span>
        <span v-else>▼</span>
      </button>
      <div v-if="openMenu === 'user'" class="submenu">
        <div>
          <router-link v-for="menu in userMenu" :key="menu.id" :class="menu.cssClass" class="submenu-item"
            :to="menu.path">
            {{ menu.name }}
          </router-link>
        </div>
      </div>
    </div>
    <router-link to="/dispatch/customer-service" class="submenu-item">고객 서비스</router-link>
  </nav>
</template>

<script setup lang="ts">
import { cmmAxios } from "../common/ts/cmmAxios";
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "../stores/authStore"; // Pinia 스토어 import

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
const openUserMenu = ref<string | null>(null); // 현재 열려 있는 메뉴 상태 관리
const dlvMenu = ref<Menu[]>(null);
const mainMenu = ref<Menu[]>(null);
const userMenu = ref<Menu[]>(null);

//로그인 여부
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

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
    mainMenu.value = response.filter((res) => res.menuCode === "MM01");
    dlvMenu.value = response.filter((res) => res.menuCode === "DLV01");
    userMenu.value = response.filter((res) => res.menuCode === "USR01");
  } else {
    console.error("데이터 요청 실패");
  }
};

onMounted(() => {
  fn_getMenu();
});
</script>