import fileDownload from "js-file-download";
import { request, instance, message } from "@/api/core/request";
import type { AxiosRequestHeaders, AxiosResponse } from "axios";
import type { RequestDataType, RequestParamsType } from "../models";

function cryptoRandomString(e?: number) {
  e = e || 32;
  const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const a = t.length;
  let n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

const extractFilenameFromResponseHeader = (response: AxiosResponse) => {
  const contentDisposition = response.headers["content-disposition"];
  // eslint-disable-next-line no-useless-backreference
  const patt = /filename[^;\n]*=(UTF-\d['"]*)?((['"]).*?[.]$\2|[^;\n]*)?/i;
  const result = patt.exec(contentDisposition);
  let filename = "";
  if (result) {
    filename = result.length > 2 ? result[2] : "";
  }
  return decodeURIComponent(filename.trim().replace(new RegExp('"', "g"), ""));
};

enum HTTP_METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

// 一些基本的http方法和restful定义方法
class Base {
  rootPoint: string;
  baseUrl = instance.defaults.baseURL;
  request = request;
  cryptoRandomString = cryptoRandomString;
  method = HTTP_METHOD;

  constructor(rootPoint: string) {
    this.rootPoint = rootPoint;
  }

  get = <T>(url: string, params?: RequestParamsType, headers?: AxiosRequestHeaders) =>
    this.request<T>({
      url,
      method: this.method.GET,
      params,
      headers,
    });

  post = <T>(url: string, data: RequestDataType, params?: RequestParamsType, headers?: AxiosRequestHeaders) =>
    this.request<T>({
      url,
      method: this.method.POST,
      data,
      params,
      headers,
    });

  put = <T>(url: string, data: RequestDataType, params?: RequestParamsType, headers?: AxiosRequestHeaders) =>
    this.request<T>({
      url,
      method: this.method.PUT,
      data,
      params,
      headers,
    });

  delete = <T>(url: string, params?: RequestParamsType, headers?: AxiosRequestHeaders) =>
    this.request<T>({
      url,
      method: this.method.DELETE,
      params,
      headers,
    });

  list = <T>(params?: RequestParamsType) =>
    this.request<T>({
      url: this.rootPoint,
      method: this.method.GET,
      params,
    });

  create = <T>(data: RequestDataType) =>
    this.request<T>({
      url: this.rootPoint,
      method: this.method.POST,
      data,
    });

  detail = <T>(id: string | number, params?: RequestParamsType) =>
    this.request<T>({
      url: `${this.rootPoint}/${id}`,
      method: this.method.GET,
      params,
    });

  edit = <T>(data: RequestDataType) =>
    this.request<T>({
      url: this.rootPoint,
      method: this.method.PUT,
      data,
    });

  del = <T>(id: string | number) =>
    this.request<T>({
      url: `${this.rootPoint}/${id}`,
      method: this.method.DELETE,
    });

  upload = <T>(url: string, body: FormData, method?: HTTP_METHOD, action?: (progressEvent: ProgressEvent) => void) => {
    const boundary = `boundary=----WebKitFormBoundary${this.cryptoRandomString(16)}`;
    return this.request<T>({
      url: url,
      method: method || this.method.POST,
      data: body,
      headers: {
        "Content-Type": `multipart/form-data; ${boundary}`,
      },
      onUploadProgress: action,
    });
  };

  download = (
    url: string,
    filename?: string,
    params?: RequestParamsType,
    data?: RequestDataType,
    method?: HTTP_METHOD,
    action?: (progressEvent: ProgressEvent) => void
  ) => {
    return instance
      .request({
        url: url,
        method: method || this.method.POST,
        params: params,
        data: data,
        onDownloadProgress: action,
      })
      .then(async (response) => {
        const resBlob: string | ArrayBuffer | ArrayBufferView | Blob = response.data;
        let respData = null;
        try {
          if (response.headers["content-type"].indexOf("application/json") >= 0) {
            const respText = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.addEventListener("abort", reject);
              reader.addEventListener("error", reject);
              reader.addEventListener("loadend", () => {
                resolve(reader.result);
              });
              reader.readAsText(resBlob as Blob);
            });
            respData = JSON.parse(respText as string); // <--- try to parse as json evantually
          }
        } catch (err) {
          // ignore
        }
        if (respData) {
          if (respData.code && respData.code !== 0 && respData.message) {
            console.error(respData);
            message(respData.message || respData.msg);
            return Promise.reject(Object.assign({}, respData));
          }
        }
        fileDownload(resBlob, filename || extractFilenameFromResponseHeader(response));
        return Promise.resolve(Object.assign({}, response));
      });
  };
}

export default Base;
