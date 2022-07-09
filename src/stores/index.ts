import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      pageData: Object.create(null),
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setPageData(key: string, value: any) {
      this.pageData[key] = value;
    },
  },
});
