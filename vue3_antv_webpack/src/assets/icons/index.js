import SvgIcon from "./SvgIcon.vue";

const install = (app) => {
  app.component("svg-icon", SvgIcon);
  const req = require.context("./svg", false, /\.svg$/);
  const requireAll = (requireContext) => requireContext.keys().map(requireContext);
  requireAll(req);
};

export default { install };
