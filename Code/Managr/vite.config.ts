import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      'Content-Type': 'application/javascript' // Forces correct MIME type
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: '[name].[hash].js', // Clean chunk naming
        assetFileNames: '[name].[hash][extname]'
      }
    }
  }
})
