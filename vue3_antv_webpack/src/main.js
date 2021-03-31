import { createApp } from 'vue'
import icons from '@/assets/icons'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import plugins from '@/plugins'

import '@/assets/styles/index.scss'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(icons)
  .use(plugins)

app.mount('#app')
