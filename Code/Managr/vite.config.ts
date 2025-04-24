/*import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import { fileURLToPath, URL } from 'node:url';
//import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [vue(),tsconfigPaths()],
  resolve: {
    alias: {
      //'@': fileURLToPath(new URL('./src', import.meta.url)),
      //'@': path.resolve(__dirname, './src'),
      'vue': 'vue/dist/vue.esm-browser.js' // Explicit ESM browser build
    }
  },

  test: {
    environment: 'happy-dom', // or 'jsdom'
    // ... other config
  },

  optimizeDeps: {
    include: ['vue', 'vue-router'] // Pre-bundle dependencies
  }
})*/

import { defineConfig as viteDefineConfig } from 'vite'
import { mergeConfig } from 'vite'
import { defineConfig as vitestDefineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'

const viteConfig = viteDefineConfig({
  plugins: [
    vue(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-browser.js'
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router']
  }
})

export default mergeConfig(
  viteConfig,
  vitestDefineConfig({
    test: {
      environment: 'happy-dom',
      globals: true
    }
  })
)