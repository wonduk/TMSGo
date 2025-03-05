// src/stores/user.ts (Pinia 스토어 생성)
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const username = ref<string | null>(null);
  
  const login = (name: string) => {
    username.value = name;
  };

  const logout = () => {
    username.value = null;
  };

  return { username, login, logout };
});
