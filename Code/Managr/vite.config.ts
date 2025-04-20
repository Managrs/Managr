import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      'Content-Type': 'application/javascript' // Ensures correct JS/TS MIME types
    }
  }
})
