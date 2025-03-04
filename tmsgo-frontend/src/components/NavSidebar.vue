<template>
  <nav class="nav-sidebar">
    <router-link to="/" class="menu-item">🏠 홈</router-link>
    <router-link to="/about" class="menu-item">ℹ️ 소개</router-link>
    <router-link to="/dashboard" class="menu-item">📊 대시보드</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavSidebar",
};
</script>

<style scoped>
.nav-sidebar {
  display: flex;
  flex-direction: column;
}

.menu-item {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
}

.menu-item:hover {
  background-color: #444;
}
</style>
