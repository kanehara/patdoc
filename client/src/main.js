// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import store from './store'
require('semantic-ui-icon/icon.min.css')
require('semantic-ui-image/image.min.css')
require('semantic-ui-menu/menu.min.css')
require('semantic-ui-table/table.min.css')
require('semantic-ui-button/button.min.css')
require('semantic-ui-item/item.min.css')

Vue.config.productionTip = false

Vue.use(vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
