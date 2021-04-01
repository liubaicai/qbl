import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import plugins from '@/plugins'

import '@/assets/styles/index.scss'
import 'element-plus/packages/theme-chalk/src/base.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(plugins)

app.mount('#app')
