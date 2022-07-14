import { defineStore } from "pinia";
import routerBuild from "@/pages/main/router/route";
import { logApi } from "@/api/index";

export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      logo: "",
      pageData: Object.create(null),
      routes: [] as RouteItem[],
      auth: false,
      menus: [] as MenuItem[],
    };
  },
  actions: {
    setPageData(key: string, value: unknown) {
      this.pageData[key] = value;
    },
    getRoutes(): Promise<RouteItem[]> {
      return logApi.test().then(() => {
        const routes = routerBuild();
        this.auth = true;
        this.routes = routes;
        return routes;
      });
    },
    setMenus(menus: MenuItem[]) {
      this.menus = menus;
    },
  },
});
