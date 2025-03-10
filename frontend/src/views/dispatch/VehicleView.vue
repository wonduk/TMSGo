<template>
  <div class="vehicle-container">
    <h1>🚗 차량 관리</h1>
    
    <!-- 차량 추가 버튼 -->
    <button class="add-btn" @click="openModal(null)">차량 추가</button>

    <!-- 차량 테이블 -->
    <table class="vehicle-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>번호판</th>
          <th>모델</th>
          <th>제조사</th>
          <th>연식</th>
          <th>상태</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.vehicleId">
          <td>{{ vehicle.vehicleId }}</td>
          <td>{{ vehicle.licensePlate }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.manufacturer }}</td>
          <td>{{ vehicle.year }}</td>
          <td>{{ vehicle.status }}</td>
          <td>
            <button @click="openModal(vehicle)">수정</button>
            <button @click="deleteVehicle(vehicle.vehicleId)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { cmmAxios } from "../../common/ts/cmmAxios";

const { sendRequest, isLoading } = cmmAxios();

// 메뉴 데이터 타입 정의
export interface vehicle {
  vehicleId: number;
  licensePlate: string;
  model: string;
  manufacturer: string;
  year: number;
  status: string;
}


const vehicles = ref<vehicle[]>([]);

const fetchVehicles = async () => {
  const response = await sendRequest({
    url: "/api/dispatch/vehicle",
    method: "GET", 
  });
  if (response) {
    console.log(response);
    vehicles.value = response;
  };

};

onMounted(fetchVehicles);
</script>