import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // vite 打包的优化
  build: {
    chunkSizeWarningLimit: 2000,  // 打包完超过多少kb进行提示
    cssCodeSplit: true,   // css文件进行拆分
    sourcemap: false,   // 不生成sourcemap
    minify: 'esbuild',    // 是否禁用追消化混淆，esbuild：打包速度最快，terser打包体积最小
    assetsInlineLimit: 4000   // 小于该值，图片会打包成base64
  }
})
