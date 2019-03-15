export default {
  created () {
    setTimeout(() => {
      console.log(`组件${this.$options.name}请求发出去了`)
    }, 1000)
  }
}