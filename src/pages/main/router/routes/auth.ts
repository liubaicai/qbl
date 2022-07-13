const routes: RouteItem[] = [
  {
    path: "/auth",
    name: "auth",
    meta: {
      auth: false,
    },
    component: () => import("@/pages/main/views/auth/Login.vue"),
  },
];

export default routes;
