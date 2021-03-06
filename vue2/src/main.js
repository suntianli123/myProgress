import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/';

import Rem from './assets/js/rem';
import {Toast} from 'vant';

Vue.use(Rem);//标签栏
Vue.use(Toast);//Toast 轻提示

// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// export default vConsole

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

const regExpAboutPage = /\/about\/(.*)\.html/;

if (!regExpAboutPage.test(location.href)) {
    if (process.env.NODE_ENV === 'development') {
        // 本地开发环境配置用户信息
        setDevInfo();
    } else {
        console.log(222)
    }
}

// 本地开发环境配置用户信息
function setDevInfo() {
    let myUserId = '4028824f6832027001683214eaa10000';
    let myToken = '9D2E5BF6DA95048F0286850ACA4C25B0';
    localStorage.setItem('userId', myUserId);
    localStorage.setItem('token', myToken);
}