const base = window.localStorage;
const sbase = window.sessionStorage;

// 存储的相关方法

declare class ExpireData {
  data: any;
  time: number;
  expire: number;
}

const storage = {
  set: (key: string, val: any, format = true) => {
    if (format) {
      return base.setItem(key, JSON.stringify(val));
    }
    return base.setItem(key, val);
  },

  get: (key: string, defaultVal: any, format = true) => {
    const val = base.getItem(key);
    if (format && val) {
      return JSON.parse(val) || defaultVal || null;
    }
    return val || defaultVal;
  },

  remove: (key: string) => base.removeItem(key),

  clear: () => base.clear(),
};

const session = {
  set: (key: string, val: any, format = true) => {
    if (format) {
      return sbase.setItem(key, JSON.stringify(val));
    }
    return sbase.setItem(key, val);
  },

  get: (key: string, defaultVal: any, format = true) => {
    const val = base.getItem(key);
    if (format && val) {
      return JSON.parse(val) || defaultVal;
    }
    return val || defaultVal;
  },

  remove: (key: string) => sbase.removeItem(key),

  clear: () => sbase.clear(),
};

const expire = {
  set: (key: string, val: any, exp: number) => {
    const obj = {
      data: val,
      time: Date.now(),
      expire: exp,
    } as ExpireData;
    return base.setItem(key, JSON.stringify(obj));
  },

  get: (key: string, defaultVal: any) => {
    const val = base.getItem(key);
    if (!val) {
      return defaultVal;
    }
    const obj = JSON.parse(val) as ExpireData;
    if (Date.now() - obj.time > obj.expire) {
      base.removeItem(key);
      return defaultVal;
    }
    return obj.data;
  },

  remove: (key: string) => base.removeItem(key),

  clear: () => base.clear(),
};

export { storage, session, expire };
