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
import { ref, computed ,onMounted } from "vue";
import { useAuthStore } from "../stores/authStore"; // Pinia 스토어 import
import { cmmAxios } from "../common/ts/cmmAxios";

const { sendRequest, isLoading } = cmmAxios();
const authStore = useAuthStore();
const responseData = ref<any>(null);

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

// ✅ API 요청 함수
const fn_getMenu = async () => {
  const response = await sendRequest({
    url: "/api/hello",
    method: "GET",
  });

  if (response) {
    responseData.value = response;
    console.log("응답 데이터:", response);
  } else {
    console.error("데이터 요청 실패");
  }
};

onMounted(() => {
  fn_getMenu();
});
</script>