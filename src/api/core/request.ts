import { ElMessage } from "element-plus";
import service from "./axios";
import _ from "lodash";
import { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";

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

const HTTPSuccessFn = (res: AxiosResponse<any, any>) => {
  return res;
};

const HTTPFailedFn = (err: any) => {
  console.error(err);
  messageForFailed(err?.message || err?.msg || err);
  return Promise.reject(err);
};

const request = (options: AxiosRequestConfig<any>) => {
  options.headers = Object.assign(headers, options.headers);
  return service(options).then(HTTPSuccessFn).catch(HTTPFailedFn);
};

const instance: AxiosInstance = service;

export { request, instance };
