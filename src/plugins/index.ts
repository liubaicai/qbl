import dayjs from "dayjs";
import _ from "lodash";
import { App } from "vue";

const fmtd = (value?: string | number | Date | dayjs.Dayjs | null | undefined) =>
  dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "";

const install = (app: App<Element>) => {
  app.config.globalProperties.$_ = _;
  app.config.globalProperties.$copy = _.cloneDeep;
  app.config.globalProperties.$merge = _.merge;
  app.config.globalProperties.$dayjs = dayjs;
  app.config.globalProperties.$fmtd = fmtd;
};

export default { install };
