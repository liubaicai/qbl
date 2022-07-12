export default [
  {
    path: "/",
    name: "home",
    meta: {
      menu: true,
      title: "主页",
    },
    component: () => import("@/pages/main/views/home/Home.vue"),
  },
];
