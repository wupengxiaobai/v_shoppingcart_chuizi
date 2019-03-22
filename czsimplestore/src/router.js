import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    routes: [{
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
            component: () => import( /* webpackChunkName: "about" */ './views/Index.vue')
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
        },
        {
            path: '/clearing',
            name: 'clearing',
            component: () => import('./views/Clearing.vue')
        },
        {
            path: '/payment',
            name: 'payment',
            component: () => import('./views/Payment.vue')
        },
        {
            path: '/account',
            component: () => import('./views/account.vue'),
            children: [{
                path: 'order',
                name: 'order',
                component: () => import('./views/orderCenter/order.vue')
            }, {
                path: 'address',
                name: 'address',
                component: () => import('./views/orderCenter/address.vue')
            }]

        }
    ]
})