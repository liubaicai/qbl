/* eslint-disable @typescript-eslint/no-explicit-any */

declare type Lazy<T> = () => Promise<T>;

declare class RouteItem {
  path: string;
  name: string;
  meta: {
    menu?: boolean;
    auth?: boolean;
    title?: string;
    icon?: string;
  };
  component: Lazy<RouteComponent>;
  children?: RouteItem[];
}

declare class MenuItem {
  name: string;
  title: string;
  path: string;
  icon: string;
  children?: MenuItem[];
}
