import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// import styleImport from "vite-plugin-style-import";
import viteSvgIcons from "vite-plugin-svg-icons";
import ElementPlus from "unplugin-element-plus/vite";
import path from "path";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
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
    ElementPlus(),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: "element-plus",
    //       resolveStyle: (name) => {
    //         name = name.substr(3);
    //         return `element-plus/theme-chalk/src/${name}.scss`;
    //       },
    //       resolveComponent: (name) => {
    //         name = name.substr(3);
    //         return `element-plus/lib/components/${name}`;
    //       },
    //     },
    //   ],
    // }),
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
