/* eslint-disable @typescript-eslint/no-explicit-any */

declare class RouteItem {
  path: string;
  name: string;
  meta: {
    menu?: boolean;
    title?: string;
    icon?: string;
  };
  component: () => Promise<any>;
  children?: RouteItem[];
}

declare class MenuItem {
  name: string;
  title: string;
  path: string;
  icon: string;
  children?: MenuItem[];
}

type RequestDataType = any;
type RequestParamsType = Record<string, string | number>;
