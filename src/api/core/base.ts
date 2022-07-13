/* eslint-disable @typescript-eslint/no-explicit-any */

import { request, instance } from "@/api/core/request";
import type { AxiosRequestHeaders } from "axios";

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

  get = (url: string, params?: any, headers?: AxiosRequestHeaders) =>
    this.request({
      url,
      method: "get",
      params,
      headers,
    });

  post = (url: string, data: any, params?: any, headers?: AxiosRequestHeaders) =>
    this.request({
      url,
      method: "post",
      data,
      params,
      headers,
    });

  put = (url: string, data: any, params?: any, headers?: AxiosRequestHeaders) =>
    this.request({
      url,
      method: "put",
      data,
      params,
      headers,
    });

  delete = (url: string, params?: any, headers?: AxiosRequestHeaders) =>
    this.request({
      url,
      method: "delete",
      params,
      headers,
    });

  list = (params?: any) =>
    this.request({
      url: this.rootPoint,
      method: "get",
      params,
    });

  create = (data: any) =>
    this.request({
      url: this.rootPoint,
      method: "post",
      data,
    });

  detail = (id: string | number, params?: any) =>
    this.request({
      url: `${this.rootPoint}/${id}`,
      method: "get",
      params,
    });

  edit = (data: any) =>
    this.request({
      url: this.rootPoint,
      method: "put",
      data,
    });

  del = (id: string | number) =>
    this.request({
      url: `${this.rootPoint}/${id}`,
      method: "delete",
    });
}

export default Base;
