import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
      })],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // ...
        additionalData: `
              @use "./src/TUIRoom/assets/style/element.scss" as *;
          `,
      },
    },
  },
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  resolve: {
    // 别名配置
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  server: {
    open: true,
    port:12223
  },
})
