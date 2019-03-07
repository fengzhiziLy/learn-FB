<template>
  <!-- 当前组件页面的结构 -->
  <div>
    我是入口组件
    {{msg}}
  </div>
</template>

<script>
// 当前组件的业务逻辑
export default {
  data () {
    return {
      msg: 'hello App.vue'
    }
  }
}
</script>

<style>
body {
  background-color: blue;
}
</style>

