import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GoodDetail from './views/GoodDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/index',
      name: 'index',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Index.vue')
    },
    {
      path: '/shoppingcar',
      name: 'shoppingcar',
      component: () => import('./views/ShoppingCar.vue')
    },
    {
      path: '/goodDetail',
      name: 'goodDetail',
      component: () => import('./views/GoodDetail.vue')
    }
  ]
})
