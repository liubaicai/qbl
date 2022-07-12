export default [
  {
    path: "/about",
    name: "about",
    meta: {
      auth: true,
    },
    component: () => import("@/page_main/views/about/About.vue"),
  },
];
