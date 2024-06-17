import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: () => import('../views/demo1.vue')
    },
    {
      path: '/ref1',
      name: 'ref1',
      component: () => import('../views/ref1.vue')
    },
    {
      path: '/reactive1',
      name: 'reactive1',
      component: () => import('../views/reactive1.vue')
    },
    {
      path: '/toref1',
      name: 'toref1',
      component: () => import('../views/toref1.vue')
    },
    {
      path: '/compuTed1',
      name: 'compuTed1',
      component: () => import('../views/computedView.vue')
    },
    {
      path: '/watch1',
      name: 'watch1',
      component: () => import('../views/watch1.vue')
    },
    {
      path: '/shengmzq',
      name: 'shengmzq',
      component: () => import('../views/shengmzq.vue')
    },
    {
      // 组件传值
      path: '/scoped1',
      name: 'scoped1',
      component: () => import('../views/scoped1.vue')
    },
    {
      // 点击事件的 $event
      path: '/fuCard',
      name: 'fuCard',
      component: () => import('../views/fuCard.vue')
    },
    {
      // 动态路由切换
      path: '/tabView',
      name: 'tabView',
      component: () => import('../views/tabView.vue')
    },
    {
      // 插槽
      path: '/slotView',
      name: 'slotView',
      component: () => import('../views/slotView.vue')
    },
    {
      // 异步组件
      path: '/defAsync',
      name: 'defAsync',
      component: () => import('../views/defAsync.vue')
    },
    {
      // teleport 传送组件
      path: '/tempView',
      name: 'tempView',
      component: () => import('../views/tempView.vue')
    },
    {
      // keep-alive 缓存组件
      path: '/keepView',
      name: 'keepView',
      component: () => import('../views/keepView.vue')
    }
  ]
})

export default router
