// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Card from './components/expame/Card.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('CardDiv', Card)  // 注册全局组件

app.mount('#app')
