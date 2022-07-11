import router from "./index";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
];

export default function () {
  routes.forEach((route) => {
    router.addRoute(route);
  });
  return router.getRoutes();
}
