import Vue from 'vue'
import App from './App.vue'
import Son from './Son.vue'
import myMixin from './my_mixin'

Vue.component(Son.name, Son)

// 所有的Vue实例继承
Vue.mixin(myMixin)

// 插件Vue.use(具备install函数)

new Vue({
  el: '#app',
  // render: h => h(App)
  render: function (h) {
    return h(App) // 根据组件创建DOM(vnode)
  }
})
