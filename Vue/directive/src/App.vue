<template>
  <div id="app">
    <div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
    <!-- 按钮点击后，在页面出现input元素 -->
    <button @click="isShow = ! isShow">显示元素</button>
    <!-- input自动获取焦点 -->
    <input type="text" v-if="isShow" v-focus>
    <!-- 结合指令做 -->
    <button @click="addInput">插入元素</button>
    <input type="text" v-if="isShow" ref="input">
  </div>
</template>

<script>
export default {
  methods: {
    addInput() {
      this.isShow = !this.isShow; // 不会立刻产生元素
      // 让元素获取焦点

      // 保证在Vue异步渲染组件的后续执行
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    }
  },
  directives: {
    // v-focus使用
    focus: {
      // bind 初始化
      // 元素被插入的时候, this.$refs.xxx
      inserted: function(el) {
        console.log(el);
        // dom元素此时还未插入
        el.focus();
      }
    }
  },
  name: "app",
  data() {
    return {
      isShow: false,
      message: "abc"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
