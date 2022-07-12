export default [
  {
    path: "/about",
    name: "about",
    meta: {
      auth: true,
    },
    component: () => import("@/pages/main/views/about/About.vue"),
  },
];
