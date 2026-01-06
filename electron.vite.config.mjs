import { defineConfig } from 'electron-vite'
import vuePlugin from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: [{ find: '@sounds', replacement: resolve(__dirname, 'src/renderer/assets/sounds') }]
    },
    plugins: [vuePlugin()]
  }
})
