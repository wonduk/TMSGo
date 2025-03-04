<template>
  <div>
      <!-- 네비게이션 바 -->
  <nav class="navbar">
      <div class="nav-left">
          <h1 class="logo">내프로젝트</h1>
      </div>

      <div class="nav-right">
          <!-- 햄버거 버튼 -->
          <button class="hamburger" @click="toggleSidebar">☰</button>
      </div>
  </nav>

      <!-- 사이드바 (햄버거 버튼 클릭 시 열림) -->
      <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
          <button class="close-btn" @click="toggleSidebar">✖</button>
          <router-link to="/" class="menu-item" @click="toggleSidebar">홈</router-link>
          <router-link to="/about" class="menu-item" @click="toggleSidebar">소개</router-link>
          <router-link to="/dashboard" class="menu-item" @click="toggleSidebar">대시보드</router-link>
          <button @click="handleAuth" class="menu-item auth-button">
              {{ isAuthenticated ? "로그아웃" : "로그인" }}
          </button>
      </div>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      isSidebarOpen: false, // 사이드바 열림 여부
      isAuthenticated: false, // 로그인 상태 (Vuex 또는 실제 API 연동 가능)
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    handleAuth() {
      if (this.isAuthenticated) {
        alert("로그아웃 되었습니다!");
        this.isAuthenticated = false;
      } else {
        alert("로그인 페이지로 이동합니다!");
        this.isAuthenticated = true;
      }
      this.toggleSidebar(); // 로그인/로그아웃 후 사이드바 닫기
    },
  },
};
</script>

<style scoped>
/* 네비게이션 바 스타일 */
.navbar {
  width: 99%;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

/* 햄버거 버튼 스타일 */
.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* 사이드바 스타일 */
.sidebar {
  position: fixed;
  top: 0;
  left: -250px; /* 기본적으로 숨김 */
  width: 200px;
  height: 100%;
  background-color: #222;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: left 0.3s ease-in-out;
}

/* 사이드바 열릴 때 */
.sidebar-open {
  left: 0;
}

/* 닫기 버튼 */
.close-btn {
  align-self: flex-end;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-bottom: 20px;
}

/* 메뉴 아이템 */
.menu-item {
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin: 10px 0;
  cursor: pointer;
  display: block;
}

.menu-item:hover {
  text-decoration: underline;
}

/* 로그인/로그아웃 버튼 */
.auth-button {
  background-color: #ff9800;
  border: none;
  padding: 10px;
  text-align: center;
  width: 100%;
  margin-top: 20px;
}

.auth-button:hover {
  background-color: #e68900;
}
</style>
