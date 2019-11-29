import 'babel-polyfill';
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import {store} from "./store.js";
import API from './api.js';

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(Vuex);

Vue.use({
  install(Vue) {
    Vue.prototype.$http = new API();
  }
});

new Vue({
  el: '#app',
  router,
  icons,
  store,
  template: '<App/>',
  components: {
    App
  },
})
