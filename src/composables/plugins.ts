import dayjs from "dayjs";
import _ from "lodash";

const fmtd = (value?: string | number | Date | dayjs.Dayjs | null | undefined) =>
  dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "";

const copy = _.cloneDeep;

const merge = _.merge;

export { _, copy, merge, dayjs, fmtd };
