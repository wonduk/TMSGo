import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);

    const login = (user: { name: string }) => {
        console.log("로그인:", user);
        isAuthenticated.value = true;
    };

    const logout = () => {
        console.log("로그아웃");
        isAuthenticated.value = false;
    };

    return { isAuthenticated, login, logout };
});
