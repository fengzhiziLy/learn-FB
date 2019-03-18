import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  render: h => h(App)
})
