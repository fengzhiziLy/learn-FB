import Vue from 'vue'
import Router from 'vue-router'
import U from './U'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/u',
      name: 'U',
      component: U
    }
  ]
})
