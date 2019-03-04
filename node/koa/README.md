### koa

> 代码编写上避免了多层的嵌套异步函数调用`async await`来解决异步

- 启动步骤
  1. 引入Koa构造函数对象 `const Koa = require('koa')`
  2. 创建服务器示例对象 `const app = new Koa();`
  3. 配置中间件 `app.use(做什么?)`
  4. 监听端口启动服务器 `app.listen(8888);`
- 做什么? (函数参数说明)
  - context上下文对象: 该对象类似原生http中的 req + res
    - 该对象的req,res属性也存在，就是原生没有包装过的req,res
    - 简单说:  `context`对象就是从请求到响应过程中的一个描述对象
  - next函数:调用下一个中间件
- request(请求对象):  其中包含客户端请求的相关信息
- response(响应对象): 包含响应数据的具体操作

### request常用属性  接收

1. ctx.request.url(ctx.url)
2. ctx.request.method(ctx.method)
3. ctx.request.headers(ctx.headers)

```js
console.log(context.request.url);
console.log(context.request.method);
console.log(context.request.headers);
```

#### response常用属性  向客户端写回

1. ctx.response.set(ctx.set) (函数：参数key,val)
2. ctx.response.status(ctx.status)
3. ctx.response.body(ctx.body)

```js
ctx.response.set('mytest', '12345');
ctx.response.status = 200;
ctx.response.body = '<h1>hello</h1>'
```

#### 第三方中间件

- 处理请求体 __koa-bodyparser__
  - 非GET请求，比如说post请求 ，包括表单提交的form内的数据，都能轻松获取
  - `ctx.request.body`获取form中的数据

- 处理路由 __koa-router__
  - 获取查询字符串 ctx.query
  - 获取/xxx/:id      ctx.params.id
  - 优化状态的处理405和501：405代表请求url有，但是没有写该请求方式的响应；501服务器不支持该请求方式
- `koa-bodyparser`是解析请求体数据的，koa-router中可以通过`ctx.query||ctx.params`获取url上的参数

```js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
let app = new Koa();
// 配置路由
let router = new Router();
// 规则
router.get('/', async ctx => {
  ctx.body = '首页'
})
.post('/post', async ctx => {
  ctx.body = ctx.request.body; // 直接响应请求体数据
})
app.use(bodyParser());
// 产生关联
app.use(router.routes()); // 将路由与实例挂钩
// 优化分头处理405和501，不再全部是404
app.use(router.allowedMethods());
app.listen(8888);
```

- 处理静态资源 __koa-static__
- 渲染页面 __koa-art-template__
  - koa与视图通信的对象 __ctx.state__
- session中间件 __koa_session__
  - sign：true   会生成一个关于cookie数据保障不被修改的签名，如果数据改了，但是签名还是之前的状态，就说明数据不安全
  - app.keys 必须要，内部通过该值进行标识或者说计算
  - 操作session   __ctx.session.xxx__

**http协议是有数据解析的，tcp协议只有数据传输**