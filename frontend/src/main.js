import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'



Vue.config.productionTip = false
Vue.prototype.$http = Vue.prototype.axios = axios


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
