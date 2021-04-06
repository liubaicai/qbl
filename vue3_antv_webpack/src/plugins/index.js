/* eslint-disable no-param-reassign */
import dayjs from "dayjs";
import _ from "lodash";

import antDesign from "./ant-design";

const fmtd = (value) => (dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "");

const install = (app) => {
  app.config.globalProperties.$ls = _;
  app.config.globalProperties.$copy = _.cloneDeep;
  app.config.globalProperties.$merge = _.merge;
  app.config.globalProperties.$dayjs = dayjs;
  app.config.globalProperties.$fmtd = fmtd;

  app.use(antDesign);
};

export default { install };
