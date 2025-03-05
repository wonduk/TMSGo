import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../backend/src/main/resources/static', // 빌드 디렉토리 지정
    sourcemap: true, // 소스 맵 활성화
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8088', // API 요청을 백엔드로 프록시
    },
  },
});
