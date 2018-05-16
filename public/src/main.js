import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import GSignInButton from 'vue-google-signin-button'
import VueSession from 'vue-session'

Vue.use(VueSession, {persist: true})
Vue.use(GSignInButton)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  template: '<App/>',
  components: { App }
})
