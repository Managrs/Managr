import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,  // Enable experimental defineModel
        propsDestructure: true  // Enable props destructure
      }
    })
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-browser.prod.js'  // Explicit browser build
    },
    extensions: ['.js', '.ts', '.vue', '.json']  // Auto-resolve extensions
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  },

  server: {
    host: true,  // Listen on all network interfaces
    port: 5173,
    strictPort: true,
    headers: {
      'Content-Type': 'application/javascript'  // Fix MIME issues
    }
  },

  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          vendor: ['axios', 'lodash-es']
        }
      }
    }
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios'
    ],
    exclude: ['vue-demi']
  }
})