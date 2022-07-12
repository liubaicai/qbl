/* eslint-disable @typescript-eslint/no-explicit-any */

export {}; // 必须保留
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $fmtd: any;
  }
}
