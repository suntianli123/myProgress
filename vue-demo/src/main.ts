// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Card from './components/expame/Card.vue'
import mitt from 'mitt'

const app = createApp(App)

app.config.globalProperties.$envStr = 'confDev'

app.config.globalProperties.$fitters = {
    format (str: string) {
        return `过滤de-- ${str}`
    }
}
type Filter = {
    format<T> (str: any): string
}

const Mit = mitt()

declare module 'vue' {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit,
        $fitters: Filter
    }
}

app.config.globalProperties.$Bus = Mit

app.use(createPinia())
app.use(router)

app.component('CardDiv', Card)  // 注册全局组件

app.mount('#app')
