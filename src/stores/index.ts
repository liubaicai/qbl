import { defineStore } from "pinia";
import routerBuild from "@/pages/main/router/route";
import { RouteRecordNormalized } from "vue-router";
import api from "@/api/index";

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
      return api.post.detail(1).then(() => {
        const routes = routerBuild();
        this.routes = routes;
      });
    },
  },
});
