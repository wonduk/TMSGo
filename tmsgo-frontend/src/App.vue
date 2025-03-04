<template>
  <div class="layout-container">
    <NavbarComponent /> <!-- ✅ 상단 네비바 -->
    <div class="d-flex">
      <NavSidebar class="sidebar" /> <!-- ✅ 좌측 사이드바 -->
      <main class="content">
        <router-view /> <!-- ✅ 본문 영역 -->
      </main>
    </div>
    <FooterComponent /> <!-- ✅ 하단 푸터 -->
  </div>
</template>

<script>
import NavbarComponent from "@/components/Navbar.vue";
import NavSidebar from "@/components/NavSidebar.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
    NavSidebar,
    FooterComponent,
  },
};
</script>

<style>
/* 전체 레이아웃 */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 좌측 사이드바 */
.sidebar {
  width: 250px;
  background-color: #222;
  color: white;
  height: calc(100vh - 60px); /* 네비바 제외 높이 */
  padding: 20px;
  position: fixed;
  top: 60px;
  left: 0;
  overflow-y: auto;
}

/* 본문 영역 */
.content {
  margin-left: 250px;
  margin-top: 60px;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
