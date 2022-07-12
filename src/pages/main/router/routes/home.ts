export default [
  {
    path: "/",
    name: "home",
    meta: {
      auth: true,
    },
    component: () => import("@/pages/main/views/home/Home.vue"),
  },
];
