### mixin

> 将公共的行为：混入(杂交)
> 发请求C的行为混入到组件A和B之中
> 将行为混入到所有组件中

#### hash

1. 安装插件的时候监听`hashchange`事件，监视`_route`
2. 处理`routes`获取到path关联组件
3. 等待`hashchange`触发，匹配`routes`中的数据，最终得到`matched`赋值给`_route`
4. 触发了`_route`的监视行为，`router-view`这个组件此时获取到`_route`，来作为渲染的内容


#### history模式

* 只有调用go||forward函数，才会根据历史记录也换页面
* 切换的过程会触发popstate事件

* 如果不希望看到丑陋的 # 可以使用history模式 ， 其原理依赖于`history.pushState`函数
* a标签点击以后，如果没有#必然会页面跳转发起请求
* 使用`pushState`函数可以改变url, 比如`/abc`而不会发起请求
* js通过`location.pathname`获取该值`/abc`做页面局部的替换

