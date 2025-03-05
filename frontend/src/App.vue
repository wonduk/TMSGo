<template>
  <div class="layout-container">
    <NavbarComponent />
    <div class="d-flex">
      <NavSidebar class="sidebar" /> 
      <main class="content">
        <router-view />
      </main>
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import NavbarComponent from "@/components/Navbar.vue";
import NavSidebar from "@/components/NavSidebar.vue";
import FooterComponent from "@/components/Footer.vue";
</script>