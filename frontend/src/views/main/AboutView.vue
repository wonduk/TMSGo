<template>
    <div class="about-container">
      <h1>🚛 TMSGo - 운송관리 시스템</h1>
      <p>
        TMSGo는 Vue 3 + Composition API + TypeScript를 기반으로 한 <strong>운송관리 시스템</strong>입니다.<br>
        백엔드는 <strong>Spring Boot</strong>와 <strong>JPA</strong>를 사용하며, <strong>MariaDB</strong>를 데이터베이스로 활용합니다.
      </p>
  
      <h2>사용 기술</h2>
      <ul>
        <li>💻 <strong>Frontend:</strong> Vue 3, Composition API, TypeScript, Vue Router, Pinia</li>
        <li>🔗 <strong>Backend:</strong> Spring Boot, JPA</li>
        <li>🛢 <strong>Database:</strong> MariaDB</li>
        <li>📡 <strong>API 통신:</strong> Axios</li>
        <li>🗺 <strong>지도 서비스:</strong> Google Maps API</li>
        <li>🐳 <strong>배포 환경:</strong> Docker</li>
      </ul>
  
      <h2>프로젝트 개요</h2>
      <p>
        TMSGo는 운송 및 배차 관리를 효율적으로 처리하기 위한 시스템으로, <br>
        <strong>관리자와 일반 사용자</strong> 역할을 구분하여 운영됩니다.<br>
        Vue.js를 활용한 <strong>프론트엔드</strong>와 Spring Boot 기반의 <strong>백엔드 API</strong>로 구축됩니다.
      </p>
  
      <h2>주요 기능</h2>
      <ul>
        <li>📝 <strong>사용자 관리</strong> - 회원 가입 및 권한 관리</li>
        <li>🚛 <strong>운송 관리</strong> - 차량 및 운송 데이터 관리</li>
        <li>📍 <strong>실시간 모니터링</strong> - Google Maps API 기반 운송 추적</li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .about-container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #333;
    text-align: center;
  }
  
  h2 {
    color: #555;
    margin-top: 20px;
  }
  
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #444;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  ul li {
    background: #eee;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
  }
  </style>
  