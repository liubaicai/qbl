import { App } from "vue";
import SvgIcon from "./SvgIcon.vue";

const install = (app: App<Element>) => {
  app.component("svg-icon", SvgIcon);
};

export default { install };
