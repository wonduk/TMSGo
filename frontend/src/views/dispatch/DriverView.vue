<template>
  <div class="driver-container">
    <h1>👨‍✈️ 운전원 관리</h1>
    
    <!-- 검색창 -->
    <div class="search-container">
      <input v-model="searchQuery" type="text" placeholder="운전원 이름 검색..." class="search-input" />
    </div>

    <!-- 운전원 테이블 -->
    <table class="driver-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>전화번호</th>
          <th>면허번호</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in drivers" :key="driver.driverId">
          <td>{{ driver.driverId }}</td>
          <td>{{ driver.name }}</td>
          <td>{{ driver.phoneNumber }}</td>
          <td>{{ driver.licenseNumber }}</td>
          <td>{{ driver.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { cmmAxios } from "../../common/ts/cmmAxios";

const { sendRequest, isLoading } = cmmAxios();


// 메뉴 데이터 타입 정의
export interface Driver {
  driverId: number;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  status: string;
}

// 운전원 리스트 상태
const drivers = ref<Driver[]>([]);
const searchQuery = ref<string>("");

// 🚀 서버에서 운전원 목록 불러오기
const fetchDrivers = async () => {
// ✅ API 요청 함수
const response = await sendRequest({
    url: "/api/dispatch/driver",
    method: "GET",
  });

  if (response) {
    drivers.value = response;
    console.log("운전원",response);
  } else {
    console.error("데이터 요청 실패");
  }

};

// 🔍 검색 필터링 (이름 기준)
const filteredDrivers = computed(() => {
  if (!searchQuery.value) return drivers.value;
  return drivers.value.filter(driver => driver.name.includes(searchQuery.value));
});

// 🚀 컴포넌트 마운트 시 데이터 로드
onMounted(fetchDrivers);
</script>

<style scoped>
.driver-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.search-container {
  text-align: center;
  margin-bottom: 15px;
}

.search-input {
  width: 50%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.driver-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.driver-table th, .driver-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.driver-table th {
  background-color: #333;
  color: white;
}

.driver-table tr:hover {
  background-color: #f5f5f5;
}
</style>
