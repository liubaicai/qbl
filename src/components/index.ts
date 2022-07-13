import type { App } from "vue";

import SvgIcon from "@/assets/icons/SvgIcon.vue";
import Logo from "./Logo.vue";

function install(app: App<Element>) {
  app.component("svg-icon", SvgIcon);
  app.component("Logo", Logo);
}
export default install;
