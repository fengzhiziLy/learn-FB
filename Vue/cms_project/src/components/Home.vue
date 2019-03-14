<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- <mt-swipe-item v-for="item in imgs" :key="item">
        <img :src="item.img" alt="">
      </mt-swipe-item> -->
      <mt-swipe-item>
        <img src="../../static/img/hu1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../static/img/hu2.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../static/img/hu3.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!-- <test></test> -->
    <div class="grid">
      <ul>
        <li v-for="(module, index) in modules" :key="index">
          <router-link :to="module.route">
            <span :class="module.className"></span>
            <div>{{module.title}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      imgs: [], // 这是轮播图数据
      modules: [{
        title: '新闻咨询',
        className: 'back-news',
        route: {name: 'Home'}
      }, {
        title: '图文分析',
        className: 'back-pic',
        route: {name: 'Home'}
      }, {
        title: '商品展示',
        className: 'back-goods',
        route: {name: 'Home'}
      }, {
        title: '留言反馈',
        className: 'back-feed',
        route: {name: 'Home'}
      }, {
        title: '搜索资讯',
        className: 'back-search',
        route: {name: 'Home'}
      }, {
        title: '联系我们',
        className: 'back-callme',
        route: {name: 'Home'}
      }]
    }
  },
  created () {
    // 这是自己写的插件
    this.$log = 'abc'
    this.$log()
  }
  // created () {
  //   this.$axios.get('getlunbo')
  //     .then(res => {
  //       this.imgs = res.data.message
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe {
  height: 200px;
  width: 100%;
}
.mint-swipe img {
  width: 100%;
}
/* 九宫格样式 */
/* img {
  width: 100%;
} */
.grid span {
  display: inline-block;
  margin: 10px 0;
  width: 50px;
  height: 50px;
  background-repeat: round;
}
.back-callme {
  background-image: url(../../static/img/callme.png);
}
.back-pic {
  background-image: url(../../static/img/picShare.png);
}
.back-feed {
  background-image: url(../../static/img/feedback.png);
}
.back-search {
  background-image: url(../../static/img/search.png);
}
.back-goods {
  background-image: url(../../static/img/goodsShow.png);
}
.back-news {
  background-image: url(../../static/img/news.png);
}
ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
li {
  list-style: none;
  float: left;
  width: 33.3333%;
  text-align: center;
}
</style>
