export default [
  {
    path: "/",
    name: "home",
    meta: {
      auth: true,
    },
    component: () => import("@/page_main/views/home/Home.vue"),
  },
];
