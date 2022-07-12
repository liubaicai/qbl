export default [
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/page_main/views/error/NotFound.vue"),
  },
];
