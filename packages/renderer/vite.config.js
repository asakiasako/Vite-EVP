import { fileURLToPath, URL } from 'url'
import { builtinModules } from 'module'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { chrome } from '../../.electron-vendors.cache.json'

const ROOT_DIR = __dirname

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  root: ROOT_DIR,
  base: './',
  mode: process.env.MODE,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    rollupOptions: {
      external: [
        ...builtinModules.flatMap(p => [p, `node:${p}`])
      ]
    },
    emptyOutDir: true,
    reportCompressedSize: false
  }
})
