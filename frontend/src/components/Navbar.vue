<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">TMSGo</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">소개</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">대시보드</router-link>
          </li>
          <li class="nav-item">
            <button class="btn btn-warning ms-3" @click="handleAuth">
              {{ isAuthenticated ? "로그아웃" : "로그인" }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/authStore"; // Pinia 스토어 import

const authStore = useAuthStore();

// 로그인 상태 계산
const isAuthenticated = computed(() => authStore.isAuthenticated);

// 로그인/로그아웃 핸들러
const handleAuth = () => {
  console.log("handleAuth");
  if (isAuthenticated.value) {
    authStore.logout();
    alert("로그아웃 되었습니다!");
  } else {
    authStore.login({ name: "사용자" }); // 임시 로그인 데이터
    alert("로그인 되었습니다!");
  }
};
</script>