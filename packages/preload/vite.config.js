import { builtinModules } from 'module'

import { chrome as chromeVersion } from '../../.electron-vendors.cache.json'

const ROOT_DIR = __dirname

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  root: ROOT_DIR,
  mode: process.env.MODE,
  envDir: process.cwd(),
  build: {
    sourcemap: 'inline',
    target: `chrome${chromeVersion}`,
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
