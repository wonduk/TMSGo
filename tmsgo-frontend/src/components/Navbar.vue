<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">TMSGo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
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
  
  <script>
  export default {
    name: "NavbarComponent",
    data() {
      return {
        isAuthenticated: false, // 로그인 여부
      };
    },
    methods: {
      handleAuth() {
        this.isAuthenticated = !this.isAuthenticated;
        alert(this.isAuthenticated ? "로그인 되었습니다!" : "로그아웃 되었습니다!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* 네비게이션 바 여백 */
  .navbar {
    padding: 15px;
  }
  </style>
  