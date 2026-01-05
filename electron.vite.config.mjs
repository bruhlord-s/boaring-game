import { defineConfig } from 'electron-vite'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [vuePlugin()]
  }
})
