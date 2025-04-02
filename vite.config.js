import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { API_BASE_URL } from '@/config';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Ensure this alias is set
    }
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
  }
});