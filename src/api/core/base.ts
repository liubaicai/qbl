import { request } from "@/api/core/request";

function cryptoRandomString(e: number) {
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
  baseUrl = "/api";
  request = request;
  cryptoRandomString = cryptoRandomString;

  constructor(rootPoint: string) {
    this.rootPoint = rootPoint;
  }

  get = (url: string, params?: any, headers?: any) =>
    this.request({
      url,
      method: "get",
      params,
      headers: Object.assign(headers || {}, {
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });

  post = (url: string, data: any, params?: any, headers?: any) =>
    this.request({
      url,
      method: "post",
      data,
      headers: Object.assign(headers || {}, {
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      params,
    });

  put = (url: string, data: any, params?: any, headers?: any) =>
    this.request({
      url,
      method: "put",
      data,
      headers: Object.assign(headers || {}, {
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      params,
    });

  delete = (url: string, headers?: any) =>
    this.request({
      url,
      method: "delete",
      headers: Object.assign(headers || {}, {
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
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
      url: `${this.rootPoint}?id=${id}`,
      method: "delete",
    });
}

export default Base;
