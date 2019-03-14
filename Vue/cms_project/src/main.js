// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入mint-ui安装插件
import MintUI from 'mint-ui'
// 引入CSS
import 'mint-ui/lib/style.css'
// 引入全局样式
import '../static/css/global.css'

import Axios from 'axios'
// 引入自己的插件安装器
import Installer from '@/plugins/installer'
Vue.use(Installer)
// 给Vue的原型挂载$axios属性
Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = 'https://www.sinya.online/api/'

Vue.config.productionTip = false

Vue.use(MintUI) // 里面其实做的就是注册所有的全局组件，和给vue.prototype挂载一些对象，方便使用,组件内的this.xxx就可以使用了

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
