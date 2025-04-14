import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {},
  base: '/',
  resolve: {
    alias: {
      '@': '/src',  // Optional but recommended
      vue: 'vue/dist/vue.esm-bundler.js'  // Critical fix
    }
  }
})
