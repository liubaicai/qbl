const routes: RouteItem[] = [
  {
    path: "/about",
    name: "about",
    meta: {
      menu: true,
      title: "关于",
    },
    component: () => import("@/pages/main/views/about/About.vue"),
    children: [
      {
        path: "/about/me",
        name: "about-me",
        meta: {
          menu: true,
          title: "关于我",
        },
        component: () => import("@/pages/main/views/about/About.vue"),
      },
      {
        path: "/about/you",
        name: "about-you",
        meta: {
          menu: true,
          title: "关于你",
        },
        component: () => import("@/pages/main/views/about/About.vue"),
      },
    ],
  },
];

export default routes;
