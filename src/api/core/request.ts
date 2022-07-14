import { ElMessage } from "element-plus";
import service from "./axios";
import _ from "lodash";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import type { RequestDataType } from "../models";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as AxiosRequestHeaders;

const messageForFailed = _.debounce((e) => {
  ElMessage({
    type: "error",
    message: e,
  });
}, 100);

const request = <T>(options: AxiosRequestConfig<RequestDataType>) => {
  options.headers = Object.assign(headers, options.headers);
  return service(options)
    .then((res: AxiosResponse<T, RequestDataType>) => {
      return res.data;
    })
    .catch((err: Error | AxiosError) => {
      console.error(err);
      messageForFailed(err?.message || err);
      return Promise.reject(err);
    });
};

const instance: AxiosInstance = service;

export { request, instance };
