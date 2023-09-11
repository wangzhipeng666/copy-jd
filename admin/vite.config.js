import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // 将@别名映射到src目录
      'api': path.resolve(__dirname, './src/api'),
    }
  },
  server: {
    port: 8080,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''), // 可选：如果后端API不在根路径，可以通过这个选项来去除前缀
    //   },
    // },
  },
});
