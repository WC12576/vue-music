
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

import fastclick from 'fastclick'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyLoad,{
  loading: require('common/image/play.png')
})
// eslint-disable-next-line
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
