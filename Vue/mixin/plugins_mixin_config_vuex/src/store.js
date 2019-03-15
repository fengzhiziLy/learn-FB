import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	// 主页和关于 都显示数量，但是其一有一次自增
	// 实际场景 两个页面公用同一个数据字典
  state: {
  	num: 9999
  },
  mutations: {
  	add (state) {
  		state.num++
  	}
  },
  actions: {
  	// 发起异步请求
  	addByAct ({state, commit}) {
			if (state.num !== 10000) {
				setTimeout(function () {
					commit('add')
				}, 0)
			}
  	}
  },
  getters: {
  	getNum (state) {
  		return state.num
  	}
  }
})
