import dayjs from "dayjs";
import type { App } from "vue";

const fmtd = (value?: string | number | Date | dayjs.Dayjs | null | undefined) =>
  dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "";

const install = (app: App<Element>) => {
  app.config.globalProperties.$fmtd = fmtd;
};

export default { install };
