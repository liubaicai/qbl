const find = (routes: RouteItem[]): MenuItem[] => {
  const arr: MenuItem[] = [];
  routes.forEach((m) => {
    if (m.meta?.menu) {
      const sub: MenuItem = {
        name: m.name as string,
        title: m.meta.title as string,
        path: m.path as string,
        icon: m.meta.icon as string,
      };
      sub.children = findSub(m);
      arr.push(sub);
    }
  });
  return arr;
};

const findSub = (menu: RouteItem): MenuItem[] => {
  const arr: MenuItem[] = [];
  menu?.children?.forEach((m) => {
    if (m.meta?.menu) {
      const sub: MenuItem = {
        name: m.name as string,
        title: m.meta.title as string,
        path: m.path as string,
        icon: m.meta.icon as string,
      };
      arr.push(sub);
    }
  });
  return arr;
};

export default function build(routes: RouteItem[]): MenuItem[] {
  return find(routes);
}
