import { request, instance } from "@/api/core/request";
import type { AxiosRequestHeaders } from "axios";
import type { RequestDataType, RequestParamsType } from "../models";

function cryptoRandomString(e?: number) {
  e = e || 32;
  const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const a = t.length;
  let n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

// 一些基本的http方法和restful定义方法
class Base {
  rootPoint: string;
  baseUrl = instance.defaults.baseURL;
  request = request;
  cryptoRandomString = cryptoRandomString;

  constructor(rootPoint: string) {
    this.rootPoint = rootPoint;
  }

  get = <T>(url: string, params?: RequestParamsType, headers?: AxiosRequestHeaders) =>
    this.request<T>({
      url,
      method: "get",
      params,
      headers,
    });

  post = <T>(url: string, data: RequestDataType, params?: RequestParamsType, headers?: AxiosRequestHeaders) =>
    this.request<T>({
      url,
      method: "post",
      data,
      params,
      headers,
    });

  put = <T>(url: string, data: RequestDataType, params?: RequestParamsType, headers?: AxiosRequestHeaders) =>
    this.request<T>({
      url,
      method: "put",
      data,
      params,
      headers,
    });

  delete = <T>(url: string, params?: RequestParamsType, headers?: AxiosRequestHeaders) =>
    this.request<T>({
      url,
      method: "delete",
      params,
      headers,
    });

  list = <T>(params?: RequestParamsType) =>
    this.request<T>({
      url: this.rootPoint,
      method: "get",
      params,
    });

  create = <T>(data: RequestDataType) =>
    this.request<T>({
      url: this.rootPoint,
      method: "post",
      data,
    });

  detail = <T>(id: string | number, params?: RequestParamsType) =>
    this.request<T>({
      url: `${this.rootPoint}/${id}`,
      method: "get",
      params,
    });

  edit = <T>(data: RequestDataType) =>
    this.request<T>({
      url: this.rootPoint,
      method: "put",
      data,
    });

  del = <T>(id: string | number) =>
    this.request<T>({
      url: `${this.rootPoint}/${id}`,
      method: "delete",
    });
}

export default Base;
