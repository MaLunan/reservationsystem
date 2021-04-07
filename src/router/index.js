import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/order',
    children: [
      {
        path: 'order',
        component: () => import('@/views/order/index'),
        name: 'order',
      }
    ]
  },
  {
    path: '/diningTable',
    component: Layout,
    children: [
      {
        path: '/diningTable',
        component: () => import('@/views/diningTable/index'),
        name: 'diningTable',
      }
    ]
  },
  {
    path: '/moneyLocker',
    component: Layout,
    children: [
      {
        path: '/moneyLocker',
        component: () => import('@/views/moneyLocker/index'),
        name: 'moneyLocker',
      }
    ]
  },
  {
    path: '/toUp',
    component: Layout,
    redirect: '/toUp',
    children: [
      {
        path: '/toUp',
        component: () => import('@/views/toUp/index'),
        name: 'toUp',
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
