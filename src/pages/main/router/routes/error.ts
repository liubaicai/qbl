export default [
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/pages/main/views/error/NotFound.vue"),
  },
];
