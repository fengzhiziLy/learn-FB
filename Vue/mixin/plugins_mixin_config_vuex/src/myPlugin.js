let myOptions

function myPlugin(options) {
	myOptions = options
	return myPlugin
}
// 该对象具备install函数
myPlugin.install = function (Vue) {
	Vue.mixin({
		created() {
			// 判断当前的组件名
			// if (this.$options.name === 'about' || this.$options.name === 'home') {
			// 	// 根据vuex去调用，改变数据
			// 	this.$store.dispatch('addByAct')
			// }
			myOptions.forEach(opt => {
				if (this.$options.name === opt) {
					// 根据vuex去调用，改变数据
					this.$store.dispatch('addByAct')
				}
			})
		}
	})
}

export default myPlugin