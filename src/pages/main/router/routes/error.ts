const routes: RouteItem[] = [
  {
    path: "/:pathMatch(.*)",
    name: "404",
    meta: {},
    component: () => import("@/pages/main/views/error/NotFound.vue"),
  },
];

export default routes;
