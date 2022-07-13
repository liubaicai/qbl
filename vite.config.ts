import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import { resolve } from "path";
import viteSvgIcons from "vite-plugin-svg-icons";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ["lodash"],
          dayjs: ["dayjs"],
          elementplus: ["element-plus"],
        },
      },
      input: ["./index.html", "./vis.html"],
    },
  },
  plugins: [
    vue(),
    legacy({
      targets: ["defaults", "chrome > 48", "> 0.5%", "IE 11"],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), "src/assets/icons/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {},
});
