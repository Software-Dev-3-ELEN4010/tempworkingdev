import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import GSignInButton from 'vue-google-signin-button'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.use(VModal)
Vue.use(VueSession, {persist: true})
Vue.use(GSignInButton)
Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.debug = false
Vue.config.silent = true


/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  template: '<App/>',
  components: { App }
})
