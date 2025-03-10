<template>
  <div>
    <p>운송 관리 > 운전원 관리</p>
    <div class="driver-container">
      <h1>👨‍✈️ 운전원 관리</h1>

      <!-- 운전원 추가 버튼 -->
      <button class="add-btn" @click="openModal(null)">운전원 추가</button>

      <!-- 운전원 테이블 -->
      <table class="driver-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>면허번호</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in drivers" :key="driver.driverId">
            <td>{{ driver.driverId }}</td>
            <td>{{ driver.name }}</td>
            <td>{{ driver.phoneNumber }}</td>
            <td>{{ driver.licenseNumber }}</td>
            <td>{{ driver.status }}</td>
            <td>

              <button @click="openModal(driver)">수정</button>
              <button @click="deleteDriver(driver.driverId)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 운전원 추가/수정 모달 -->
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <h2>{{ editingDriver?.driverId ? "운전원 수정" : "운전원 추가" }}</h2>
          <input v-model="form.name" placeholder="이름 입력" />
          <input v-model="form.phoneNumber" placeholder="전화번호 입력" />
          <input v-model="form.licenseNumber" placeholder="면허번호 입력" />
          <select v-model="form.status">
            <option value="AVAILABLE">대기중</option>
            <option value="ASSIGNED">배정됨</option>
            <option value="ON_LEAVE">휴가중</option>
          </select>
          <button @click="saveDriver">저장</button>
          <button @click="isModalOpen = false">닫기</button>
        </div>
      </div>
    </div>
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
const isModalOpen = ref(false);
const editingDriver = ref(null);
const form = ref({
  name: "",
  phoneNumber: "",
  licenseNumber: "",
  status: "AVAILABLE"
});

// 서버에서 운전원 목록 불러오기
const fetchDrivers = async () => {
  // API 요청 함수
  const response = await sendRequest({
    url: "/api/dispatch/driver",
    method: "GET",
  });

  if (response) {
    drivers.value = response;
  };
};

// 검색 필터링 (이름 기준)
const filteredDrivers = computed(() => {
  if (!searchQuery.value) return drivers.value;
  return drivers.value.filter(driver => driver.name.includes(searchQuery.value));
});

// 운전원 추가 / 수정 모달 열기
const openModal = (driver) => {
  if (driver) {
    editingDriver.value = driver;
    form.value = { ...driver };
  } else {
    editingDriver.value = null;
    form.value = { name: "", phoneNumber: "", licenseNumber: "", status: "AVAILABLE" };
  }
  isModalOpen.value = true;
};

// 운전원 추가 / 수정
const saveDriver = async () => {
  if (editingDriver.value) {
    const response = await sendRequest({
      url: `/api/dispatch/driver/${editingDriver.value.driverId}`,
      param: form.value,
      method: "POST",
    });
    if (response) {
    } else {
    }
  } else {
    const response = await sendRequest({
      url: `/api/dispatch/driver`,
      param: form.value,
      method: "POST",
    });
    if (response) {
    } else {
    }
  };
  isModalOpen.value = false;
  fetchDrivers();
};

// ❌ 운전원 삭제 (D)
const deleteDriver = async (id) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    const response = await sendRequest({
      url: `/api/dispatch/driver/${id}`,
      method: "DELETE",
      param: form.value
    });
    if (response) {
      isModalOpen.value = false;
    }
  };
};

// 컴포넌트 마운트 시 데이터 로드
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

.driver-table th,
.driver-table td {
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
