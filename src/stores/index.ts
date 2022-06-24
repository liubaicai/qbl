import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", {
  state: () => {
    return { msg: "" };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    sendMessage(msg: string) {
      this.msg = msg;
    },
  },
});
