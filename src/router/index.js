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
        path: '/order',
        component: () => import('@/views/order/index'),
        name: '/order',
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: '/login',
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    name: '/register',
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
    path: '/orderdetail',
    component: Layout,
    redirect: '/orderdetail',
    children: [
      {
        path: '/orderdetail',
        component: () => import('@/views/orderdetail/index'),
        name: 'orderdetail',
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
