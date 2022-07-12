/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";

export {}; // 必须保留
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $fmtd: (value?: string | number | Date | dayjs.Dayjs | null | undefined) => string;
  }
}
