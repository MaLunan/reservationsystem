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
    path: '/400',
    component: () => import('@/views/400/index'),
    name: '/400',
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
    path: '/Commodity',
    component: Layout,
    children: [
      {
        path: '/Commodity',
        component: () => import('@/views/Commodity/index'),
        name: 'Commodity',
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
router.beforeEach((to, from, next) => {
  if(to.path!=='/400'){
    console.log('d')
    if(window.navigator.onLine==true){
      next()
    } else{
      next('/400')
    }
  }else{
    next()
  }
  })
export default router
