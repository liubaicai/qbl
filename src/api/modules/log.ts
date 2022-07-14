import Base from "../core/base";
import type { Resp, ILog, RequestParamsType } from "../models";

class Log extends Base {
  test = (params?: RequestParamsType) => {
    return this.get<Resp<ILog[]>>("/log.json", params);
  };
}

const log = new Log("/log");

export default log;
