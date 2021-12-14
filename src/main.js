import Vue from 'vue'
import App from './App.vue'
import Guest from './Guest.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

require('/public/assets/css/style.css')
require('/public/assets/css/components.css')
require('/public/css/style.css')
require("@/store/subscriber");

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

Vue.config.productionTip = false

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.prototype.$http = axios

Vue.config.productionTip = false

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  if(localStorage.getItem("token")){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  } else {
    new Vue({
      router,
      store,
      render: h => h(Guest)
    }).$mount('#app')
  }
});
