import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { initWorker } from "openpgp";

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false

initWorker({ path: '/openpgp.worker.min.js' })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
