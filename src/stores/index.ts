import { defineStore } from "pinia";
import routerBuild from "@/pages/main/router/route";
import { RouteRecordNormalized } from "vue-router";

export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      pageData: Object.create(null),
      routes: [] as RouteRecordNormalized[],
    };
  },
  actions: {
    setPageData(key: string, value: any) {
      this.pageData[key] = value;
    },
    getRoutes() {
      return new Promise((resolve) => {
        const routes = routerBuild();
        setTimeout(() => {
          this.routes = routes;
          resolve(routes);
        }, 1000);
      });
    },
  },
});
