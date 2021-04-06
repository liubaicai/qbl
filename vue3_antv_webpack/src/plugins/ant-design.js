/* eslint-disable no-param-reassign */
import { Button, message } from "ant-design-vue";

const install = (app) => {
  app.use(Button);

  app.config.globalProperties.$message = message;
};

export default { install };
