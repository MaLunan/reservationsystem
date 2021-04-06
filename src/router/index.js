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
        meta: { title: '首页', icon: 'el-icon-goods', affix: true }
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
