import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import plugins from "@/plugins";

import "vite-plugin-svg-icons/register";
import icons from "@/assets/icons";

import "@/assets/styles/index.scss";
import "element-plus/es/components/message/style/css";

import { useIndexStore } from "@/stores/index";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(plugins);
app.use(icons);
app.mixin({
  data() {
    return {
      pageLoading: true,
      saveLoading: false,
      pageKey: this.$route.name,
    };
  },
  computed: {
    storeData: {
      get: function (): any {
        return useIndexStore().pageData[this.pageKey];
      },
      set: function (val: any) {
        const oldObj = useIndexStore().pageData[this.pageKey];
        if (oldObj) {
          const oldStr = JSON.stringify(oldObj);
          const newStr = JSON.stringify(val);
          if (oldStr !== newStr) {
            useIndexStore().pageData[this.pageKey] = val;
          }
        } else {
          useIndexStore().pageData[this.pageKey] = val;
        }
      },
    } as any,
  },
});

app.mount("#app");
