import type { App } from "vue";

import SvgIcon from "./global/SvgIcon/SvgIcon.vue";
import Logo from "./global/Logo.vue";
import Pagination from "./global/Pagination.vue";

function install(app: App<Element>) {
  app.component("svg-icon", SvgIcon);
  app.component("Logo", Logo);
  app.component("Pagination", Pagination);
}
export default install;
