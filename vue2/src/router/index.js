import Vue from 'vue';
import Router from 'vue-router';

import userCenterRoutes from './userCenter';
import shopRoutes from './shop';


const routes = userCenterRoutes.concat(shopRoutes, [{
    path: '/*',
    name: 'all',
    redirect: () => {
        return '/userCenter/emit.html';
    }
}]);

Vue.use(Router);

/**
 * 路由控制中心
 */
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes,
    // 打开新页面显示到顶部，不能受到上一页上下滚动的距离影响
    scrollBehavior: function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});

router.afterEach((to) => {
    // 设置页面title
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = '小司';
    }
});

export default router;