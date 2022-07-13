/* eslint-disable max-len */
// 一些验证表单的方法

export function validateEmpty(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  if (!value) {
    callback(new Error("该字段不能为空"));
  } else {
    callback();
  }
}

export function validateIP(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  if (!value) {
    callback();
  } else {
    const reg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入正确的IP地址"));
    } else {
      callback();
    }
  }
}

export function validateCIDR(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  if (!value) {
    callback();
  } else {
    const reg =
      /^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/([1-9]|[1-2]\d|3[0-2])$/;
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入有效的IP地址，例如：127.0.0.1/24"));
    } else {
      callback();
    }
  }
}

export function validateGateway(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  if (!value) {
    callback();
  } else {
    const reg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入正确的网关地址"));
    } else {
      callback();
    }
  }
}

export function validateMask(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  if (!value) {
    callback();
  } else {
    const reg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入正确的子网掩码"));
    } else {
      callback();
    }
  }
}

export function validatePhone(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  const reg = /^[1][3-9][0-9]{9}$/;
  if (!value) {
    callback();
  } else if (!reg.test(value) && value !== "") {
    callback(new Error("请输入正确的电话号码"));
  } else {
    callback();
  }
}

export function validateIdNo(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!value) {
    callback();
  } else if (!reg.test(value) && value !== "") {
    callback(new Error("请输入正确的身份证号码"));
  } else {
    callback();
  }
}

export function validateEmail(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
  if (!value) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
}

export function validateUrl(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  const urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  if (!value) {
    callback();
  } else if (!urlregex.test(value)) {
    callback(new Error("请输入正确的URL"));
  } else {
    callback();
  }
}

export function validatePort(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  const regex = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  if (!value) {
    callback();
  } else if (!regex.test(value)) {
    callback(new Error("端口范围为1-65535"));
  } else {
    callback();
  }
}

export function validateAccount(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  if (!value) {
    callback();
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_]{1,31}$/.test(value)) {
    callback(new Error("用户名须以字母开头, 且由字母、数字和下划线组成"));
  } else {
    callback();
  }
}

export function validateUserName(rule: unknown, value: string, callback: (arg0?: Error | undefined) => void) {
  if (!value) {
    callback();
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_]{1,31}$/.test(value)) {
    callback(new Error("请输入1-32位的合法的账户名"));
  } else {
    callback();
  }
}

export function validateVlanId(rule: unknown, value: number, callback: (arg0?: Error | undefined) => void) {
  if (value === null) {
    callback();
  } else if (!Number.isInteger(value)) {
    callback(new Error("ID范围为0-4096"));
  } else if (value < 0 || value > 4096) {
    callback(new Error("ID范围为0-4096"));
  } else {
    callback();
  }
}
