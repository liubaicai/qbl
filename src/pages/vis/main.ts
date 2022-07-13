import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import plugins from "@/plugins";

import "@/assets/styles/index.scss";
import "element-plus/es/components/message/style/css";

const app = createApp(App);
app.use(createPinia());
app.use(plugins);

app.mount("#app");
