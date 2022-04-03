import { fileURLToPath, URL } from 'url'
import { builtinModules } from 'module'

import { node as nodeVersion } from '../../.electron-vendors.cache.json'

const ROOT_DIR = __dirname

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  root: ROOT_DIR,
  mode: process.env.MODE,
  envDir: process.cwd(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: 'inline',
    target: `node${nodeVersion}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.js',
      formats: ['cjs']
    },
    rollupOptions: {
      external: [
        'electron',
        'electron-devtools-installer',
        '@grpc/grpc-js',
        ...builtinModules.flatMap(p => [p, `node:${p}`])
      ],
      output: {
        entryFileNames: '[name].cjs'
      }
    },
    emptyOutDir: true,
    reportCompressedSize: false
  }
}

export default config
