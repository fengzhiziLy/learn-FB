### express

#### 虚拟目录

```js
const express = require("express");
// 自动逐级向上查找node_modules/express的文件夹-->package.json(main属性)

let server = express();

server.listen(8888, () => {
  console.log("服务器启动在8888端口");
});

// server.use((req, res) => { // (请求与响应的过程中)
//  res.end('ok'); // 原生API
// })
// Response Headers:    X-Powered-By: Express

// 类似路由
// server.use是请求与响应中执行的一件事，按代码顺序来执行
// next()是放行到下一件事的开关
// 如果全next，最终没有end页面数据，处理了status: 404(Status Code: 404 Not Found)
// 用户选择性URL开头的部分，选择性调用对应的事情
// server.use(fn)是任何请求都会处罚执行的
server.use("/sucai", (req, res, next) => {
  console.log("白菜");
  next();
});
server.use("/sucai", (req, res, next) => {
  console.log("萝卜");
  next();
});
server.use("/huncai", (req, res, next) => {
  console.log("牛肉");
  next();
});
server.use("/huncai", (req, res, next) => {
  console.log("羊肉");
  next();
});
```

#### 中间件类别

**应用级中间件`app.use(事fn)`**

**路由级中间件**:

1. 获取路径级中间件
2. 配置路由
3. 加入到应用程序中`app.use(router)`

**内置中间件**

- 处理一些静态资源文件的返回(设置将某个目录下的资源文件向外暴露)
  - 当 URL 匹配上设置的目录下的子文件后，自动返回该文件
  - 加入到应用程序控制中`app.use(内置中间件)`

**第三方中间件**

**错误处理中间件**： 在 express 中统一处理错误`next(err)`

#### 路由中间件

_一个请求进来(总网线)，分发到各自不同的处理(分多根网线给其他人)_

- 后端路由

  - （请求方式+URL=判断依据）（分流的判断依据）--> 做不同的处理

- 使用步骤
  - 1. 获取路由中间件对象 `let router = express.Router();`
  - 2. 配置路由规则 `router.请求方式(URL,fn事)`
    - fn 中参数有 req,res,next
  - 3. 将 router 加入到应用`app.use(router)`

#### res 扩展函数

```js
res.download("./xxx.txt"); // 下载文件
res.json({}); // 响应json对象
res.jsonp(数据); // 配合jsonp   要求客户端请求的时候也是jsonp的方式,  并且callback=xxx
res.redirect(); //  重定向 301是永久重定向, 302临时重定向
res.send(); // 发送字符串数据自动加content-type
res.sendFile(); // 显示一个文件
res.sendStatus(); // 响应状态码
```

### 渲染模板

#### 使用art-template模板引擎

- app.js中配置
  - 注册一个模板引擎
    - `app.engine('.html',express-art-template)`;
      - 设置默认渲染引擎`app.set('view engine','.html')`;
  - res.render(文件名,数据对象);
  - express这套使用，默认在当前app.js同级的views目录查找