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
      path: '/computed1',
      name: 'computed1',
      component: () => import('../views/computed1.vue')
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
    }
  ]
})

export default router
