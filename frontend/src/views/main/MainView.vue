<template>
    <div class="container mt-5">
      <div class="jumbotron text-center bg-light p-5 rounded">
        <h1 class="display-4">🚛 TMSGo - 물류 관리 시스템</h1>
        <p class="lead">
          TMSGo는 효율적인 물류 및 운송 관리를 위한 최적의 솔루션입니다.
        </p>
        <hr class="my-4" />
        <p>
          {{ isAuthenticated ? "운송 내역을 확인하세요!" : "로그인 후 사용 가능합니다." }}
        </p>
        <button v-if="!isAuthenticated" class="btn btn-primary btn-lg" @click="handleAuth">
          로그인
        </button>
        <button v-if="isAuthenticated" class="btn btn-danger btn-lg" @click="handleAuth">
          로그아웃
        </button>
      </div>
  
      <!-- 운송 현황 (로그인 시 표시) -->
      <div v-if="isAuthenticated" class="row mt-4">
        <div class="col-md-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">📦 현재 배송 중</h5>
              <!-- <p class="card-text">총 {{ deliveries.length }} 건</p> -->
              <button class="btn btn-outline-primary btn-sm">자세히 보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../../stores/authStore"; // Pinia 스토어 import
import { useRouter } from "vue-router";


// Pinia 스토어 가져오기
const authStore = useAuthStore();
const router = useRouter();

// 로그인 상태 계산
const isAuthenticated = computed(() => authStore.isAuthenticated);

// 로그인/로그아웃 핸들러
const handleAuth = () => {
  if (isAuthenticated.value) {
    router.push("/about");
    authStore.logout();
    alert("로그아웃 되었습니다!");
  } else {
    authStore.login({ name: "사용자" }); // 임시 로그인 데이터
    alert("로그인 되었습니다!");
  }
};
</script>
