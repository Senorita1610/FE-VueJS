import * as path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from "unplugin-auto-import/vite"


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@composables": path.resolve(__dirname, "./src/composables"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@plugins": path.resolve(__dirname, "./src/plugins"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      include: [
        /\.[t]s?$/, // .ts
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      dts: "./src/auto-imports.d.ts",
      imports: [
        "vue",
        "vue-router",
        {
          "@vueuse/core": [["get", "v"], "set", "useAsyncState"],
        },
      ],
      dirs: [
        "./src/composables",
        "./src/composables/**",
        "./src/components/**",
      ],
    }),

  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/layout/_mixins.scss";
                        @import "@/assets/layout/_variables.scss";
        `,
      },
    },
  },
})