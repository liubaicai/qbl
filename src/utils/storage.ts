/* eslint-disable @typescript-eslint/no-explicit-any */
// 存储的相关方法

declare class ExpireData {
  data: any;
  time: number;
  expire: number;
}

declare class StorageOptions {
  default?: any;
  format?: true;
  expire?: number;
}

interface StorageBase {
  get(key: string, options?: StorageOptions): any;
  set(key: string, value: any, options?: StorageOptions): void;
  remove(key: string): void;
  clear(): void;
}

class Storage implements StorageBase {
  get(key: string, options?: StorageOptions | undefined) {
    const val = window.localStorage.getItem(key);
    if (options?.format && val) {
      return JSON.parse(val) || options?.default || null;
    }
    return val || options?.default;
  }
  set(key: string, value: any, options?: StorageOptions | undefined): void {
    if (options?.format) {
      return window.localStorage.setItem(key, JSON.stringify(value));
    }
    return window.localStorage.setItem(key, value);
  }
  remove(key: string): void {
    window.localStorage.removeItem(key);
  }
  clear(): void {
    window.localStorage.clear();
  }
}

class Session implements StorageBase {
  get(key: string, options?: StorageOptions | undefined) {
    const val = window.sessionStorage.getItem(key);
    if (options?.format && val) {
      return JSON.parse(val) || options?.default;
    }
    return val || options?.default;
  }
  set(key: string, value: any, options?: StorageOptions | undefined): void {
    if (options?.format) {
      return window.sessionStorage.setItem(key, JSON.stringify(value));
    }
    return window.sessionStorage.setItem(key, value);
  }
  remove(key: string): void {
    window.sessionStorage.removeItem(key);
  }
  clear(): void {
    window.sessionStorage.clear();
  }
}

class Expire implements StorageBase {
  get(key: string, options?: StorageOptions | undefined) {
    const val = window.localStorage.getItem(key);
    if (!val) {
      return options?.default;
    }
    const obj = JSON.parse(val) as ExpireData;
    if (Date.now() - obj.time > obj.expire) {
      window.localStorage.removeItem(key);
      return options?.default;
    }
    return obj.data;
  }
  set(key: string, value: any, options?: StorageOptions | undefined): void {
    if (options?.expire) {
      const obj: ExpireData = {
        data: value,
        time: Date.now(),
        expire: options.expire,
      };
      window.localStorage.setItem(key, JSON.stringify(obj));
    }
  }
  remove(key: string): void {
    window.localStorage.removeItem(key);
  }
  clear(): void {
    window.localStorage.clear();
  }
}

const storage = new Storage();
const session = new Session();
const expire = new Expire();

export { storage, session, expire };
