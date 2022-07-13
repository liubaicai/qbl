import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import plugins from "@/plugins";
import components from "@/components";

import "virtual:svg-icons-register";

import "@/assets/styles/index.scss";
import "element-plus/es/components/message/style/css";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(plugins);
app.use(components);

app.mount("#app");
