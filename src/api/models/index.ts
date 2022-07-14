interface Resp<D> {
  status: number;
  message: string;
  total?: number;
  page?: number;
  data?: D;
}

export type RequestDataType = unknown;
export type RequestParamsType = Record<string, string | number>;

export type { ILog } from "./types/log";

export type { Resp };
