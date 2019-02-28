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