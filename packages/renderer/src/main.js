import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lodash from 'lodash'
import AntDesign from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import App from './App.vue'
import router from './router'
import { rpcClient } from './rpc-client'

const app = createApp(App)

app.config.globalProperties.$rpcClient = rpcClient
app.config.globalProperties.$lodash = lodash
app.provide('app.globals', app.config.globalProperties)

app.config.errorHandler = (err, instance, info) => {
  window.electronAPI.dialog.showErrorBox(err.name, err.message)
}

app.use(createPinia())
  .use(AntDesign)
  .use(router)
  .mount('#app')
