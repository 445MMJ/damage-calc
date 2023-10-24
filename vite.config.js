import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // Disables the preload.
    modulePreload: false,
  },
  base: 'damage-calc', //追加
  plugins: [
    vue(),
    vuetify({ autoImport: true },{ styles: { configFile: 'src/settinga.scss' } }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
