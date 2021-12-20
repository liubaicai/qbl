import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import { resolve } from "path";
import viteSvgIcons from "vite-plugin-svg-icons";
import ElementPlus from "unplugin-element-plus/vite";
import path from "path";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

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
    },
  },
  plugins: [
    vue(),
    legacy({
      targets: ["defaults", "chrome > 48", "> 0.5%", "IE 11"],
    }),
    ElementPlus(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  optimizeDeps: {},
});
