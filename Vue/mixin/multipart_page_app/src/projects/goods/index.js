import Vue from 'vue'
import Router from 'vue-router'
import G from './G'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/g',
      name: 'G',
      component: G
    }
  ]
})
