// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import {postKeyValueRequest, postRequest, getRequest, putRequest, deleteRequest, axiosSetHeader, axiosGetHeader} from './utils/api'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.axiosSetHeader = axiosSetHeader
Vue.prototype.axiosGetHeader = axiosGetHeader
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
