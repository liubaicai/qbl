import router from "./index";

import auth from "./routes/auth";
import error from "./routes/error";

import home from "./routes/home";
import about from "./routes/about";

const routes = [...home, ...about, ...auth, ...error];

export default function () {
  routes.forEach((route) => {
    router.addRoute(route);
  });
  return router.getRoutes();
}
