import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import Axios from 'axios'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')