import NProgress from "nprogress";
import { createRouter, createWebHashHistory } from "vue-router";
import { useIndexStore } from "@/stores/index";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const iStore = useIndexStore();
  if (iStore.auth || to.meta.auth !== false) {
    NProgress.start();
    next();
  } else {
    next("/auth");
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
