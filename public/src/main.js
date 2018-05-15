'use strict'
import Vue from 'vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './font-awesome/css/font-awesome.css'
import App from './components/App.vue'
// Disabling eslint here because it does not support Vue
new Vue({ // eslint-disable-line
  el: 'app',
  created: function () {
    console.log('root instance was created')
  },
  components: {App},
  methods: {}
})
